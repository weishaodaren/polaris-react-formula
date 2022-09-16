import React from 'react';
import type { FC } from 'react';
import { prefixCls } from '../config';

/**
 * Component
 * @description 右侧内容描述
 */
const Description: FC = (): JSX.Element => {
  console.log('Description');

  return <div className={`${prefixCls}-description-layout`}>Description</div>;
};

export default Description;
