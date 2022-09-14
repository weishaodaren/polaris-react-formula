import type { IColumn } from '../config/mock.column';
/**
 * Function
 * @description 解析字段
 */
// eslint-disable-next-line import/prefer-default-export
export const parseField = (fields: IColumn) =>
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
