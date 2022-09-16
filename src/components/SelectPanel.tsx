import React, {
  Fragment, useContext, useCallback, useMemo,
} from 'react';

import type { FC, MouseEvent } from 'react';
import type { FunctionItem } from '../types';
import type { IActionType } from '../store';

import { store, ActionType } from '../store';
import { prefixCls, Functions } from '../config';

/**
 * Component
 * @description 左侧选择面板
 */
const SelectPanel: FC = (): JSX.Element => {
  /**
   * Context
   */
  const { dispatch } = useContext(store);

  /**
   * Callback
   * @description 选择字段 函数项
   * @param item 单项数据
   * @return void
   */
  const selectItem = useCallback((item: FunctionItem) => (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch!({
      type: ActionType.SetCurrentFieldOrFunction,
      currentFieldOrFunction: item,
    } as IActionType);
  }, []);

  return useMemo(() => (
    <div className={`${prefixCls}-select-panel-layout`}>
      {Functions.map(({ name, functions }, index) => (
        <Fragment key={index}>
          <h3>{name}</h3>
          {functions.map((item) => <div
            className={`${prefixCls}-select-panel-layout-list-item`}
            key={item.name}
            onMouseEnter={selectItem(item)}
          >
            {item.name}</div>)}
        </Fragment>
      ))
      }
    </div >
  ), []);
};

export default SelectPanel;
