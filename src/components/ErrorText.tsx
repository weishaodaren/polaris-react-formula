import React, { useMemo, useContext } from 'react';
import type { FC } from 'react';
import { store } from '../store';
import { prefixCls, ErrorMap } from '../config';

/**
 * Component
 * @description 错误文案
 * @return {JSX.Element}
 */
const ErrorText: FC = (): JSX.Element => {
  /**
   * Context
   */
  const {
    state: {
      errorCode,
      errorText,
    },
  } = useContext(store);

  /**
   * State
   * @description 错误信息
   * @return string
   */
  const errorMsg = errorText ? ErrorMap.get(errorCode) + errorText : '';

  return useMemo(() => (
    <p className={`${prefixCls}-error`}>{errorMsg}</p >
  ), [errorCode]);
};

export default ErrorText;
