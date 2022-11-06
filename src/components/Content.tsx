import React, { Suspense, lazy, useMemo } from 'react';
import type { FC } from 'react';
import { prefixCls } from '../config';

const SelectPanel = lazy(() => import('./SelectPanel'));
const Description = lazy(() => import('./Description'));

/**
 * Component
 * @description 内容
 */
const Content: FC = () => useMemo(() => (
  <Suspense fallback={'loading ...'}>
    <div className={`${prefixCls}-content-layout`}>
      <SelectPanel />
      <Description />
    </div>
  </Suspense>
), []);

export default Content;
