import { ErrorType } from '../enum';

/**
 * 常量映射
 */
export const ConstantsMap = new Map();

/**
 * 错误映射
 */
export const ErrorMap = new Map()
  .set(ErrorType.Pass, '')
  .set(ErrorType.Invalid, '无效的极星字段或函数名称：')
  .set(ErrorType.Error, '错误的公式：')
  .set(ErrorType.Unknown, '未知的运算符：');

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
