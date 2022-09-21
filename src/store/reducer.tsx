import React, {
  createContext, useReducer, useMemo,
} from 'react';

import type {
  FC, ReactNode, Dispatch,
} from 'react';
import type { InitialState } from './initialState';
import type { IColumn, IDataSource } from '../config';
import type { Variable } from '../types';

import { ErrorType } from '../enum';
import { Functions } from '../config';
import { initialState } from './initialState';
import ActionType from './actionType';
import {
  parseField, getFormulaError, fuzzySearchField, fuzzySearchFunctions,
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
        // 输入值
        const { editorValue, isSelected } = action;
        // 原始字段
        const { originalFields: fields, editorValue: originalEditorValue } = originalState;
        // 获取错误信息
        const [errorCode, errorText] = getFormulaError(editorValue) as string[];

        /**
         * 从面板中选中 原封不动返回值
         * 因为两个事件都在codemirror触发
         * 所以当选中时，返回内存中的旧的编辑值
         */
        if (isSelected) {
          return {
            ...originalState,
            editorValue: originalEditorValue,
            fields,
            functions: Functions,
            errorText,
            errorCode,
            disabled: Number(errorCode) > -1,
          };
        }

        /**
         * 匹配 逗号 空格，之后的输入值，继续模糊查询
         */
        const reg = /[\\ \\,\\，]/g;
        if (reg.test(editorValue)) {
          const result = [...editorValue.matchAll(reg)];
          // 匹配搜索结果，对应字段 模糊查询
          if (result) {
            // 默认找最后一位
            const lastResult = result.at(-1);
            if (lastResult) {
              const { index } = lastResult;
              const _editorValue = editorValue.slice(Number(index) + 1);

              return {
                ...originalState,
                editorValue,
                fields: fuzzySearchField(fields as Variable[], _editorValue),
                functions: fuzzySearchFunctions(Functions, _editorValue),
                errorText,
                errorCode,
                disabled: Number(errorCode) > -1,
              };
            }
          }

          // 匹配不到 返回所有值
          return {
            ...originalState,
            editorValue,
            fields,
            functions: Functions,
            errorText,
            errorCode,
            disabled: Number(errorCode) > -1,
          };
        }

        // 无条件 模糊查询
        return {
          ...originalState,
          editorValue,
          fields: fuzzySearchField(fields as Variable[], editorValue),
          functions: fuzzySearchFunctions(Functions, editorValue),
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

      case ActionType.SetFields: {
        const { fields, dataSource } = action;
        const _fields = !fields?.length
          ? []
          : parseField(fields as IColumn, dataSource as IDataSource);

        return {
          ...originalState,
          fields: _fields,
          originalFields: _fields.slice(0),
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
