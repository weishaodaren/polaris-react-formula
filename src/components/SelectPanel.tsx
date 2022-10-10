/* eslint-disable no-extra-parens */
import React, {
  Fragment,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { Icon } from 'polaris-react-component';

import type { FC, MouseEvent } from 'react';
import type { FunctionItem, Variable, FunctionGroup } from '../types';
import type { IActionType } from '../store';
import type { CustomFieldIconType } from '../config';

import { store, ActionType } from '../store';
import { prefixCls, CustomFieldIcon } from '../config';
// TODO: fixme
// import { braketReg, blockReg } from '../utils';

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
      // TODO: 空了着重解决
      // 函数字段
      // const value = doc.getValue();

      // // 如果在空格 逗号之后有输入值，用户在下方选中函数，直接替换
      // const _value = value.toString();
      // const blankIndex = _value.lastIndexOf(' ');
      // const commaIndex = _value.lastIndexOf(',');
      // const leftIndex = _value.lastIndexOf('(');
      // // const index = commaIndex !== -1 ? commaIndex : blankIndex;
      // const index = [leftIndex, commaIndex, blankIndex].filter((_) => _ !== -1)[0] ?? -1;

      // console.log(index, 'iiiiiiiiiiii', leftIndex, commaIndex, blankIndex);

      // console.log('lalalalaalal', _value.match(braketReg), _value.match(blockReg));

      // // 存在有效索引
      // if (index !== -1) {
      //   const _index = _value.lastIndexOf(')');
      //   pos.ch = name.length - (_value.length - (index + 1)) + _value.length + 1;

      //   console.log('index:', index, 'pos:', pos, 'name.length:', name.length, '_value.length:', _value.length);

      //   doc.replaceRange(
      //     `${name}()`,
      //     { ch: index + 1, line: pos.line },
      //     { ch: _index !== -1 ? _index : pos.ch - 1, line: pos.line },
      //   );
      //   console.log('pos', pos, 'name.length:', name.length, '_value.length:', _value.length);
      //   doc.setCursor(pos);
      //   editor!.focus();
      // } else if (!_value.match(braketReg) && !_value.match(blockReg)) {
      //   console.log('weihsaodaren');
      //   pos.ch = name.length - (_value.length - (index + 1)) + _value.length + 1;
      //   doc.replaceRange(
      //     `${name}()`,
      //     { ch: index - 2, line: pos.line },
      //     { ch: pos.ch - 1, line: pos.line },
      //   );
      //   doc.setCursor(pos);
      //   editor!.focus();
      // } else {
      //   console.log('here???');
      //   console.log('index:', index, 'pos:', pos, 'name.length:', name.length, '_value.length:', _value.length);

      //   // pos.ch = name.length - (_value.length - (index + 1)) + _value.length + 1;
      //   console.log('pos', pos, 'name.length:', name.length, '_value.length:', _value.length);

      //   // doc.replaceRange(
      //   //   `${name}()`,
      //   //   { ch: index - 2, line: pos.line },
      //   //   { ch: pos.ch - 1, line: pos.line },
      //   // );

        // 默认选中
        doc.replaceRange(`${name}()`, pos);
        pos.ch += name.length + 1;
        doc.setCursor(pos);
        editor!.focus();
      // }
    }

    dispatch!({
      type: ActionType.SetEditorValue,
      editorValue: isField ? `{${name}}` : `${name}()`,
      isSelected: true,
    } as IActionType);
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
                <Icon type={(CustomFieldIcon as CustomFieldIconType as any)[field.type]} />
                <span>{field.label}</span>
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
                  <Icon type={(CustomFieldIcon as CustomFieldIconType as any)[item.type]} />
                  <span>{item.name}</span>
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
