import React, {
  useCallback, useMemo, memo, useContext, Suspense, lazy, useEffect,
} from 'react';
import { chunk } from 'lodash-es';
import { Modal } from 'antd';
import 'antd/lib/modal/style/index';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/spreadsheet/spreadsheet.js';

import type { FC } from 'react';
import type { EditorChange, Editor as CodemirrorEditor } from 'codemirror';
import type { FormulaEditorProps } from '../index';
import type { IActionType } from '../store';

import { store, ActionType } from '../store';
import {
  CMOptions, dataSource, IColumn, prefixCls,
} from '../config';
import {
  evil,
  initDocTag,
  parseField,
  parseMarks,
  parseFormula,
  parseFieldData,
  parseKeyReplaceField,
} from '../utils';

const Toolbar = lazy(() => import('./Toolbar'));
const Content = lazy(() => import('./Content'));

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
      fields,
      editor,
      editorValue,
      errorText,
      modalVisible,
    },
    dispatch,
  } = useContext(store);

  /**
   * TODO: 暂时写死
   * Memo
   * @description 确认按钮 禁用状态
   * @return Boolean
   */
  const confirmButtonDisabled = useMemo(() => true, []);

  /**
   * State
   * @description 类名集合
   * @return array
   */
  const classnames = [prefixCls, className].join(' ');

  /**
   * State
   * @description 错误信息
   * @return string
   */
  const errorMsg = errorText ? `无效的字段或函数名称：${errorText}` : '';

  /**
   * Effect
   * @description 依赖 字段
   */
  useEffect(
    () => dispatch!({
      type: ActionType.SetFields,
      fields: field,
      dataSource,
    } as unknown as IActionType),
    [field, dataSource],
  );

  /**
   * Callback
   * @description 取消Modal操作
   */
  const cancelModal = useCallback(
    () => dispatch!({
      type: ActionType.SetModalVisible,
      modalVisible: false,
    } as IActionType),
    [],
  );

  // /**
  //  * Memo
  //  * @description 字段组
  //  * @return array
  //  */
  // const _fields = useMemo(
  //   () => (!field || !Array.isArray(field) || !field.length
  //     ? []
  //     : parseField(field, dataSource)),
  //   [],
  // );

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
        console.log('用户手动输入：', parseFormula(evil(editorValue)) as any);
        dispatch!({
          type: ActionType.SetErrorText,
          errorText: '',
        } as IActionType);
      }
    } catch ({ message }) {
      dispatch!({
        type: ActionType.SetErrorText,
        errorText: editorValue,
      } as IActionType);
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
    dispatch!({
      type: ActionType.SetEditor,
      editor: editorConfig,
    } as IActionType);

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
    dispatch!({
      type: ActionType.SetEditorValue,
      editorValue: _editorValue,
    } as IActionType);
    onChange?.(_editorValue);
  }, []);

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
      maskClosable={false}
      okText="确认"
      cancelText='取消'
      onCancel={cancelModal}
      okButtonProps={{ disabled: confirmButtonDisabled }}
      cancelButtonProps={{ type: 'text' }}
    >
      <Suspense fallback={'loading...'}>
        <div className={classnames} style={style}>
          <div className={`${prefixCls}-layout`}>
            <h2>请输入公式</h2>
            <CodeMirror
              className={`${prefixCls}-code-mirror`}
              autoCursor={false}
              value={value}
              options={CMOptions}
              editorDidMount={onReady}
              onChange={handleChange}
            />
            <p className={`${prefixCls}-error`}>{errorMsg}</p>
            <h2>选择极星字段或函数</h2>
            <Content />
          </div>
          {/* <Toolbar
            functions={Functions}
            variables={fields}
            insertFun={insertFun}
            insertVariable={insertVariable}
          /> */}
          {/* <div className={`${prefixCls}-main`}>
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
          </div> */}
        </div>
      </Suspense>
    </Modal>
  ), [modalVisible, confirmButtonDisabled, errorText]);
};

export default memo(Editor);
