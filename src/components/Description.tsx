import React, { useContext, useMemo } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import type { FC } from 'react';
import type { FunctionItem, Variable } from '../types';
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

  const {
    name, description, useage, label, value, example,
  } = currentFieldOrFunction as FunctionItem & Variable;

  return useMemo(() => (
    <div className={`${prefixCls}-description-layout`}>
      <h2>{name ?? label}</h2>
      <div className={`${prefixCls}-description-layout-description`}>{description ?? `返回 ${label} 列单元格的值`}</div>
      <div className={`${prefixCls}-description-layout-description-useage`}>用法</div>
      <code>{useage ?? `{${value}}`}</code>
      <div className={`${prefixCls}-description-layout-description-example`}>举个例子</div>
      <CodeMirror options={{ readOnly: 'nocursor' }} value={example ?? `{${value}}`} />
    </div>
  ), [currentFieldOrFunction]);
};

export default Description;
