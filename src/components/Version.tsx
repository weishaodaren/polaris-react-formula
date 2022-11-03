import React, { memo } from 'react';
import { prefixCls } from '../config';

export default memo(() => <span className={`${prefixCls}-version`}>{`v${__APP_VERSION__}`}</span>);
