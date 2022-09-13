import React, { useMemo } from 'react';
import { Tree } from 'antd';

import type { FC } from 'react';
import type { Variable } from '../types';

import FieldVariable from './FieldVariable';

export interface FieldTreeProps {
  dataSource: Variable[];
  pick?: (value: string) => void;
}

function convert(variable: Variable, pick?: (value: string) => void): any {
  return {
    title: (
      <FieldVariable
        type={variable.type}
        value={variable.value}
        label={variable.label}
        pick={pick}
      />
    ),
    key: variable.value,
    children: (variable.children || []).map((child) =>
      convert(child, pick)),
  };
}

const FieldTree: FC<FieldTreeProps> = ({ dataSource, pick }) => {
  const treeData = useMemo(() =>
    dataSource.map((v) =>
      convert(v, pick)), []);

  return <Tree treeData={treeData} selectable={false} />;
};

export default FieldTree;
