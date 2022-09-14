import type { IColumn } from '../config/mock.column';
import type { Variable } from '../types';

/**
 * Function
 * @description 解析字段
 * @return array
 */
export const parseField: (F: IColumn) => Variable[] = (fields) =>
  fields.map(({
      name: value,
      label,
      field: { type },
    }) =>
      ({
        label,
        value,
        type,
  }));

/**
 * Function
 * @description 解析公式返回值
 */
export const parseFormula = (result: unknown) => {
  const type = typeof result;
  switch (type) {
    case 'number': {
      // 如果是无穷数 直接返回 0
      if (!Number.isFinite(result)) return 0;

      // 整数直接返回结果
      if (Number.isInteger(result)) return result;

      // 目前只保留小数点后四位
      // eslint-disable-next-line no-extra-parens
      return (result as number).toFixed(4);
    }
    default: {
      return result;
    }
  }
};
