import React, {
  useCallback,
  useMemo,
  useContext,
  memo,
} from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import type { FC } from 'react';
import type { EditorChange, Editor as CodemirrorEditor } from 'codemirror';
import type { Variable } from '../types';
import type { IActionType } from '../store';

import { CodeMirrorActionType } from '../enum';
import { store, ActionType } from '../store';
import {
  CMOptions, prefixCls,
} from '../config';
import {
  initDocTag,
  parseMarks,
} from '../utils';

interface IProps {
  value: string
  fields: Variable[]
}

/**
 * Component
 * @description 代码输入框
 * @return {JSX.Element}
 */
const Code: FC<IProps> = ({
  value = '',
  fields,
}): JSX.Element => {
  /**
   * Context
   */
  const {
    state: { fieldValues },
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
    const doc = editorConfig.getDoc();
    const pos = doc.getCursor();

    editorConfig.setCursor(pos);
    editorConfig!.focus();

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
    // 初始化文本标签
    initDocTag(editorConfig, _editorValue, fields as Variable[]);

    /**
     * 捕获删除操作逻辑
     * 如果删除有效字段，不执行模糊查询
     * 否则执行默认查询(set 状态)
     */
    const { origin, removed = [''] } = data;
    // 删除的是有效字段
    if (CodeMirrorActionType.Delete === origin && fieldValues.includes(removed[0])) {
      dispatch!({
        type: ActionType.SetEditorValue,
        isSelected: true,
      } as IActionType);
    } else {
      dispatch!({
        type: ActionType.SetEditorValue,
        editorValue: _editorValue.trim(),
      } as IActionType);
    }
  }, []);

  return useMemo(() => (
    <CodeMirror
      className={`${prefixCls}-code-mirror`}
      autoCursor={true}
      value={value}
      options={CMOptions}
      editorDidMount={onReady}
      onChange={handleChange}
    />
  ), [value]);
};

export default memo(Code);
