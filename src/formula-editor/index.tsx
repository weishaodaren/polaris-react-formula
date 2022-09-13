import React, { useState, useCallback, useMemo } from 'react';
import * as formulajs from '@formulajs/formulajs';
import { Button } from 'antd';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { ISchema } from '@formily/json-schema';
import classNames from 'classnames';

import type { FC } from 'react';
import type { EditorChange, Editor as CodemirrorEditor } from 'codemirror';
import type { FunctionGroup, Variable, IFieldMeta } from './types';

import { Toolbar } from './components';
import funs from './functions';
import {
  parseSchema,
  cleanVoidSchema,
  cleanVoidMetaSchema,
  parseMetaSchema,
  CleanSchemaResult,
  CleanMetaSchemaResult,
  initDocTag,
} from './utils';
import './styles';

import 'codemirror/mode/spreadsheet/spreadsheet.js';

export interface FormulaEditorProps {
  title?: string;
  value?: string;
  path?: string;
  functions?: FunctionGroup[];
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  schema?: ISchema | IFieldMeta;
  metaSchema?: boolean;
}

// 计算公式表达式
const FormulaExpression = funs.map((fun) => (Array.isArray(fun.functions)
  ? fun.functions.length
  && fun.functions.map(({ name }) => name)
  : []));

const cmOptions = {
  mode: 'text/x-spreadsheet',
  line: true,
  lineWrapping: true,
};

const prefixCls = 'formula-editor';

const FormulaEditor: FC<FormulaEditorProps> = ({
  title,
  value = '',
  path,
  functions = funs,
  onChange,
  style,
  className,
  schema,
  metaSchema,
}) => {
  /**
   * State
   */
  const [editor, setEditor] = useState<CodemirrorEditor>();
  const [editorValue, setEditorValue] = useState(value);
  const [result, setResult] = useState('');

  /**
   * useCallback
   * @description 转义变量组
   * @return object
   */
  const parseSchemaVariables: (
    schemaParams: ISchema,
    pathParams: string,
    refPathParams?: string
  ) => Variable = useCallback(
    (
      schemaParams,
    ) => (metaSchema
      ? parseMetaSchema(schemaParams as IFieldMeta)
      : parseSchema(schemaParams)),
    [metaSchema],
  );

  /**
   * useMemo
   * @description 变量组
   * @return array
   */
  const innerVariables = useMemo(() => {
    if (!schema) return [];

    const resultValue = metaSchema
      ? cleanVoidMetaSchema(schema as IFieldMeta)
      : cleanVoidSchema(schema as ISchema);

    if (!resultValue) return [];

    if (Array.isArray(resultValue)) {
      return resultValue
        .map((r: CleanSchemaResult | CleanMetaSchemaResult) => (r.schema ? parseSchemaVariables(r.schema as ISchema, '', path) : null))
        .filter((v) => v !== null) as Variable[];
    }

    return resultValue.schema
      ? parseSchemaVariables(resultValue.schema as ISchema, '', path).children
      : [];
  }, []);

  /**
   * Callback
   * @description 点击计算公式结果
   * @return void 0
   */
  const handleClick = useCallback(() => {
    console.log(editorValue, 'editorValue');
    let _result;
    try {
      _result = eval(editorValue);
      console.log(_result, 'ssssss');
    } catch ({ message }) {
      console.log(message, 'mmmm');
      _result = formulajs.SUM(editorValue);
      console.log(_result, 'ooooo');
    } finally {
      setResult(_result);
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
      initDocTag(editorConfig, editorValueParam, innerVariables);
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
      initDocTag(editorConfig, editorValueParam, innerVariables);
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
      if (editor === null) return;
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
      if (editor === null) return;
      const doc = editor!.getDoc();
      const pos = doc.getCursor();
      doc.replaceRange(`{!${variable}}`, pos, pos);
      editor!.focus();
    },
    [editor],
  );

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      <Toolbar
        functions={functions}
        variables={innerVariables}
        insertFun={insertFun}
        insertVariable={insertVariable}
      />
      <div className={`${prefixCls}-main`}>
        <div className={`${prefixCls}-main__code`}>
          <h1>{title}</h1>
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
          <Button type='primary' onClick={handleClick}>Calc it</Button>
        </div>
      </div>
    </div>
  );
};

export default FormulaEditor;
