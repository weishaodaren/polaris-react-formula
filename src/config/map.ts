import { ErrorType } from '../enum';

/**
 * 常量映射
 */
export const ConstantsMap = new Map();

/**
 * 错误映射
 */
export const ErrorMap = new Map()
  .set(ErrorType.Pass, '')
  .set(ErrorType.Invalid, '无效的极星字段或函数名称：')
  .set(ErrorType.Error, '错误的公式：')
  .set(ErrorType.Unknown, '未知的运算符：');
