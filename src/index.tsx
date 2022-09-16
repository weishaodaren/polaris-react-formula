import React, { memo } from 'react';
import { Modal } from 'antd';
import 'antd/lib/modal/style/index';

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
    <Modal open>
      <Editor {...props} />
    </Modal>
  </Store>
);

export default memo(FormulaEditor);
