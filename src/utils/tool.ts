/* eslint-disable @typescript-eslint/no-implied-eval */
import * as formulajs from '@formulajs/formulajs';
import type { Position, Editor as CodemirrorEditor } from 'codemirror';
import type { Variable, FunctionGroup } from '../types';
import { ErrorType } from '../enum';

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
 * @description 获取公式计算异常 抛出错误提示
 * @param input 输入值
 * @return [number, string]
 */
export const getFormulaError = (input: string) => {
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
