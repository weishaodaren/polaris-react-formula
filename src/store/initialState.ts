import type { Editor } from 'codemirror';
import { Functions } from '../config';
import type { FunctionItem } from '../types';

/**
 * 默认值
 */
export const initialState = {
  /**
   * 编辑器配置
   */
  editor: undefined as undefined | Editor,

  /**
   * 编辑器值
   */
  editorValue: '',

  /**
   * 错误文案
   */
  errorText: '',

  /**
   * 模态框显示隐藏状态
   */
  modalVisible: true,

  /**
   *  当前默认字段或函数
   */
  currentFieldOrFunction: Functions[0].functions[0] as FunctionItem,
};

export type InitialState = typeof initialState;
