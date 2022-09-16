import React, { Fragment } from 'react';
import type { FC } from 'react';

import { prefixCls, Functions } from '../config';

/**
 * Component
 * @description 左侧选择面板
 */
const SelectPanel: FC = (): JSX.Element => {
  console.log('SelectPanel');

  return (
    <div className={`${prefixCls}-select-panel-layout`}>
      {Functions.map(({ name, functions }, index) => (
        <Fragment key={index}>
          <h3>{name}</h3>
          {functions.map(({ name: label }) => <div className={`${prefixCls}-select-panel-layout-list-item`} key={label}>{label}</div>)}
        </Fragment>
      ))}
    </div>);
};

export default SelectPanel;
