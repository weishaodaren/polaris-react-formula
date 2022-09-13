import React, { useCallback } from 'react';
import { Tabs } from 'antd';

import type { FC, ReactNode } from 'react';
import type { FunctionGroup, Variable } from '../types';

import FunctionStore from './FunctionStore';
import FxIcon from './FxIcon';
import VariableIcon from './VariableIcon';
import FieldTree from './FieldTree';

export interface ToobarProps {
  functions?: FunctionGroup[];
  variables?: Variable[];
  insertFun?: (fn: string) => void;
  insertVariable?: (variable: string) => void;
}

const Toolbar: FC<ToobarProps> = ({
  functions,
  variables = [],
  insertFun,
  insertVariable,
}) => {
  const prefixCls = 'formula-editor-toolbar';

  const TabNode = useCallback(
    (props: { name: string; icon?: ReactNode }) =>
    (
      <span>
        {props.icon ? (
          <span role="img" className="anticon">
            {props.icon}
          </span>
        ) : null}
        {props.name}
      </span>
    ),
    [],
  );

  return (
    <div className={prefixCls}>
      <Tabs defaultActiveKey="fx" centered items={[
        {
          label: <TabNode name="函数" icon={<FxIcon />} />,
          key: 'fx',
          children: <FunctionStore dataSource={functions} check={insertFun} />,
        },
        {
          label: <TabNode name="字段" icon={<VariableIcon />} />,
          key: 'field',
          children: <FieldTree dataSource={variables} pick={insertVariable} />,
        },
      ]} />
    </div>
  );
};

export default Toolbar;
