import React, { memo } from 'react';
import 'codemirror/mode/spreadsheet/spreadsheet.js';

import type { FC } from 'react';
import type { IColumn, IDataSource } from './config';

import { Store } from './store';
import Editor from './components';

import './styles';

export interface FormulaEditorProps {
  value?: string
  onChange?: (value: string) => void
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
