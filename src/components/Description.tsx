import React, { useContext, useMemo } from 'react';
import type { FC } from 'react';
import { prefixCls } from '../config';
import { store } from '../store';

/**
 * Component
 * @description 右侧内容描述
 */
const Description: FC = (): JSX.Element => {
  /**
   * Context
   */
  const {
    state: {
      currentFieldOrFunction,
    },
  } = useContext(store);

  return useMemo(() => (
    <div className={`${prefixCls}-description-layout`}>
      <h2>{currentFieldOrFunction.name}</h2>
      <div className={`${prefixCls}-description-layout-description`}>{currentFieldOrFunction.description}</div>
      <div className={`${prefixCls}-description-layout-description-useage`}>用法</div>
      <code>{currentFieldOrFunction.useage}</code>
    </div>
  ), [currentFieldOrFunction]);
};

export default Description;
