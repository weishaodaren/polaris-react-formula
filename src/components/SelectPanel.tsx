/* eslint-disable no-extra-parens */
import React, {
  Fragment,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Icon } from 'polaris-react-component';

import type { FC, MouseEvent } from 'react';
import type { FunctionItem, Variable, FunctionGroup } from '../types';
import type { IActionType } from '../store';
import type { CustomFieldIconType } from '../config';

import { store, ActionType } from '../store';
import { prefixCls, CustomFieldIcon } from '../config';

const Style = `${prefixCls}-select-panel-layout`;

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
   * Ref
   */
  const mountedRef = useRef(false); // 用于判断当前DOM是否已经挂载

  /**
   * State
   */
  const [selected, setSelected] = useState(''); // 选中的字段

  /**
   * Effect
   * @description 依赖变量字段，函数字段 匹配模糊查询默认选中第一项
   * @return {Void}
   */
  useEffect(() => {
    /**
     * 第一次不执行副作用函数
     * 等待依赖更新再执行
     */
    if (mountedRef.current) {
      // 优先匹配变量字段
      if (fields && fields?.length > 0) {
        setSelected((fields[0] as Variable).value);
        dispatch!({
          type: ActionType.SetCurrentFieldOrFunction,
          currentFieldOrFunction: fields[0] as Variable,
        } as unknown as IActionType);
        return undefined;
      }

      if (functions.length > 0) {
        const { functions: _fns } = functions[0];
        setSelected(_fns[0].name);
        dispatch!({
          type: ActionType.SetCurrentFieldOrFunction,
          currentFieldOrFunction: _fns[0],
        } as IActionType);
      }
    }

    return () => {
      mountedRef.current = true;
    };
  }, [fields, functions]);

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
    setSelected((item as FunctionItem).name ?? (item as Variable).value);
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
      const { line } = pos;
      const value = editor.getLine(line);

      // 如果在空格 逗号之后有输入值，用户在下方选中函数，直接替换
      const _value = value.toString();
      const blankIndex = _value.lastIndexOf(' ');
      const commaIndex = _value.lastIndexOf(',');
      const leftIndex = _value.lastIndexOf('(');
      const index = [commaIndex, blankIndex].filter((_) => _ !== -1)[0] ?? -1;

      console.log(index, 'index', commaIndex, blankIndex, leftIndex);

      // 优先判断是否有左侧小括号
      if (leftIndex !== -1) {
        // 判断是否有逗号，空格
        if (index !== -1) {
        console.log('22222222');

          const endPosition = index + name.length + 1;
          doc.replaceRange(
            `${name}()`,
            { ch: index + 1, line },
            pos,
          );
          pos.ch = endPosition + 1;
        } else {
          console.log('1111111111');
          doc.replaceRange(
            `${name}()`,
            { ch: leftIndex + 1, line },
            pos,
          );
          pos.ch = leftIndex + name.length + 2;
        }
        // 如果没有敏感字符串，开头替换
      } else if (index === -1) {
        console.log('333333333');

        const endPosition = name.length;
        doc.replaceRange(
          `${name}()`,
          { ch: 0, line },
          { ch: endPosition, line },
        );
        pos.ch = endPosition + 1;
      } else {
        console.log('44444444444444');

        // 在括号外 执行逗号，空格的判断
        const endPosition = index + name.length + 1;
        doc.replaceRange(
          `${name}()`,
        { ch: index + 1, line },
        { ch: endPosition, line },
        );
        pos.ch = endPosition + 1;
      }

      doc.setCursor(pos);
      editor!.focus();

        // 默认选中
        // doc.replaceRange(`${name}()`, pos);
        // pos.ch += name.length + 1;
        // doc.setCursor(pos);
        // editor!.focus();
      // }
    }

    dispatch!({
      type: ActionType.SetEditorValue,
      editorValue: isField ? `{${name}}` : `${name}()`,
      isSelected: true,
    } as IActionType);
  }, [editor]);

  return useMemo(() => (
    <div className={Style}>
      {/* 全字段为空 */}
      {!emptyFunctions || !emptyField
        ? (
          <>
            {/* 只有字段为空 函数不为空 */}
            {!emptyField && <h3>极星字段</h3>}
            {/* 字段 */}
            {(fields as Variable[])?.map((field) => (
              <div
                className={[`${Style}-list-item`, selected === field.value && `${Style}-list-item-active`].join(' ')}
                key={field.value}
                onMouseEnter={selectItem(field)}
                onClick={clickItem(field.value, true)}
              >
                <Icon type={(CustomFieldIcon as CustomFieldIconType as any)[field.type]} />
                <span>{field.label}</span>
              </div>
            ))}
            {/* 函数 */}
            {(functions as FunctionGroup[]).map(({ name, functions: _functions }, index) => (
              <Fragment key={index}>
                <h3>{name}</h3>
                {_functions.map((item) => <div
                  className={[`${Style}-list-item`, selected === item.name && `${Style}-list-item-active`].join(' ')}
                  key={item.name}
                  onMouseEnter={selectItem(item)}
                  onClick={clickItem(item.name, false)}
                >
                  <Icon type={(CustomFieldIcon as CustomFieldIconType as any)[item.type]} />
                  <span>{item.name}</span>
                </div>)}
              </Fragment>
            ))}
          </>
        )
        : <h3>暂无搜索结果</h3>
      }
    </div >
  ), [editor, fields, functions, selected]);
};

export default SelectPanel;
