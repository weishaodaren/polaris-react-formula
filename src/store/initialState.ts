import type { Editor } from 'codemirror';
import type { IColumn } from '../config';
import type { Variable, FunctionGroup } from '../types';
import type { IErrorType } from '../enum';
import { Functions, Sample } from '../config';

const FunctionNames = [];
for (let i = 0; i < Functions.length; i += 1) {
  for (let j = 0; j < Functions[i].functions.length; j += 1) {
    FunctionNames.push(Functions[i].functions[j].name);
  }
}

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
   * 禁用状态
   */
  disabled: true,

  /**
   * 错误文案
   */
  errorText: '',

  /**
   * 错误码
   */
  errorCode: undefined as IErrorType | unknown,

  /**
   * 字段组
   */
  fields: undefined as undefined | Variable[] | IColumn,

  /**
   * 字段组(原始)
   */
  originalFields: undefined as undefined | Variable[] | IColumn,

  /**
   *  当前默认字段或函数
   */
  currentFieldOrFunction: Sample,

  /**
   * 函数字段
   */
  functions: Functions as FunctionGroup[],

  /**
   * 是否从选择面板选中
   */
  isSelected: false,

  /**
   * 字段值 [{code}..]
   */
  fieldValues: [] as string[],

  /**
   * 函数值
   */
  FunctionNames,
};

export type InitialState = typeof initialState;
