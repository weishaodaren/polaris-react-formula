import React, {
  createContext, useReducer, useMemo,
} from 'react';
import type {
  FC, ReactNode, Dispatch,
} from 'react';
import type { InitialState } from './initialState';
import { initialState } from './initialState';
import ActionType from './actionType';

interface IStoreProps {
  children: ReactNode
}

export interface IActionType extends InitialState {
  type: string
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
