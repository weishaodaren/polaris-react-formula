/* eslint-disable no-extra-parens */
import React, {
  createContext,
  useReducer,
  useMemo,
} from 'react';

import type {
  FC,
  ReactNode,
  Dispatch,
} from 'react';
import type { InitialState } from './initialState';
import type { Variable, IColumn } from '../types';

import { ErrorType } from '../enum';
import { Functions, Sample } from '../config';
import { initialState } from './initialState';
import ActionType from './actionType';
import {
  parseField,
  getFormulaError,
  fuzzySearchField,
  fuzzySearchFunctions,
  filterMarks,
  isValidField,
  isValidFunction,
  getNearestIndex,
} from '../utils';

interface IStoreProps {
  children: ReactNode
}

export interface IActionType extends InitialState {
  type: string
  [x: string]: unknown
}

interface IStore {
  state: InitialState
  dispatch?: Dispatch<IActionType>
}

export const store = createContext<IStore>({ state: initialState });
const { Provider } = store;

/**
 * @description 获取搜索后的编辑值
 * @param fields 字段组
 * @param editorValue 编辑器值
 * @param fieldValues 字段值
 * @param isSelected 是否选中
 * @param errorText 错误文案
 * @param errorCode 错误码
 * @returns {Object}
 */
const getSearchedEditorValue = (
  fields: Variable[],
  editorValue: string,
  fieldValues: string[],
  isSelected: boolean,
  errorText: string,
  errorCode: string,
) => {
  // 查询后的值
  const _fields = fuzzySearchField(fields as Variable[], editorValue);
  const _functions = fuzzySearchFunctions(Functions, editorValue);
  const isValidFields = _fields.length;
  const isValidFunctions = _functions.length;

  // 是否是有效字段
  const isValidFieldValue = isValidField(editorValue, fieldValues);

  // 过滤加减乘除括号后的值
  const filterValue = filterMarks(editorValue);
  // 默认输入数字不提示错误
  const isValidFilterValue = Number.isNaN(+filterValue);

  // 搜索不到有效内容，禁用按钮，给出提示
  if (!isValidFields && !isValidFunctions && isValidFilterValue && !isValidFieldValue) {
    return {
      isSelected,
      editorValue,
      fields: _fields,
      functions: _functions,
      currentFieldOrFunction: Sample,
      errorText: editorValue,
      errorCode: ErrorType.Invalid,
      disabled: true,
    };
  }

  // 无条件 模糊查询
  return {
    isSelected,
    editorValue,
    fields: _fields,
    functions: _functions,
    errorText,
    errorCode,
    disabled: Number(errorCode) > -1,
  };
};

/**
 * Component
 * @description 状态管理仓库
 */
