import { Fields, FieldName } from '../enum';
import type { IFields, IFieldName } from '../enum';
import type { FilterFieldColumn, FilterFormulaField } from '../types';

/**
 * Function
 * @description 过滤字段数据
 * @param fieldData 字段数据
 * @return []
 */
export const filterFieldData = (fieldData: any[]): any[] => {
  if (!Array.isArray(fieldData) || !fieldData.length) return [];
  for (let i = 0; i < fieldData.length; i += 1) {
    // 没有数据 默认给undefined
    if (!fieldData[i]) fieldData[i] = undefined;
    // 存在数组的情况(成员) 取名称
    if (Array.isArray(fieldData[i]) && fieldData[i].length) {
      // 考虑存在多成员的情况
      const memberName = fieldData[i].map(({ name }: { [x: string]: string }) => name).filter(Boolean).join(',');
      fieldData[i] = memberName;
    }
  }
  return fieldData;
};

/**
 * Function
 * @description 过滤加减乘除符号
 * @param input 输入值
 * @return string
 */
export const filterMarks = (input: string) => input
  .replace(/[\\+\-\\*/]/g, '')
  .replace(/\(/g, '')
  .replace(/\)/g, '');

/**
 * Function
 * @description 过滤转义字符
 * @param input 输入值
 * @return string
 */
export const filterEscapedCharacters = (input: string) => input.replace(/[\\'\\"\\\\/\b\f\n\r\t]/g, '');

/**
 * Function
 * @description 过滤公式字段
 * @param fields 单个字段
 * @return Variable
 */
export const filterFormulaField: FilterFormulaField = (fields) => {
  const {
    name: value,
    label,
    aliasTitle,
    field: { type, props },
  } = fields;

  const params = {
    label: aliasTitle || label, // 优先选择别名
    value,
    type,
  };

  /**
   * 公式计算结果只存在前端计算
   * 暂时先获取公式表达式
   * 计算后拼接
   */
  if (Fields.Formula === type) {
    const { expression = '' } = props![Fields.Formula] || {};

    return {
      ...params,
      expression,
    };
  }

  return params;
};

/**
 * Function
 * @description 过滤字段列
 * @param inputArray 输入字段组
 * @return array
 */
export const filterFieldColumn: FilterFieldColumn = (
  inputArray,
) => (
  Array.isArray(inputArray) && inputArray.length
    /**
     * 暂不考虑 以下
     * 类型： 附件 前后置 工时 多选 单选 编号 下拉选 富文本 分组单选 开关 引用 公式
     * 名称： 编号 父任务id 所属项目
     */
    ? inputArray.filter(({ type, value }) => ![
      Fields.Annex,
      Fields.BaRelating,
      Fields.WorkingHours,
      Fields.Checkbox,
      Fields.GroupSelect,
      Fields.Select,
      Fields.Richtext,
      Fields.Radio,
      Fields.Cascader,
      Fields.Switch,
      Fields.ConditionRef,
      Fields.Formula,
    ].includes(type as IFields['Annex'])
      && ![
        FieldName.Code,
        FieldName.ParentId,
        FieldName.ProjectId,
      ].includes(value as IFieldName['Code']))
    : []);
