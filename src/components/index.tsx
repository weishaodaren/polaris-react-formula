import React, {
  useCallback, useMemo, memo, useContext, useEffect,
} from 'react';
import { Modal, Tooltip } from 'antd';
import { Icon } from 'polaris-react-component';
import 'antd/lib/tooltip/style/index';
import 'antd/lib/modal/style/index';

import type { FC } from 'react';
import type{ Variable } from '../types';
import type { FormulaEditorProps } from '../index';
import type { IActionType } from '../store';

import { store, ActionType } from '../store';
import { ErrorType } from '../enum';
import { prefixCls } from '../config';
import { reverseField } from '../utils';

import Code from './Code';
import Content from './Content';
import ErrorText from './ErrorText';

/**
 * Component
 * @description 编辑器
 * @return {JSX.Element}
 */
const Editor: FC<FormulaEditorProps> = ({
  visible,
  value = '',
  style,
  className,
  field = [],
  onChange,
  onClose,
  onLink = undefined,
}): JSX.Element => {
  /**
   * Context
   */
  const {
    state: {
      fields,
      originalFields,
      disabled,
      editorValue,
      editor,
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
   * @description 依赖Props 修改初始值
   */
  useEffect(() => {
    dispatch!({
      type: ActionType.SetInitialState,
      fields: field,
      editorValue: value,
    } as IActionType);
  }, [field, value]);

  /**
   * Callback
   * @description 模态框确认操作 点击计算公式结果
   * @return void 0
   */
  const confirmModal = useCallback(() => {
    try {
      /**
       * 通过编辑器反馈值
       * 获取真正的输入框内容
       */
      const _editorValue = editor?.getValue();
      if (!_editorValue) onChange?.('', '');
      else onChange?.(editorValue, reverseField(editorValue, originalFields as Variable[]));

      onClose?.();
      dispatch!({
        type: ActionType.SetErrorText,
        errorCode: ErrorType.Pass,
        errorText: '',
      } as IActionType);
    } catch ({ message }) {
      dispatch!({
        type: ActionType.SetErrorText,
        errorCode: ErrorType.Error,
        errorText: message,
      } as IActionType);
      throw message;
    }
  }, [editorValue, editor]);

  return useMemo(() => (
    <Modal
      centered
      open={visible}
      closable={false}
      maskClosable={false}
      okText="确认"
      cancelText='取消'
      okButtonProps={{ disabled }}
      destroyOnClose
      onCancel={onClose}
      onOk={confirmModal}
    >
      <div className={classnames} style={style}>
        <div className={`${prefixCls}-layout`}>
          <h2>请输入公式</h2>
          <Tooltip title="点击了解公式技巧">
            <Icon type="icondoubt" onClick={onLink} />
          </Tooltip>
          {fields && <Code value={value} fields={fields as Variable[]} />}
          <ErrorText />
          <h2>选择极星字段或函数</h2>
          <Content />
        </div>
      </div>
    </Modal>
  ), [visible, disabled, editorValue, fields, editor]);
};

export default memo(Editor);
