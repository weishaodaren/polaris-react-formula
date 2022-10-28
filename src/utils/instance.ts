/* eslint-disable no-extra-parens */
import * as FormulaJS from '@formulajs/formulajs';
import DayJS from 'dayjs';

type RewriteType<T> = {
  -readonly [key in keyof T]: T[key];
};

type FormulaJSType = typeof FormulaJS;

interface FormulaTS extends RewriteType<FormulaJSType> {
}

const F = { ...FormulaJS };

/**
 * @description NOW()
 * 修改原有NOW()函数，返回格式化日期
 * 本身源码也只是return new Date()
 * @see https://github.com/sutoiku/formula.js/blob/master/lib/date-time.js#L303
 */
(F as FormulaTS).NOW = () => DayJS(new Date()).format('YYYY-MM-DD') as Date & string;

/**
 * @description TODAY()
 * 修改原有NOW()函数，返回格式化日期
 * @see https://github.com/formulajs/formulajs/blob/44cbacafa523f9f41a48b667708c35d2e0ec1102/src/date-time.js#L658
 */
(F as FormulaTS).TODAY = () => DayJS(FormulaJS.TODAY()).format('YYYY-MM-DD') as Date & string;

/**
 * Function
 * @description 将formulajsAPI注入全局
 * @return void
 */
export const injectWindowAPI = () => {
  Object.keys(F).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(window, key)) {
      // @ts-ignore
      window[key] = F[key];
    }
  });
 };

export default F;
