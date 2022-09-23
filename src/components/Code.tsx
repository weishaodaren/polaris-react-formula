import React, {
  useCallback, useMemo, useContext,
} from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import type { FC } from 'react';
import type { EditorChange, Editor as CodemirrorEditor } from 'codemirror';
import type { Variable } from '../types';
import type { FormulaEditorProps } from '../index';
import type { IActionType } from '../store';

import { store, ActionType } from '../store';
import {
  CMOptions, prefixCls,
} from '../config';
import {
  initDocTag,
  parseMarks,
} from '../utils';

type IProps = Pick<FormulaEditorProps, 'value'>;

/**
 * Component
 * @description 代码输入框
 * @return {JSX.Element}
 */
const Code: FC<IProps> = ({
  value = '',
}): JSX.Element => {
  /**
   * Context
   */
  const {
    state: {
      fields,
    },
    dispatch,
  } = useContext(store);

  /**
   * Callback
   * @description DOM挂载完执行
   * @param editorConfig 编辑器配置
   * @param editorValueParam 值
   * @return void 0
   */
  const onReady = useCallback((
    editorConfig: CodemirrorEditor,
    editorValueParam: string,
  ) => {
    initDocTag(editorConfig, editorValueParam, fields as Variable[]);

    dispatch!({
      type: ActionType.SetEditor,
      editor: editorConfig,
    } as IActionType);
  }, []);

  /**
   * Callback
   * @see https://github.com/scniro/react-codemirror2
   * @descritpion 修改编辑器
   * @param editorConfig 编辑器配置
   * @param data 编辑器操作参数
   * @param editorValueParam 编辑器返回值
   * @return void 0
   */
  const handleChange = useCallback((
    editorConfig: CodemirrorEditor,
    data: EditorChange,
    editorValueParam: string,
  ) => {
    // 优先转义标点符号 无内容不执行转义
    const _editorValue = editorValueParam ? parseMarks(editorValueParam) : editorValueParam;
    initDocTag(editorConfig, _editorValue, fields as Variable[]);
    dispatch!({
      type: ActionType.SetEditorValue,
      editorValue: _editorValue,
    } as IActionType);
  }, []);

  return useMemo(() => (
    <CodeMirror
      className={`${prefixCls}-code-mirror`}
      autoCursor={false}
      value={value}
      options={CMOptions}
      editorDidMount={onReady}
      onChange={handleChange}
    />
  ), [value]);
};

export default Code;
