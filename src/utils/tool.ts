/* eslint-disable @typescript-eslint/no-implied-eval */
import * as formulajs from '@formulajs/formulajs';
import type { Position, Editor as CodemirrorEditor } from 'codemirror';
import type { Variable, FunctionGroup } from '../types';
import { ErrorType } from '../enum';
import { parseFieldData, parseKeyReplaceField, parseFormula } from './parse';

// 匹配加减乘除
export const calcWayReg = /(?:[+]|[-]|[*]|[/]|[(]|[)]){1}$/g;
// 匹配小括号
export const braketReg = /\((.+?)\)/g;
// 匹配大括号
export const braceReg = /\{.*?\}/g;
// 匹配大括号内容
export const innerBraceReg = /(?<=\{)(.+?)(?=\})/g;
// 匹配空格 逗号
export const blockReg = /[\\ \\,\\，]/g;

/**
 * Function
 * @description 替换变量
 * @param editor 编辑器配置
 * @param begin 开始位置
 * @param end 结束位置
 * @param val 值信息{label: '', value: '', type: ''}
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
  el.innerText = val.label;
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
export const initLineTag = (
  editor: CodemirrorEditor,
  content: string,
  line: number,
  innerVariables: Variable[] = [],
) => {
  (innerVariables || []).forEach((variable) => {
    const variableMark = `{${variable.value}}`;
    const regex = new RegExp(variableMark, 'g');
    while (regex.exec(content) !== null) {
      const begin = { line, ch: regex.lastIndex - variableMark.length };
      const end = { line, ch: regex.lastIndex };
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
export const initDocTag = (
  editor: CodemirrorEditor,
  code: string,
  innerVariables: Variable[] = [],
) => {
  const contents = code.split('\n');
  contents.forEach((content, idx) => initLineTag(editor, content, idx, innerVariables));
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
    // if (typeof message === 'string') {
    //   const errorIndex = message.indexOf(' is not defined');
    //   const errorVariable = message.slice(0, errorIndex);
    //   console.log(errorVariable, 'expression');

    //   const expressionIndex = expression.indexOf(errorVariable);
    //   console.log(expressionIndex, 'expressionIndex');

    // _expression = Function(`"use strict";return (${expression})`)();
    _expression = Function(`"use strict";return (${JSON.stringify(expression)})`)();
  }

  return _expression;
};

/**
 * Function
 * @description 将formulajsAPI注入全局
 * @return void
 */
export const injectWindowApi = () => {
  Object.keys(formulajs).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(window, key)) {
      // @ts-ignore
      window[key] = formulajs[key];
    }
  });
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
 * @param input 输入值
 * @return [number, string]
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
export const fuzzySearchField = (fields: Variable[], inputValue: string) => {
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
export const fuzzySearchFunctions = (functionArray: FunctionGroup[], inputValue: string) => {
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
export const useFormula = (
  value: string,
  dataSourceItem: {},
): string | string[] | undefined => {
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
export const isValidField = (input: string, fields: string[]): boolean => {
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
export const reverseField = (input: string, fields: Variable[]) => {
  const content = input.match(innerBraceReg);
  if (!content) return input;

  let _content = '';
  // 拿{title}匹配字段，替换内容
  for (let i = 0; i < fields.length; i += 1) {
    for (let j = 0; j < content?.length; j += 1) {
      if (fields[i].value === content[j]) {
        _content = input.replace(`{${content[j]}}`, fields[i].label);
      }
    }
  }
  return _content;
};
