import { Functions } from '../config';
import type { FunctionItem } from '../types';

/**
 * 默认值
 */
export const initialState = {
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
