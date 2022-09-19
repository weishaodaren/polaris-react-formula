import React, {
  createContext, useReducer, useMemo,
} from 'react';
import type {
  FC, ReactNode, Dispatch,
} from 'react';
import type { InitialState } from './initialState';
import type { IColumn, IDataSource } from '../config';
import type { Variable } from '../types';
import { Functions } from '../config';
import { initialState } from './initialState';
import ActionType from './actionType';
import { parseField, getFormulaError } from '../utils';

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
      case ActionType.SetModalVisible: {
        return {
          ...originalState,
          modalVisible: action.modalVisible,
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
        /**
         * 模糊查询
         */

        const { editorValue, fields } = action; // 输入值 原始字段

        // 临时字段
        const _fields = [];
        if (fields && fields.length) {
          for (let i = 0; i < fields.length; i += 1) {
            if (fields[i].label.indexOf(editorValue) !== -1) {
              _fields.push(fields[i]);
            }
          }
        }
        // 临时函数
        const _functions = [];
        for (let i = 0; i < Functions.length; i += 1) {
          const { functions } = Functions[i];
          for (let k = 0; k < functions.length; k += 1) {
            // 函数需改为大写 匹配字段
            if (functions[k].name.indexOf(editorValue.toUpperCase()) !== -1) {
              const { name } = Functions[i];
              // 优先判断是否存在
              const alreadyName = _functions.findIndex((item: { name: string; }) => {
                if ('name' in item) {
                  return item.name === name;
                }
                return false;
              });

              if (alreadyName !== -1) {
                _functions[alreadyName].functions.push(functions[k]);
              } else {
                _functions.push({
                  name,
                  functions: [functions[k]],
                });
              }
            }
          }
        }

        return {
          ...originalState,
          editorValue,
          fields: _fields as Variable[],
          functions: _functions,
          errorText: getFormulaError(editorValue),
        };
      }

      case ActionType.SetErrorText: {
        return {
          ...originalState,
          errorText: action.errorText,
        };
      }

      case ActionType.SetFields: {
        const { fields: field, dataSource } = action;
        return {
          ...originalState,
          fields: !field || !Array.isArray(field) || !field.length
            ? []
            : parseField(field as IColumn, dataSource as IDataSource),
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
