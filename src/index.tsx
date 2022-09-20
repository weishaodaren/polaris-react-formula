import React, { memo } from 'react';
import 'codemirror/mode/spreadsheet/spreadsheet.js';

import type { FC } from 'react';
import type { IColumn, IDataSource } from './config';
import type { OnChangeCallback } from './types';

import { injectWindowApi } from './utils';
import { Store } from './store';
import Editor from './components';

import './styles';

injectWindowApi();

export interface FormulaEditorProps {
  value?: string
  onChange?: ((params: OnChangeCallback) => void)
  className?: string
  style?: React.CSSProperties
  field: IColumn
  dataSource?: IDataSource
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
