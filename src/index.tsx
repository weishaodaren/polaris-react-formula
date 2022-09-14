import React, { useState, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import 'antd/lib/button/style/index';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import type { FC } from 'react';
import type { EditorChange, Editor as CodemirrorEditor } from 'codemirror';
import type { IColumn } from './config/mock.column';

import Toolbar from './components/Toolbar';
import functions from './config/functions';
import {
  parseField,
  parseFormula,
  initDocTag,
  evil,
} from './utils';
import './styles';

import 'codemirror/mode/spreadsheet/spreadsheet.js';

export interface FormulaEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  field: IColumn
}

// codeMirror 配置
const cmOptions = {
  mode: 'text/x-spreadsheet',
  line: true,
  lineWrapping: true,
};

const prefixCls = 'formula-editor';

/**
 * Component
 * @description 公式编辑器
 * @return {JSX.Element}
 */
const FormulaEditor: FC<FormulaEditorProps> = ({
  value = '',
  style,
  className,
  field,
  onChange,
}) => {
  /**
   * State
   */
  const [editor, setEditor] = useState<CodemirrorEditor>(); // 编辑器配置
  const [editorValue, setEditorValue] = useState<string>(value); // 编辑器值
  const [result, setResult] = useState<string>(''); // 计算结果
  const [error, setError] = useState<string>(''); // 错误信息

  /**
   * Memo
   * @description 类名集合
   * @return array
   */
  const classnames = useMemo(
    () =>
      [prefixCls, className].join(' '),
    [],
  );

  /**
   * Memo
   * @description 字段组
   * @return array
   */
  const fields = useMemo(
    () =>
    (!field || !Array.isArray(field) || !field.length
      ? []
      : parseField(field)),
    [],
  );

  /**
   * Callback
   * @description 点击计算公式结果
   * @return void 0
   */
  const handleClick = useCallback(() => {
    try {
      setResult(parseFormula(evil(editorValue)) as any);
      setError('');
    } catch ({ message }) {
      setError(editorValue);
      setResult('');
    }
  }, [editorValue]);

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
    setEditor(editorConfig);
    if (editorValueParam !== null && editorValueParam !== '') {
      initDocTag(editorConfig, editorValueParam, fields);
    }
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
    if (editorValueParam !== null || editorValueParam !== '') {
      initDocTag(editorConfig, editorValueParam, fields);
    }
    setEditorValue(editorValueParam);
    onChange?.(editorValueParam);
  }, []);

  /**
   * Callback
   * @description 插入函数
   * @param code 当前输入值
   * @return void 0
   */
  const insertFun = useCallback(
    (
      code: string,
    ) => {
      if (!editor) return;
      const doc = editor!.getDoc();
      const pos = doc.getCursor();
      doc.replaceRange(`${code}()`, pos);
      pos.ch += code.length + 1;
      doc.setCursor(pos);
      editor!.focus();
    },
    [editor],
  );

  /**
   * Callback
   * @description 插入变量
   * @param variable 当前输入变量
   * @return void 0
   */
  const insertVariable = useCallback(
    (
      variable: string,
    ) => {
      if (!editor) return;
      const doc = editor!.getDoc();
      const pos = doc.getCursor();
      doc.replaceRange(`{${variable}}`, pos, pos);
      editor!.focus();
    },
    [editor],
  );

  return (
    <div className={classnames} style={style}>
      <Toolbar
        functions={functions}
        variables={fields}
        insertFun={insertFun}
        insertVariable={insertVariable}
      />
      <div className={`${prefixCls}-main`}>
        <div className={`${prefixCls}-main__code`}>
          <CodeMirror
            autoCursor={false}
            value={value}
            options={cmOptions}
            editorDidMount={onReady}
            onChange={handleChange}
          />
          <code style={{
            border: '1px dotted #126',
            display: 'block',
            width: '100%',
            height: '100px',
          }}>{`计算结果：${result}`}</code>
          {error && <h1>{`无效的列或函数名称：${error}`}</h1>}
          <Button type='primary' onClick={handleClick}>Calc it</Button>
        </div>
      </div>
    </div>
  );
};

export default FormulaEditor;
