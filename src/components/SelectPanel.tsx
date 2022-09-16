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
  const {
    state: {
      editor,
    }, dispatch,
  } = useContext(store);

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

  /**
   * Callback
   * @description 点击字段 函数项
   * @param name 变量 函数字段
   * @return void
   */
  const clickItem = useCallback((name: string) => (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!editor) return;

    // 插入函数字段
    const doc = editor!.getDoc();
    const pos = doc.getCursor();
    doc.replaceRange(`${name}()`, pos);
    pos.ch += name.length + 1;
    doc.setCursor(pos);
    editor!.focus();

    // 变量字段
    // const doc = editor!.getDoc();
    // const pos = doc.getCursor();
    // doc.replaceRange(`{${variable}}`, pos, pos);
    // editor!.focus();
  }, [editor]);

  return useMemo(() => (
    <div className={`${prefixCls}-select-panel-layout`}>
      {Functions.map(({ name, functions }, index) => (
        <Fragment key={index}>
          <h3>{name}</h3>
          {functions.map((item) => <div
            className={`${prefixCls}-select-panel-layout-list-item`}
            key={item.name}
            onMouseEnter={selectItem(item)}
            onClick={clickItem(item.name)}
          >
            {item.name}
          </div>)}
        </Fragment>
      ))
      }
    </div >
  ), [editor]);
};

export default SelectPanel;
