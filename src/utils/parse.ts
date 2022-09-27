import { Fields, FieldName } from '../enum';
import { filterFieldData } from './filter';

import type { IColumn, IDataSource } from '../config/mock.column';
import type { Variable } from '../types';
import type { IFields } from '../enum';

/**
 * Function
 * @description 解析字段key
 * @param rawKey 未解析前的字段 {code}
 * @return array | null
 */
export const parseKey = (rawKey: string) => rawKey.match(/(?<=\{)(.+?)(?=\})/g);

/**
 * Function
 * @description 解析标点符号
 * @param rawString 输入值
 * @return string
 */
export const parseMarks = (rawString: string) => rawString
  .replace(/，/g, ',')
  .replace(/【/g, '[')
  .replace(/】/g, ']')
  .replace(/（/g, '(')
  .replace(/）/g, ')')
  .replace(/：/g, ':');

/**
 * Function
 * @description 解析大于 小于(默认=被转换==)
 * @param rawString 输入值
 * @return string
 */
export const parseMarks2 = (rawString: string) => rawString
  .replace(/=/g, '==')
  .replace(/<==/g, '<=')
  .replace(/>==/g, '>=');

/**
 * Function
 * @description 匹配字段 替换数据
 * @param fields 字段组
 * @param originalField 原始字段
 * @param replacedFields 替换字段组
 * @return string
 */
export const parseKeyReplaceField = (
  fields: string[],
  originalField: string,
  replacedFields: string[],
) => {
  let _originalField = originalField;
  /**
   * 字符串对应字段
   * 替换变量字段
   */
  for (let i = 0; i < fields.length; i += 1) {
    _originalField = _originalField.replace(fields[i], JSON.stringify(replacedFields[i]));
  }

  return parseMarks2(_originalField);
};

/**
 * Function
 * @description 解析字段
 * @param rawFields 原始字段组(极星表格直传)
 * @return array
 */
export const parseField = (rawFields: IColumn): Variable[] => {
  // 格式化字段组
  const formatFields = rawFields
    .map(({
      name: value,
      label,
      field: { type },
    }) => ({
      label, value, type,
    }))
    // 附件 前后置 工时 多选 分组单选 编号 暂不考虑
    .filter(({ type, value }) => ![
      Fields.Annex,
      Fields.BaRelating,
      Fields.WorkingHours,
      Fields.Checkbox,
      Fields.GroupSelect,
    ].includes(type as IFields['Annex'])
      && value !== FieldName.Code);

  return formatFields;
};

/**
 * Function
 * @description 解析字段数据
 * @param key 字段
 * @param sourceData 源数据
 * @return array | null
 */
export const parseFieldData = (key: string, sourceData: IDataSource | any) => {
  const fieldKey = parseKey(key);

  // 不满足匹配条件直接抛出
  if (!fieldKey || !Array.isArray(fieldKey)) return null;

  const data: any[] = [];
  // 数组 sourceData
  if (Array.isArray(sourceData)) {
    for (let i = 0; i < sourceData.length; i += 1) {
      for (let j = 0; j < fieldKey.length; j += 1) {
        // 如果有当前字段，直接推入数组
        if (fieldKey[j] in sourceData[i]) {
          data.push(sourceData[i][fieldKey[j]]);
        } else {
          // 可能出现源数据无数据导致 没有当前字段的问题
          data.push(undefined);
        }
      }
    }
    return filterFieldData(data);
  }

  // 对象 sourceData
  Object.entries(sourceData).forEach(([_key, value]) => {
    for (let j = 0; j < fieldKey.length; j += 1) {
      if (fieldKey[j] === _key) {
        data.push(value);
      }
    }
  });

  return filterFieldData(data);
};

/**
 * Function
 * @description 解析全字段数据
 * @param fields 解析后的字段组
 * @param sourceData 源数据
 * @return object
 */
export const parseFullFieldData = (fields: Variable[], sourceData: IDataSource | any) => {
  // 字段组
  const fieldArray = fields
    .map(({ value }) => value)
    .filter(Boolean);

  // 字段对象，各个字段占位
  const fieldObject = {} as any;
  for (let j = 0; j < fieldArray.length; j += 1) {
    fieldObject[fieldArray[j]] = [];
  }

  // 所有字段变量统一插入字段key中
  for (let i = 0; i < sourceData.length; i += 1) {
    for (let k = 0; k < fields.length; k += 1) {
      const { value } = fields[k];
      fieldObject[value].push(sourceData[i][value]);
    }
  }

  return fieldObject;
};

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
