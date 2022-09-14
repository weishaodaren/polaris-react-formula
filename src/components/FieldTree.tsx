import React, { useMemo } from 'react';
import { Tree } from 'antd';
import 'antd/lib/tree/style/index';

import type { FC } from 'react';
import type { Variable } from '../types';

import FieldVariable from './FieldVariable';

export interface FieldTreeProps {
  dataSource: Variable[];
  pick?: (value: string) => void;
}

function convert(variable: Variable, pick?: FieldTreeProps['pick']): any {
  return {
    title: (
      <FieldVariable
        type={variable.type}
        value={variable.value}
        label={variable.label}
        _value={variable._value}
        pick={pick}
      />
    ),
    key: variable.value,
  };
}

const FieldTree: FC<FieldTreeProps> = ({ dataSource, pick }) => {
  const treeData = useMemo(() =>
    dataSource.map((v) =>
      convert(v, pick)), []);

  return <Tree treeData={treeData} selectable={false} />;
};

export default FieldTree;
