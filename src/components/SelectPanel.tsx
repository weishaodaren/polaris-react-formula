/* eslint-disable no-extra-parens */
import React, {
  Fragment, useContext, useCallback, useMemo,
} from 'react';

import type { FC, MouseEvent } from 'react';
import type { FunctionItem, Variable, FunctionGroup } from '../types';
import type { IActionType } from '../store';

import { store, ActionType } from '../store';
import { prefixCls } from '../config';

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
      fields,
      functions,
    }, dispatch,
  } = useContext(store);

  const emptyField = !fields?.length; // 空字段
  const emptyFunctions = !functions.length; // 空函数

  /**
   * Callback
   * @description 选择字段 函数项
   * @param item 单项数据
   * @return void
   */
  const selectItem = useCallback((
    item: FunctionItem | Variable,
  ) => (
    event: MouseEvent<HTMLDivElement>,
  ) => {
      event.stopPropagation();
      dispatch!({
        type: ActionType.SetCurrentFieldOrFunction,
        currentFieldOrFunction: item,
      } as IActionType);
    }, []);

  /**
   * Callback
   * @description 点击字段 函数项
   * @param name 变量字段 或 函数字段名称
   * @param isField 是否是字段
   * @return void
   */
  const clickItem = useCallback((name: string, isField: boolean) => (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
    if (!editor) return;

    const doc = editor!.getDoc();
    const pos = doc.getCursor();

    // 变量字段
    if (isField) {
      doc.replaceRange(`{${name}}`, pos, pos);
      editor!.focus();
    } else {
      // 函数字段
      doc.replaceRange(`${name}()`, pos);
      pos.ch += name.length + 1;
      doc.setCursor(pos);
      editor!.focus();
    }
  }, [editor]);

  return useMemo(() => (
    <div className={`${prefixCls}-select-panel-layout`}>
      {/* 全字段为空 */}
      {!emptyFunctions || !emptyField
        ? (
          <>
            {/* 只有字段为空 函数不为空 */}
            {!emptyField && <h3>极星字段</h3>}
            {/* 字段 */}
            {(fields as Variable[])?.map((field) => (
              <div
                className={`${prefixCls}-select-panel-layout-list-item`}
                key={field.value}
                onMouseEnter={selectItem(field)}
                onClick={clickItem(field.value, true)}
              >
                {field.label}
              </div>
            ))
            }
            {/* 函数 */}
            {(functions as FunctionGroup[]).map(({ name, functions: _functions }, index) => (
              <Fragment key={index}>
                <h3>{name}</h3>
                {_functions.map((item) => <div
                  className={`${prefixCls}-select-panel-layout-list-item`}
                  key={item.name}
                  onMouseEnter={selectItem(item)}
                  onClick={clickItem(item.name, false)}
                >
                  {item.name}
                </div>)}
              </Fragment>
            ))
            }
          </>
        )
        : <h3>暂无搜索结果</h3>
      }
    </div >
  ), [editor, fields, functions]);
};

export default SelectPanel;
