import React, { useContext, useMemo } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import type { FC } from 'react';
import type { EditorConfiguration } from 'codemirror';
import type { FunctionItem, Variable } from '../types';
import { prefixCls } from '../config';
import { store } from '../store';
import { Locale } from '../locale';

const Style = `${prefixCls}-description-layout`;

const Options: EditorConfiguration = {
  readOnly: 'nocursor',
};

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
    name, description, useage, label, example,
  } = currentFieldOrFunction as FunctionItem & Variable;

  Options.theme = example ? 'default' : '';

  return useMemo(() => (
    <div className={Style}>
      <h2>{name ?? label}</h2>
      <div className={`${Style}-description`}>
        {description ?? `${Locale[85]} ${label} ${Locale[86]}`}
      </div>
      <div className={`${Style}-description-useage`}>{Locale[83]}</div>
      <code>{useage ?? `{${label}}`}</code>
      <div className={`${Style}-description-example`}>{Locale[84]}</div>
      <CodeMirror
        className={`${prefixCls}-code-mirror-sample`}
        options={Options}
        value={example ?? `{${label}}`}
      />
    </div>
  ), [currentFieldOrFunction]);
};

export default Description;
