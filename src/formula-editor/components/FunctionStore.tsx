
import type { FC } from 'react'
import type { FunctionGroup } from '../types';

import React from 'react';
import { Collapse } from 'antd';

import '../styles/functionStore.less';

const { Panel } = Collapse;


export interface FunctionStoreProps {
  dataSource?: FunctionGroup[];
  check?: (name: string) => void;
}

const prefixCls = 'function-store';

const FunctionStore: FC<FunctionStoreProps> = ({ dataSource = [], check }) => {
  return (
    <Collapse className={prefixCls} bordered={false} defaultActiveKey={[0]} expandIconPosition="start" ghost>
      {
        dataSource.map(
          (fnGroup, index) => (
            <Panel className={`${prefixCls}-group`} header={fnGroup.name} key={index}>
              {
                fnGroup.functions.map((fn, index) => (
                  <div className="function-item" key={index} onClick={() => check && check(fn.name)}>
                    <div className="function-item__name">
                      {fn.name}
                    </div>
                    <div className="function-item__desc">
                      {fn.description}
                    </div>
                  </div>
                ))
              }
            </Panel>
          )
        )
      }
    </Collapse>
  );
}

export default FunctionStore;

