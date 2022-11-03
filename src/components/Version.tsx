import React, { memo } from 'react';
import { version } from '../../package.json';
import { prefixCls } from '../config';

export default memo(() => <span className={`${prefixCls}-version`}>{`v${version}`}</span>);
