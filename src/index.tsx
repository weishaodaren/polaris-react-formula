import React, { memo } from 'react';
import 'codemirror/mode/spreadsheet/spreadsheet.js';

import type { FC } from 'react';
import type { IColumn } from './config';

import { injectWindowApi } from './utils';
import { Store } from './store';
import Editor from './components';

import './styles';

export * from './utils';

injectWindowApi();

export interface FormulaEditorProps {
  /**
   * 控制Modal显示隐藏
   */
  visible: boolean

  /**
   * 公式值
   */
  value?: string

  /**
   * 传递类名
   */
  className?: string

  /**
   * 传递行内样式 尽量使用className
   */
  style?: React.CSSProperties

  /**
   * 字段 列
   */
  field: IColumn

  /**
   * 关闭Modal
   */
  onClose: () => void

  /**
   * 获取计算值 回调
   */
  onChange?: ((formula: string) => void)
}

/**
 * Component
 * @description 公式编辑器
 * @return {JSX.Element}
 */
const FormulaEditor: FC<FormulaEditorProps> = (props): JSX.Element => (
  <Store>
    <Editor {...props} />
  </Store>
);

export default memo(FormulaEditor);
