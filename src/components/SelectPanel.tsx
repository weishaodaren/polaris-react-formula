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
import { getEditorPos, getNearestIndex, specialSymbols } from '../utils';

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
   * @param field 字段
   * @return void
   */
  const clickItem = useCallback((name: string, isField: boolean, field?: Variable) => (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
    if (!editor) return;

    /**
     * 编辑器信息
     */
    const doc = editor!.getDoc(); // 获取当前文本
    const pos = doc.getCursor(); // 获取当前位置
    const { ch, line } = pos; // 当前光标位置 ch: 字符位置(非索引) line: 行
    const value = editor.getLine(line); // 当前行的值

    /**
     * 需要先替换掉中文字符
     * 方便统一获取敏感字段索引
     */
    const _value = value.toString().replaceAll('，', ',').replaceAll('）', ')');
    const cursorValue = _value![ch - 1]; // 光标前一个字符

    const leftIndex = _value.lastIndexOf('(');
    const commaIndex = _value.lastIndexOf(',');

    // 变量字段
    if (isField) {
      // 如果在计算符号 逗号之后有输入值，用户在下方选中函数，直接替换
      const equalIndex = getNearestIndex(_value, []);
      const index = getNearestIndex(_value, [',']);

      // 获取距离光标最近的敏感索引
      const _lastIndex = Math.abs(index) - Math.abs(leftIndex);
      // 是否是逗号(等号 计算符号)
      const isCommonOrEqual = _lastIndex > 0 && (index !== -1 || [',', ...specialSymbols].includes(cursorValue)) && cursorValue !== '}';
      // 是否是左侧括号
      const isLeft = _lastIndex < 0 && leftIndex !== -1 && cursorValue !== '}' && cursorValue !== '=';

      if (isCommonOrEqual) {
        /**
         * 根据计算，距离光标最近的敏感索引
         * `lastIndex` > 0 使用 equalIndex
         * 否则 使用 commaIndex
         */
        const lastIndex = Math.abs(equalIndex) - Math.abs(commaIndex);
        if (lastIndex > 0) {
          const { range: [pos1, pos2], ch: _ch } = getEditorPos({
            value: _value,
            index: equalIndex,
            ch,
            line,
            name,
            pos,
          });
          doc.replaceRange(`{${name}}`, pos1, pos2);
          pos.ch = _ch;
        } else if (lastIndex < 0) {
          const { range: [pos1, pos2], ch: _ch } = getEditorPos({
            value: _value,
            index: commaIndex,
            ch,
            line,
            name,
            pos,
          });
          doc.replaceRange(`{${name}}`, pos1, pos2);
          pos.ch = _ch;
        }
      } else if (isLeft) {
         const { range: [pos1, pos2], ch: _ch } = getEditorPos({
            value: _value,
            index: leftIndex,
            ch,
            line,
            name,
            pos,
         });

        doc.replaceRange(`{${name}}`, pos1, pos2);
        pos.ch = _ch;
      } else if (cursorValue === '}' || cursorValue === '=') {
        doc.setCursor(pos);
        editor!.focus();
        return;
      } else {
        const endPosition = commaIndex + name.length + 1;
        doc.replaceRange(
          `{${name}}`,
          { ch: commaIndex + 1, line },
          pos,
        );
        pos.ch += endPosition + 2;
      }

      dispatch!({
        type: ActionType.SetEditorValue,
        editorValue: `{${name}}`,
        isSelected: true,
        fields: [field],
      } as IActionType);
    } else {
      // 函数字段
      // 如果在空格 逗号之后有输入值，用户在下方选中函数，直接替换
      const index = getNearestIndex(_value, [',', ' ']);
      /**
       * 根据计算，距离光标最近的敏感索引
       * `lastIndex` > 0 使用 leftIndex
       * 否则 使用 index
       */
      const lastIndex = Math.abs(leftIndex) - Math.abs(index);
      if (lastIndex > 0) {
        doc.replaceRange(
          `${name}()`,
          { ch: leftIndex + 1, line },
          pos,
        );
        pos.ch = leftIndex + name.length + 2;
      } else if (lastIndex < 0) {
        const endPosition = index + name.length + 1;
        doc.replaceRange(
          `${name}()`,
          { ch: index + 1, line },
          pos,
        );
        pos.ch = endPosition + 1;
      } else {
        const endPosition = index + name.length + 1;
        doc.replaceRange(
          `${name}()`,
        { ch: index + 1, line },
        { ch: endPosition, line },
        );
        pos.ch = endPosition + 1;
      }

      dispatch!({
        type: ActionType.SetEditorValue,
        editorValue: `${name}()`,
        isSelected: true,
        isFunctionField: true,
      } as unknown as IActionType);
    }

    doc.setCursor(pos);
    editor!.focus();
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
                onClick={clickItem(field.value, true, field)}
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
