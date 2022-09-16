import React, {
  useState, useCallback, useMemo, memo, useContext,
} from 'react';
import { chunk } from 'lodash-es';
import { Button, Modal } from 'antd';
import 'antd/lib/button/style/index';
import 'antd/lib/modal/style/index';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/spreadsheet/spreadsheet.js';

import type { FC } from 'react';
import type { EditorChange, Editor as CodemirrorEditor } from 'codemirror';
import type { FormulaEditorProps } from '../index';

import { store, ActionType } from '../store';
import Toolbar from './Toolbar';
import { Functions, CMOptions, dataSource } from '../config';
import {
  evil,
  initDocTag,
  parseField,
  parseMarks,
  parseFormula,
  parseFieldData,
  parseKeyReplaceField,
} from '../utils';

const prefixCls = 'formula-editor';

/**
 * Component
 * @description 编辑器
 * @return {JSX.Element}
 */
const Editor: FC<FormulaEditorProps> = ({
  value = '',
  style,
  className,
  field,
  onChange,
}): JSX.Element => {
  /**
   * Context
   */
  const {
    state: {
      modalVisible,
    },
    dispatch,
  } = useContext(store);

  /**
   * Callback
   * @description 取消Modal操作
   */
  const cancelModal = useCallback(() => {
    dispatch!({
      type: ActionType.SetModalVisible,
      modalVisible: false,
    });
  }, []);

  /**
   * State
   */
  const [editor, setEditor] = useState<CodemirrorEditor>(); // 编辑器配置
  const [editorValue, setEditorValue] = useState<string>(value); // 编辑器值
  const [result, setResult] = useState<string>(''); // 计算结果
  const [error, setError] = useState<string>(''); // 错误信息

  /**
   * State
   * @description 类名集合
   * @return array
   */
  const classnames = [prefixCls, className].join(' ');

  /**
   * Memo
   * @description 字段组
   * @return array
   */
  const fields = useMemo(
    () => (!field || !Array.isArray(field) || !field.length
      ? []
      : parseField(field, dataSource)),
    [],
  );

  /**
   * Callback
   * @description 点击计算公式结果
   * @return void 0
   */
  const handleClick = useCallback(() => {
    try {
      // 当前激活的字段数组长度
      const activeFieldLength = document.querySelectorAll('.formula-tag').length;
      // 回调给table的数据长度
      const callbackDataLength = dataSource.length;
      // 字段数据
      const fieldsData = parseFieldData(editorValue, dataSource);
      // 单行数据
      const chunkFields = chunk(fieldsData, activeFieldLength);

      // 存在有效字段
      if (chunkFields.length) {
        /**
         * 创建极星表格sourceData长度的数组
         * 对应计算公式字段操作
         * 回调给控制方
         */
        const resultValue = new Array(callbackDataLength);
        for (let i = 0; i < chunkFields.length; i += 1) {
          const fieldReg = editorValue.match(/\{.*?\}/g);
          // 不存在可替换字段 直接抛出
          if (!fieldReg) return;
          // 替换成有效字段
          const validFiled = parseKeyReplaceField(fieldReg, editorValue, chunkFields[i]);
          resultValue[i] = parseFormula(evil(validFiled));
        }
        // TODO: callback resultValue
        console.log(resultValue, 'resultValue');
      } else {
        // 存在用户手动输入表达式可能
        setResult(parseFormula(evil(editorValue)) as any);
        setError('');
      }
    } catch ({ message }) {
      setError(editorValue);
      setResult('');
      throw message;
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
    if (!editorValueParam) return;

    // 优先转义标点符号
    const _editorValue = parseMarks(editorValueParam);
    initDocTag(editorConfig, _editorValue, fields);
    setEditorValue(_editorValue);
    onChange?.(_editorValue);
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

  return useMemo(() => (
    <Modal
      open={modalVisible}
      closable={false}
      okText="确认"
      cancelText='取消'
      onCancel={cancelModal}
    >
      <div className={classnames} style={style}>
        <Toolbar
          functions={Functions}
          variables={fields}
          insertFun={insertFun}
          insertVariable={insertVariable}
        />
        <div className={`${prefixCls}-main`}>
          <div className={`${prefixCls}-main__code`}>
            <CodeMirror
              autoCursor={false}
              value={value}
              options={CMOptions}
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
    </Modal>
  ), [modalVisible]);
};

export default memo(Editor);
