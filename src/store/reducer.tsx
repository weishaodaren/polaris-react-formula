import React, {
  createContext, useReducer, useMemo,
} from 'react';
import type {
  FC, ReactNode, Dispatch,
} from 'react';
import type { InitialState } from './initialState';
import type { IColumn, IDataSource } from '../config';
import { initialState } from './initialState';
import ActionType from './actionType';
import { parseField } from '../utils';

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
        return {
          ...originalState,
          editorValue: action.editorValue,
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
