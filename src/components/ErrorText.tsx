import React, { useMemo, useContext } from 'react';
import type { FC } from 'react';
import { store } from '../store';
import { prefixCls } from '../config';

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
      errorText,
    },
  } = useContext(store);

  /**
   * State
   * @description 错误信息
   * @return string
   */
  const errorMsg = errorText ? `无效的字段或函数名称：${errorText}` : '';

  return useMemo(() => (
    <p className={`${prefixCls}-error`}>{errorMsg}</p >
  ), [errorText]);
};

export default ErrorText;
