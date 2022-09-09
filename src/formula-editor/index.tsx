import type { FC } from 'react'
import type { EditorChange, Position, Editor as CodemirrorEditor } from 'codemirror'
import type { FunctionGroup, Variable, IFieldMeta } from './types';

import React, { useState, useCallback, useMemo } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { ISchema } from '@formily/json-schema';
import classNames from 'classnames';
import { Toolbar } from './components';
import { default as funs } from './functions';
import {
  parseSchema,
  cleanVoidSchema,
  cleanVoidMetaSchema,
  parseMetaSchema,
  CleanSchemaResult,
  CleanMetaSchemaResult,
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

  /**
   * useCallback
   * @description 转义变量组
   * @return object
   */ 
  const parseSchemaVariables = useCallback((
    schema: ISchema,
    path: string,
    refPath?: string
  ) => 
      metaSchema
        ? parseMetaSchema(schema as IFieldMeta)
        : parseSchema(schema)
    ,
    [metaSchema],
  );

  /**
   * useMemo
   * @description 变量组
   * @return array
   */ 
  const innerVariables = useMemo(() => {
    if (schema) {
      const result = metaSchema
        ? cleanVoidMetaSchema(schema as IFieldMeta)
        : cleanVoidSchema(schema as ISchema);
      if (result) {
        return Array.isArray(result)
          ? (result
              .map((r: CleanSchemaResult | CleanMetaSchemaResult) =>
                r.schema ? parseSchemaVariables(r.schema as ISchema, '', path) : null,
              )
              .filter((v) => v != null) as Variable[])
          : result.schema
          ? parseSchemaVariables(result.schema as ISchema, '', path).children
          : [];
      }
      return [];
    }
  }, []);

  /**
   * Callback
   * @description DOM挂载完执行
   * @param editor 编辑器配置
   * @param value 值
   * @return void 0
   */ 
  const onReady = useCallback((
    editor: CodemirrorEditor,
    value: string
  ) => {
    setEditor(editor);
    if (value != null && value !== '') {
      initDocTag(editor, value);
    }
  }, []);

  /**
   * Callback
   * @see https://github.com/scniro/react-codemirror2
   * @descritpion 修改编辑器
   * @param editor 编辑器配置
   * @param data 编辑器操作参数
   * @param value 编辑器返回值
   * @return void 0
   */ 
  const handleChange = useCallback((
    editor: CodemirrorEditor,
    data: EditorChange,
    value: string
  ) => {
    if (value !== null || value !== '') {
      initDocTag(editor, value);
    }
    onChange && onChange(value);
  }, []);

  /**
   * Function
   * @description 初始化文本标签
   * @param editor 编辑器配置
   * @param code 值
   * @return void 0
   */ 
  const initDocTag = (
    editor: CodemirrorEditor,
    code: string
  ) => {
    const contents = code.split('\n');
    contents.forEach((content, idx) =>
      initLineTag(editor, content, idx, innerVariables),
    );
  };

  /**
   * Function
   * @description 初始化行标签
   * @param editor 编辑器配置
   * @param content 当前值
   * @param line 当前行
   * @param innerVariables 输入的内部变量组
   * @return void 0
   */ 
  const initLineTag = (
    editor: CodemirrorEditor,
    content: string,
    line: number,
    innerVariables: Variable[] = [],
  ) => {
    (innerVariables || []).forEach((variable) => {
      const variableMark = `{!${variable.value}}`;
      const regex = new RegExp(variableMark, 'g');
      while (regex.exec(content) !== null) {
        const begin = { line, ch: regex.lastIndex - variableMark.length };
        const end = { line, ch: regex.lastIndex };
        replaceVariable(editor, begin, end, variable);
      }
      if (variable.children && variable.children.length > 0) {
        initLineTag(editor, content, line, variable.children);
      }
    });
  };

  /**
   * Callback
   * @description 插入函数
   * @param code 当前输入值
   * @return void 0
   */ 
  const insertFun = useCallback((
    code: string
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
  const insertVariable = useCallback((
    variable: string
  ) => {
      if (editor === null) return;
      const doc = editor!.getDoc();
      const pos = doc.getCursor();
      doc.replaceRange(`{!${variable}}`, pos, pos);
      editor!.focus();
    },
    [editor],
  );

  /**
   * Callback
   * @description 替换变量
   * @param editor 编辑器配置
   * @param begin 开始位置
   * @param end 结束位置
   * @param val 值信息{label: '', value: '', type: '', fullname: ''}
   * @return void 0
   */ 
  const replaceVariable = (
    editor: CodemirrorEditor,
    begin: Position,
    end: Position,
    val: Variable,
  ) => {
    const doc = editor.getDoc();
    const el = document.createElement('span');
    el.innerText = val.fullName || val.label || val.value;
    el.className = 'formula-tag';
    doc.markText(begin, end, {
      replacedWith: el,
    });
  };

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
        </div>
      </div>
    </div>
  );
};

export default FormulaEditor;
