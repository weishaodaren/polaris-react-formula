import React, { memo } from 'react';
import { prefixCls } from '../config';

const { DEV, MODE } = import.meta.env;
const version = DEV ? MODE : `v${__APP_VERSION__}`;
export default memo(() => <span className={`${prefixCls}-version`}>{version}</span>);
