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
 * @description 过来加减乘除符号
 * @param input 输入值
 */
export const filterMarks = (input: string) => input
  .replace(/[\\+\-\\*/]/g, '')
  .replace(/\(/g, '')
  .replace(/\)/g, '');
