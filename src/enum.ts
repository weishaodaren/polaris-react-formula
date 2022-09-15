/**
 * 字段枚举
 */
export enum Fields {
  /**
   * 附件
   */
  Annex = 'document',

  /**
   * 数字框
   */
  InputNumber = 'inputnumber',

  /**
   * 单行文本
   */
  Input = 'input',

  /**
   * 多行文本
   */
  Textarea = 'textarea',

  /**
   * 单选
   */
  Select = 'select',

  /**
   * 级联
   */
  Cascader = 'cascader',

  /**
   * 分组单选
   */
  GroupSelect = 'groupSelect',

  /**
   * 单选
   */
  Radio = 'radio',

  /**
   * 多选
   */
  Checkbox = 'multiselect',

  /**
   * 日期
   */
  Date = 'datepicker',

  /**
   * 货币
   */
  Amount = 'amount',

  /**
   * 手机
   */
  Mobile = 'mobile',

  /**
   * 邮箱
   */
  Email = 'email',

  /**
   * 公式
   */
  Formula = 'formula',

  /**
   * 成员
   */
  Member = 'member',

  /**
   * 部门
   */
  Dept = 'dept',

  /**
   * 开关
   */
  Switch = 'switch',

  /**
   * 状态
   */
  Status = 'status',

  /**
   * 链接
   */
  Link = 'link',

  /**
   * 子表单
   */
  Subform = 'subform',

  /**
   * 操作
   */
  Operate = 'operate',

  /**
   * 自增列
   */
  Autonum = 'autonum',

  /**
   * 超级关联表
   */
  RelateTablePro = 'relateTablePro',

  /**
   * 引用别的表，也称之为关联
   */
  RelateTable = 'relateTable',

  /**
   * 引用字段，引用的是当前表中的关联字段中的某一个值
   */
  QuoteTable = 'quoteTable',

  /**
   * 图片
   */
  Image = 'image',

  /**
   * 省市区
   */
  Region = 'region',

  /**
   * 富文本
   */
  Richtext = 'richtext',

  /**
   * 回收站
   */
  Recycle = 'recycleFlag',

  /**
   * 部门下拉树
   */
  TreeSelect = 'treeSelect',

  /**
   * 地区ip 识别为具体地区
   */
  IP = 'ip',

  /**
   * 日志表格
   */
  LogTable = 'logTable',

  /**
   * 数字区间
   */
  RangeNumber = 'rangeNumber',

  /**
   * 身份证
   */
  IdentityCard = 'identityCard',

  /**
   * 自定义字段
   */
  CustomField = 'customField',

  /**
   * previewTable
   */
  PreviewTable = 'previewTable',

  /**
   * 工时
   */
  WorkingHours = 'workHour',

  /**
   * 前后置
   */
  BaRelating = 'baRelating',

  /**
   * 关联
   */
  Relating = 'relating',

  /**
   * 所属项目
   */
  ProjectId = 'projectId',

}

export type IFields = typeof Fields;

/**
 * 字段名称
 */
export enum FieldName {
  /**
   * 编号
   */
  Code = 'code',
}

export type IFieldName = typeof FieldName;
