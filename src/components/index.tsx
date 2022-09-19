import React, {
  useCallback, useMemo, memo, useContext, Suspense, lazy, useEffect,
} from 'react';
import { chunk } from 'lodash-es';
import { Icon } from 'polaris-react-component';
import { Modal, Tooltip } from 'antd';
import 'antd/lib/tooltip/style/index';
import 'antd/lib/modal/style/index';

import type { FC } from 'react';
import type { FormulaEditorProps } from '../index';
import type { IActionType } from '../store';

import { store, ActionType } from '../store';
import { ErrorType } from '../enum';
import { dataSource, prefixCls } from '../config';
import {
  evil,
  parseFormula,
  parseFieldData,
  parseKeyReplaceField,
} from '../utils';

const Code = lazy(() => import('./Code'));
const Content = lazy(() => import('./Content'));
const ErrorText = lazy(() => import('./ErrorText'));

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
      disabled,
      editorValue,
      modalVisible,
    },
    dispatch,
  } = useContext(store);

  /**
   * State
   * @description 类名集合
   * @return array
   */
  const classnames = [prefixCls, className].join(' ');

  /**
   * Effect
   * @description 依赖 极星表单传入的原表头字段 原数据
   */
  useEffect(() => {
    dispatch!({
      type: ActionType.SetFields,
      fields: field,
      dataSource,
    } as unknown as IActionType);
  }, [field, dataSource]);

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

  /**
   * Callback
   * @description 模态框确认操作 点击计算公式结果
   * @return void 0
   */
  const confirmModal = useCallback(() => {
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
          errorCode: ErrorType.Pass,
          errorText: '',
        } as IActionType);
      }
    } catch ({ message }) {
      dispatch!({
        type: ActionType.SetErrorText,
        errorCode: ErrorType.Error,
        errorText: editorValue,
      } as IActionType);
      throw message;
    }
  }, [editorValue]);

  return useMemo(() => (
    <Modal
      open={modalVisible}
      closable={false}
      maskClosable={false}
      okText="确认"
      cancelText='取消'
      okButtonProps={{ disabled }}
      onCancel={cancelModal}
      onOk={confirmModal}
    >
      <Suspense fallback={'loading...'}>
        <div className={classnames} style={style}>
          <div className={`${prefixCls}-layout`}>
            <h2>请输入公式</h2>
            <Tooltip title="点击了解公式技巧">
              <Icon type="icondoubt" />
            </Tooltip>
            {/* 代码编辑器 */}
            <Code
              value={value}
              onChange={onChange}
            />
            {/* 错误提示 */}
            <ErrorText />
            <h2>选择极星字段或函数</h2>
            {/* 下方显示内容 */}
            <Content />
          </div>
        </div>
      </Suspense>
    </Modal>
  ), [modalVisible, disabled]);
};

export default memo(Editor);