export const Store: FC<IStoreProps> = ({ children }) => {
  const [state, dispatch] = useReducer((originalState: InitialState, action: IActionType) => {
    switch (action.type) {
      case ActionType.SetInitialState: {
        const { fields, editorValue } = action;
        const _fields = !fields?.length
          ? []
          : parseField(fields as IColumn[]);

        return {
          ...originalState,
          editorValue,
          fields: _fields, // 修改字段
          originalFields: _fields.slice(0), // 字段(后续作为原始字段常量使用)
          fieldValues: _fields.map(({ value }) => `{${value}}`), // 字段(后续作为原始字段value常量使用)
          fieldLabels: _fields.map(({ label }) => `{${label}}`), // 字段(后续作为原始字段label常量使用)
          disabled: !editorValue,
        };
      }

      case ActionType.SetCurrentFieldOrFunction: {
        return {
          ...originalState,
          currentFieldOrFunction: action.currentFieldOrFunction,
          isFunctionField: action.isFunctionField,
        };
      }

      case ActionType.SetEditor: {
        return {
          ...originalState,
          editor: action.editor,
        };
      }

      case ActionType.SetEditorValue: {
        const {
          originalFields: fields,
          editorValue: originalEditorValue,
          fieldLabels,
          editor,
          currentFieldOrFunction: _currentFieldOrFunction,
          isSelected: _isSelected,
        } = originalState;

        const {
          editorValue = '',
          isSelected = _isSelected,
          isCursoring = false,
          fields: _fields,
          isFunctionField = false, // 是否是函数字段
          currentFieldOrFunction = _currentFieldOrFunction,
        } = action;

        // 引号内视为常量，需要替换掉
        const variableValue = editorValue.replaceAll(/".*?"/g, '');

         // 获取错误信息
        const [errorCode, errorText] = getFormulaError(variableValue) as string[];

        // 获取当前光标位置
        const { line, ch } = editor!.getCursor();
        const value = editor!.getLine(line);

        // 获取光标前的值
        const frontCursorValue = value![ch as number - 1];

        // 不存在有效值，直接返回全字段
        if (typeof frontCursorValue === 'undefined' || frontCursorValue === '') {
           return {
            ...originalState,
            isSelected,
            editorValue: originalEditorValue,
            fields,
            functions: Functions,
            errorText,
            errorCode,
            disabled: Number(errorCode) > -1,
            currentFieldOrFunction,
          };
        }

        /**
         * 代码编辑输入框 光标是否在执行`onCursor`事件
         */
        if (isCursoring && !isSelected) {
          const { fields: searchedFields, functions } = getSearchedEditorValue(
            fields as Variable[],
            editorValue,
            fieldLabels,
            isSelected,
            '',
            String(ErrorType.Pass),
          );

          /**
           * 判断光标前的字段和函数字段
           */
          let currentContent: any = Sample;
          if (searchedFields && searchedFields?.length > 0 && searchedFields.length < 2) {
            [currentContent] = searchedFields as Variable[];
          } else if (functions.length > 0) {
            const { functions: _fns } = functions[0];
            if (_fns.length > 1) currentContent = currentFieldOrFunction;
            else [currentContent] = _fns;
          }

          return {
          ...originalState,
          currentFieldOrFunction: currentContent,
          isSelected: false,
          isCursoring: true,
          fields: searchedFields,
          functions,
        };
        }

        /**
         * 从面板中选中 原封不动返回值
         * 因为两个事件都在codemirror触发
         * 所以当选中时，返回内存中的旧的编辑值
         */
        if (isSelected && !isCursoring) {
          /**
           * 获取选中的函数字段
           * 映射必填参数，反馈UI
           */
          let functionFieldValue;
          if (isFunctionField && editorValue) {
            functionFieldValue = isValidFunction(editorValue);
          }

          const returnValues = {
            isSelected,
            isCursoring: false,
            editorValue: originalEditorValue,
            errorText: functionFieldValue || errorText,
            errorCode: functionFieldValue ? ErrorType.Pass : errorCode,
            disabled: Number(functionFieldValue ? ErrorType.Error : errorCode) > -1,
            currentFieldOrFunction,
          };

          // 存在选中字段组
          if (_fields) {
            return {
              ...originalState,
              ...returnValues,
              fields: _fields,
              functions: [],
              isFunctionField: false,
            };
          }
          return {
            ...originalState,
            ...returnValues,
            fields,
            functions: Functions,
            isFunctionField: true,
          };
        }

        /**
         * 匹配 逗号 空格 计算符号等区间，之后的输入值，继续模糊查询
         * 选取最近的敏感字段索引
         */
        const lastIndex = getNearestIndex(variableValue);
        if (lastIndex !== -1) {
          const _editorValue = variableValue
            .slice(lastIndex + 1, variableValue.length - 1)
            .replaceAll(')', '')
            .replaceAll('(', '');

          return {
            ...originalState,
            currentFieldOrFunction,
            ...getSearchedEditorValue(
                fields as Variable[],
                _editorValue,
                fieldLabels,
                isSelected,
                errorText,
                errorCode,
            ),
            editorValue,
          };
        }

        return {
          ...originalState,
          currentFieldOrFunction,
          ...getSearchedEditorValue(
                fields as Variable[],
                editorValue,
                fieldLabels,
                isSelected,
                errorText,
                errorCode,
          ),
        };
      }

      case ActionType.SetErrorText: {
        return {
          ...originalState,
          errorText: action.errorText,
          errorCode: action.errorCode,
          disabled: action.errorCode !== ErrorType.Pass,
        };
      }

      default: {
        return originalState;
      }
    }
  }, initialState);

  /**
   * Memo
   * @description 使用memo缓存值，减少无效render
   * @return object
   */
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Provider value={value}>{children}</Provider>;
};
