import React, { Suspense, lazy } from 'react';
import type { FC } from 'react';
import { prefixCls } from '../config';

const SelectPanel = lazy(() => import('./SelectPanel'));
const Description = lazy(() => import('./Description'));

/**
 * Component
 * @description 内容
 */
const Content: FC = () => {
  console.log(2);

  return (
    <Suspense fallback={'加载中'}>
      <div className={`${prefixCls}-content-layout`}>
        <SelectPanel />
        <Description />
      </div>
    </Suspense>
  );
};

export default Content;
