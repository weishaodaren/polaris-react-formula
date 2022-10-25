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
import type { IColumn } from '../config';
import type { Variable } from '../types';

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
          : parseField(fields as IColumn);

        return {
          ...originalState,
          editorValue,
          fields: _fields, // 修改字段
          originalFields: _fields.slice(0), // 字段(后续作为原始字段常量使用)
          fieldValues: _fields.map(({ value }) => `{${value}}`), // 字段(后续作为原始字段value常量使用)
          disabled: !editorValue,
        };
      }

      case ActionType.SetCurrentFieldOrFunction: {
        return {
          ...originalState,
          currentFieldOrFunction: action.currentFieldOrFunction,
        };
      }

      case ActionType.SetEditor: {
        return {
          ...originalState,
          editor: action.editor,
        };
      }

      case ActionType.SetEditorValue: {
        const { editorValue = '', isSelected = false } = action;
        const {
          originalFields: fields,
          editorValue: originalEditorValue,
          fieldValues,
          // FunctionNames,
          editor,
        } = originalState;

        // // 替换值
        // let replaceValue = editorValue.slice(0);
        //  // 全量替换字段
        // if (fields?.length) {
        //   for (let j = 0; j < fields?.length; j += 1) {
        //     replaceValue =
        // replaceValue.replace(new RegExp(`{${(fields[j] as Variable).value}}`, 'ig'), '');
        //   }
        // }
        // // 全量替换函数
        // for (let i = 0; i < FunctionNames.length; i += 1) {
        //   replaceValue = replaceValue.replace(new RegExp(FunctionNames[i], 'ig'), '');
        // }
        // replaceValue = replaceValue
        //   .replaceAll('(', '')
        //   .replaceAll(')', '')
        //   .replace(/\d+/g, '')
        //   .replaceAll(',', '')
        //   .replaceAll('=', '')
        //   .replace(/"(.*?)"/g, '');

        // // 存在 被过滤剩下的值，都是非法值
        // if (replaceValue.trim()) {
        //   console.log(replaceValue, 'replaceValue');

        //   return {
        //     ...originalState,
        //     isSelected,
        //     editorValue: originalEditorValue,
        //     fields,
        //     functions: Functions,
        //     errorText: replaceValue,
        //     errorCode: ErrorType.Invalid,
        //     disabled: true,
        //   };
        // }

         // 获取错误信息
        const [errorCode, errorText] = getFormulaError(editorValue) as string[];

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
          };
        }

        /**
         * 从面板中选中 原封不动返回值
         * 因为两个事件都在codemirror触发
         * 所以当选中时，返回内存中的旧的编辑值
         */
        if (isSelected) {
          return {
            ...originalState,
            isSelected,
            editorValue: originalEditorValue,
            fields,
            functions: Functions,
            errorText,
            errorCode,
            disabled: Number(errorCode) > -1,
          };
        }

        /**
         * 匹配 逗号 空格 等区块间，之后的输入值，继续模糊查询
         */
        const commaIndex = editorValue.lastIndexOf(',');
        const blankIndex = editorValue.lastIndexOf(' ');
        const leftIndex = editorValue.lastIndexOf('(');
        const index = [commaIndex, blankIndex, leftIndex].filter((_) => _ !== -1)[0] ?? -1;

        if (index !== -1) {
          const _editorValue = editorValue
            .slice(Number(index) + 1, editorValue.length - 1)
            .replaceAll(')', '')
            .replaceAll('(', '');

          return {
            ...originalState,
            isSelected,
            editorValue,
            fields: fuzzySearchField(fields as Variable[], _editorValue),
            functions: fuzzySearchFunctions(Functions, _editorValue),
            errorText,
            errorCode,
            disabled: Number(errorCode) > -1,
          };
        }

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
          ...originalState,
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
          ...originalState,
          isSelected,
          editorValue,
          fields: _fields,
          functions: _functions,
          errorText,
          errorCode,
          disabled: Number(errorCode) > -1,
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
