import { ErrorType } from '../enum';

/**
 * 常量映射(函数必填参数)
 * n > 0 需要 n 个参数
 * n < 0 至少需要 n 个参数
 * n = 0 无需参数
 */
export const ConstantsMap = new Map()
  .set('IF', 3)
  .set('AND', -1)
  .set('OR', -1)
  .set('NOT', -1)
  .set('SWITCH', -2)
  .set('CONCATENATE', -1)
  .set('LEFT', -1)
  .set('RIGHT', -1)
  .set('MID', -3)
  .set('REPLACE', -4)
  .set('TRIM', -1)
  .set('LEN', -1)
  .set('LOWER', -1)
  .set('UPPER', -1)
  .set('FIND', -2)
  .set('NUMBERVALUE', -1)
  .set('REPT', -2)
  .set('SEARCH', -2)
  .set('SUBSTITUTE', -3)
  .set('ABS', -1)
  .set('AVERAGE', -1)
  .set('CEILING', -1)
  .set('COUNT', -1)
  .set('COUNTA', -1)
  .set('EXP', -1)
  .set('FLOOR', -1)
  .set('MAX', -1)
  .set('MIN', -1)
  .set('INT', -1)
  .set('MOD', -2)
  .set('SUM', -1)
  .set('ROUND', -1)
  .set('ROUNDUP', -1)
  .set('ROUNDDOWN', -1)
  .set('POWER', -2)
  .set('LOG', -1)
  .set('SQRT', -1)
  .set('DAY', -1)
  .set('DAYS', -1)
  .set('YEAR', -1)
  .set('MONTH', -1)
  .set('HOUR', -1)
  .set('MINUTE', -1)
  .set('SECOND', -1)
  .set('TODAY', 0)
  .set('NOW', 0)
  .set('WEEKDAY', -1)
  .set('WEEKNUM', -1);

/**
 * 错误映射
 */
export const ErrorMap = new Map()
  .set(ErrorType.Pass, '')
  .set(ErrorType.Invalid, '无效的极星字段或函数名称：')
  .set(ErrorType.Error, '错误的公式：')
  .set(ErrorType.Unknown, '未知的运算符：');

/**
 * Icon 映射 参照极星表格
 */
export const CustomFieldIcon = {
  input: 'iconsingle_line_text', // 文本
  textarea: 'iconlong_text', // 多行文本
  select: 'iconsingle_choice', // 单选
  groupSelect: 'iconsingle_choice', // 分组单选
  cascader: 'iconsingle_choice', // 级联
  radio: 'iconsingle_choice', // 单选
  multiselect: 'iconmultiple_choice', // 多选
  datepicker: 'icondate', // 日期
  amount: 'iconcurrency', // 货币
  inputnumber: 'iconnumber', // 数字框
  document: 'iconenclosure1', // 附件
  mobile: 'iconphone_number', // 手机
  email: 'icone_mail', // 邮箱
  formula: 'iconformula', // 公式
  member: 'iconmembers_permissions', // 成员
  dept: 'icondepartment1', // 部门
  status: 'iconswitch', // 状态
  link: 'iconlink2', // 链接
  subform: 'iconsubform', // 子表单
  operate: 'iconoperation', // 操作
  autonum: 'iconincrease', // 自增列
  relateTablePro: 'iconsenior_associated', // 高级关联表
  relateTable: 'iconassociation_table', // 关联表
  quoteTable: 'iconreference1', // 引用表
  image: 'iconpicture1', // 图片
  region: 'iconprovinces', // 省市区
  richtext: 'iconrich_text', // 富文本
  recycleFlag: 'iconsingle_choice', // 回收站
  treeSelect: 'icondepartment1', // 部门下拉树
  ip: 'iconsingle_line_text', // 地区ip 识别为具体地区
  logTable: 'iconsubform', // 日志表格
  previewTable: 'iconsubform', // 预览表格
  rangeNumber: 'iconnumber', // 数字区间
  identityCard: 'iconnumber', // 身份证
  baRelating: 'iconqhz', // 前后置
  workHour: 'icondetails_hours', // 前后置
  relating: 'iconrelation', // 前后置
};

export type CustomFieldIconType = typeof CustomFieldIcon;
