import { Fields } from '../enum';
import type { IColumn } from '../config/mock.column';

/**
 * Function
 * @description 过滤字段数据
 * @param fieldData 字段数据
 */
export const filterFieldData = (fieldData: any[]): any[] => {
  if (!Array.isArray(fieldData) || !fieldData.length) return [];
  for (let i = 0; i < fieldData.length; i += 1) {
    // 没有数据 默认给字符串
    if (!fieldData[i]) fieldData[i] = '';
    // 存在数组的情况(成员) 取名称
    if (Array.isArray(fieldData[i]) && fieldData[i].length) {
      const { name } = fieldData[i][0];
      fieldData[i] = name;
    }
  }
  return fieldData;
};

/**
 * TODO: 暂时不处理
 * Function
 * @description 过滤成员字段
 * @param fieldObject 单个数据
 */
export const filterMember: (fieldObject: any) => void = () => {};

/**
 * TODO: 暂时不处理
 * Function
 * @description 过滤字段
 * @param fields 原始数据
 * @return array
 */
export const filterFields = (fields: IColumn): IColumn => fields.map((field) => {
    const { field: { type } } = field;
    switch (type) {
      case Fields.Member: {
        filterMember(field);
        break;
      }
      default: {
        break;
      }
    }
  return field;
  });
