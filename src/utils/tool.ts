/* eslint-disable @typescript-eslint/no-implied-eval */
import escapeRegExp from 'lodash/escapeRegExp';
import type {
  ReplaceVariable,
  InitLineTag,
  InitDocTag,
  FuzzySearchField,
  FuzzySearchFunctions,
  UseFormula,
  IsValidField,
  ReverseField,
  GetCodeBlock,
  GetFieldBlock,
  GetNearestIndex,
  IsValidFunction,
  GetEditorPos,
} from '../types';
import { ErrorType } from '../enum';
import {
  parseFieldData,
  parseKeyReplaceField,
  parseFormula,
  parseKey,
} from './parse';
import { braceReg } from './regexp';
import { ConstantsMap } from '../config';
import { getEscapedTimes } from './filter';

// 特殊计算符号
export const specialSymbols: string[] = ['=', '+', '-', '*', '/', '%'];

// 代码块标志位
export const blocks = ['(', ')', ',', '{', '}', ...specialSymbols];

/**
 * Function
 * @description 替换变量
 * @param editor 编辑器配置
 * @param begin 开始位置
 * @param end 结束位置
 * @param val 值信息{label: '', value: '', type: ''}
 * @return void 0
 */
const replaceVariable: ReplaceVariable = (
  editor,
  begin,
  end,
  val,
) => {
  const doc = editor.getDoc();
  const el = document.createElement('span');
  el.innerText = `{${val.label}}`;
  el.className = 'formula-tag';
  doc.markText(begin, end, {
    replacedWith: el,
  });
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
export const initLineTag: InitLineTag = (
  editor,
  content,
  line,
  innerVariables,
) => {
  (innerVariables || []).forEach((variable) => {
    const variableMark = `{${escapeRegExp(variable.label)}}`;
    const regex = new RegExp(variableMark, 'g');
    while (regex.exec(content) !== null) {
      const escapedTimes = getEscapedTimes(variable);
      const begin = { line, ch: regex.lastIndex - variableMark.length + escapedTimes };
      const end = { line, ch: regex.lastIndex };
      // const value = editor.getValue();
      // console.log('value:', value);
      // console.log('variableMark:', variableMark, variableMark.length);
      // console.log('regex.lastIndex:', regex.lastIndex);
      // console.log('begin:', begin);
      // console.log('end:', end);
      // console.log('variable:', variable);
      replaceVariable(editor, begin, end, variable);
    }
  });
};

/**
 * Function
 * @description 初始化文本标签
 * @param editor 编辑器配置
 * @param code 值
 * @return void 0
 */
export const initDocTag: InitDocTag = (
  editor,
  code,
  innerVariables = [],
) => {
  const contents = code.split('\n');
  contents.forEach((content, index) => initLineTag(editor, content, index, innerVariables));
};

/**
 * Function
 * @description 代替eval函数
 * @param expression js 表达式
 * @return function
 */
export const evil = (expression: string) => {
  let _expression;
  try {
    _expression = Function(`"use strict";return (${expression})`)();
  } catch ({ message }) {
    // TODO: 拦截message 查看错误变量，替换字符串，暂时在`parseKeyReplaceField`解决
    _expression = Function(`"use strict";return (${JSON.stringify(expression)})`)();
  }

  return _expression;
};

/**
 * Function
 * @description 公式括号是否对称
 * @param input 输入值
 * @return boolean
 */
export const isBracketError = (input: string): boolean => {
  const bracket = [];
  for (let i = 0, j = ''; i < input.length; i += 1) {
    j = input.charAt(i);
    if (j === '(') {
      bracket.push('(');
    } else if (j === ')') {
      if (bracket.length) {
        bracket.pop();
      } else {
        return false;
      }
    }
  }

  return !!bracket.length;
};

/**
 * Function
 * @description 获取公式计算异常 抛出错误提示
 * @param {String} input 输入值
 * @return {Array<Number, String>}
 */
export const getFormulaError = (input: string) => {
  if (isBracketError(input)) {
    return [ErrorType.Error, '( ) 不对称'];
  }
  if (/^[\x\\÷\\+\-\\*\\/]/.test(input)) {
    return [ErrorType.Error, '开头错误'];
  }
  if (/[\x\\÷\\+\-\\*\\/]$/.test(input)) {
    return [ErrorType.Error, '结尾错误'];
  }
  if (/[\x\\÷\\+\-\\*\\/]{2,}/.test(input)) {
    return [ErrorType.Error, '连续运算'];
  }
  if (/\([\x\\÷\\+\-\\*\\/]/.test(input)) {
    return [ErrorType.Error, '( 后非法运算'];
  }
  if (/[\x\\÷\\+\-\\*\\/]\)/.test(input)) {
    return [ErrorType.Error, ') 后非法运算'];
  }
  if (/[@#\\$%\\^&\\]+/g.test(input)) {
    return [ErrorType.Unknown, input];
  }
  return [ErrorType.Pass, ''];
};

/**
 * Function
 * @description 模糊查询 字段
 * 因性能问题，不使用效率更高的filter, 使用for循环
 * @param fields 字段组
 * @param inputValue 输入值
 * @return array
 */
export const fuzzySearchField: FuzzySearchField = (
  fields,
  inputValue,
) => {
  const _fields = [];
  if (fields && fields.length) {
    for (let i = 0; i < fields.length; i += 1) {
      if (fields[i].label.indexOf(inputValue) !== -1) {
        _fields.push(fields[i]);
      }
    }
  }
  return _fields;
};

/**
 * Function
 * @description 模糊查询 函数
 * 因性能问题，不使用效率更高的filter, 使用for循环
 * @param functionArray 函数组
 * @param inputValue 输入值
 * @return array
 */
export const fuzzySearchFunctions: FuzzySearchFunctions = (
  functionArray,
  inputValue,
) => {
  const _functions = [];
  for (let i = 0; i < functionArray.length; i += 1) {
    const { functions } = functionArray[i];
    for (let k = 0; k < functions.length; k += 1) {
      // 函数需改为大写 匹配字段
      if (functions[k].name.indexOf(inputValue.toUpperCase()) !== -1) {
        const { name } = functionArray[i];
        // 优先判断是否存在
        const alreadyName = _functions.findIndex((item: { name: string; }) => {
          if ('name' in item) {
            return item.name === name;
          }
          return false;
        });

        if (alreadyName !== -1) {
          _functions[alreadyName].functions.push(functions[k]);
        } else {
          _functions.push({
            name,
            functions: [functions[k]],
          });
        }
      }
    }
  }
  return _functions;
};

/**
 * Function
 * @description 使用公式计算
 * @param value 单元格公式值
 * @param dataSourceItem 单元格数据
 * @return string
 */
export const useFormula: UseFormula = (
  value,
  dataSourceItem,
) => {
  try {
    // 字段数据
    const fieldsData = parseFieldData(value, dataSourceItem);
    // 存在用户手动输入的可能
    if (fieldsData === null) return parseFormula(evil(value)) as string;
    // 匹配不到 抛出
    if (!fieldsData?.length) return undefined;

    // 替换 {} 内的值
    const fieldReg = value.match(braceReg);
    // 不存在可替换字段 可能存在用户手输的情况
    if (!fieldReg) return undefined;

    // 替换成有效字段
    const validFiled = parseKeyReplaceField(fieldReg, value, fieldsData);
    return parseFormula(evil(validFiled)) as string;
  } catch ({ message }) {
    throw message;
  }
};

/**
 * Function
 * @description 是否是有效字段
 * @param input 输入值
 * @param fields 字段组
 * @return boolean
 */
export const isValidField: IsValidField = (
  input,
  fields,
) => {
  const matchValue = input.match(braceReg);
  if (matchValue) {
    /**
     * 匹配到数据
     * 存在有效字段+1,与最终长度比对
     */
    let validFiledNums = 0;
    for (let j = 0; j < matchValue.length; j += 1) {
      if (fields.includes(matchValue[j])) {
        validFiledNums += 1;
      }
    }
    return validFiledNums === matchValue.length;
  }
  return false;
};

/**
 * Function
 * @description 反转字段 {title} => 标题
 * @param input 输入值
 * @param fields 字段组
 * @return string
 */
export const reverseField: ReverseField = (
  input,
  fields,
) => {
  const content = parseKey(input);

  if (!content || !content.length) return input;

  /**
   * 因考虑改用中文匹配
   * 在这里多做一层转换
   * 标题 => title
   */
  const _content = [];
  for (let i = 0; i < content.length; i += 1) {
    for (let j = 0; j < fields.length; j += 1) {
      const { label, value } = fields[j];
      if (content[i] === label) {
        _content.push(value);
      }
    }
  }

  if (!_content.length) return input;

  let output = input;
  // 拿{title}匹配字段，替换内容
  for (let i = 0; i < fields.length; i += 1) {
    for (let j = 0; j < _content.length; j += 1) {
      if (fields[i].value === _content[j]) {
        output = output.replace(fields[i].label, _content[j]);
      }
    }
  }

  return output;
};

/**
 * Function
 * @description 获取编辑器Pos值
 * @param value 当前值
 * @param index 当前索引
 * @param ch 编辑器字段位置
 * @param line 编辑器字段位置(第几行)
 * @param name 变量字段名称(显示用)
 * @param pos 编辑器默认位置
 * @return {}
 */
export const getEditorPos: GetEditorPos = ({
  value,
  index,
  ch,
  name,
  pos,
  line,
  isRightFieldEnd,
}) => {
  // 优先判断是否存在内部值(用户模糊查询手动输入部分)
  const innerValue = value.slice(index + 1, value.length);

  // 存在右侧字段结尾，需要默认在返回字段位置+1
  const _pos = isRightFieldEnd ? { ...pos, ch: pos.ch + 1 } : pos;

  // 替换范围
  const range = [{ ch: index + 1, line }, _pos];

  if (innerValue) {
    // 判断是否存在右侧括号
    const isRightIndex = innerValue.trim().endsWith(')');
    const _innerValue = isRightIndex ? innerValue.replaceAll(')', '') : innerValue;
    return {
        range,
        ch: ch - _innerValue.length + name.length + 2,
      };
  }

  return {
    range,
    ch: name.length + 2 + ch,
  };
};

/**
 * Function
 * @description 判断是否是合法函数
 * @param inputFunction 输入的函数字段
 * @return string
 */
export const isValidFunction: IsValidFunction = (
  inputFunction,
) => {
  // `AND()`截取括号
  const key = inputFunction.slice(0, inputFunction.length - 2);
  if (!ConstantsMap.has(key)) return '';

  /**
   * 获取当前函数的映射
   * 提示用户参数是否必填
   */
  const value = ConstantsMap.get(key);
  if (value === 0) return '';
  if (value < 0) return `${key} 函数至少需要 ${Math.abs(value)} 个参数`;
  if (value > 0) return `${key} 函数需要 ${value} 个参数`;

  return '';
};

/**
 * Function
 * @description 获取最近的索引
 * @param inputValue 输入值
 * @param extraSymbols 额外特殊符号组
 * @return Number
 */
export const getNearestIndex: GetNearestIndex = (
  inputValue,
  extraSymbols,
) => (
  Array.isArray(extraSymbols) ? [
    ...specialSymbols,
    ...extraSymbols,
  ].map((_) => inputValue.lastIndexOf(_)).sort((a, b) => b - a)[0]
    : [',', ' ', '(', ...specialSymbols]
      .map((_) => inputValue.lastIndexOf(_))
      .sort((a, b) => b - a)[0]);

/**
 * Function 获取字段块
 * @param inputValue 输入值
 * @param endIndex 结束索引
 * @return string 截取位置
 */
export const getFieldBlock: GetFieldBlock = (
  inputValue,
  endIndex,
) => {
  // 获取起始位置，不包含{}
  const startIndex = inputValue.lastIndexOf('{') + 1;
  const value = inputValue.slice(startIndex, endIndex);
  return value;
};

/**
 * Function
 * @description 获取代码块
 * @param inputValue 输入值
 * @param sign 标志位
 * @return string
 */
export const getCodeBlock: GetCodeBlock = (
  inputValue,
  sign,
) => {
  const index = blocks.map((_) => inputValue.lastIndexOf(_)).sort((a, b) => b - a)[0];

  if (sign === '}') return getFieldBlock(inputValue, index);

  const endIndex = inputValue.lastIndexOf(sign);
  const block = inputValue.slice(index + 1, endIndex + 1).trim();
  return block;
};
