import type { Position, Editor as CodemirrorEditor } from 'codemirror';

export type RewriteType<T> = {
  -readonly [key in keyof T]: T[key];
};

export interface IFieldProps {
  attrDisabled?: boolean;
  checked?: boolean;
  aliasDisabled?: boolean;
  required?: boolean;
  isSearch?: boolean;
  fieldSearch?: {
    type: string;
    sort: number;
  },
  titleDisabled?: boolean;
  multiple?: boolean;
  pushMsg?: boolean;
  disabled?: boolean;
  typeDisabled?: boolean;
  hide?: boolean;
  [x: string]: any
}

export interface IField {
  type: string;
  customType: string;
  dataType: string;
  props: IFieldProps | null;
  refSetting: any,
}

export interface IColumn {
  name: string;
  label: string;
  aliasTitle: string;
  description: string;
  isSys: boolean;
  isOrg: boolean;
  writable: boolean;
  editable: boolean;
  unique: boolean;
  uniquePreHandler: string;
  sensitiveStrategy: string;
  sensitiveFlag: number;
  field: IField;
}

export interface IMember {
  id: string;
  name: string;
  avatar: string;
  type: string;
  status: number;
  isDelete: number;
}

export interface IDataSource {
  updateTime: string;
  id: number | string;
  code: string;
  issueStatusType: number;
  orgId: number | string;
  [x: string]: any
  auditStatusDetail: {},
  issueId: number | string,
  parentId: number | string,
  appIds: string[];
  createTime: string;
  creator: IMember;
  status: number;
  followerIds: IMember[];
  title: string;
  issueStatus: number | string;
  endTime: string;
  ownerChangeTime: string;
  order: number | string;
  planStartTime: string;
  updator: IMember;
  delFlag: number;
  ownerId: IMember[];
  startTime: string;
  planEndTime: string;
  dataId: string;
  tableId: string;
  auditStatus: number;
  path: string;
  recycleFlag: number;
  projectId: number | string;
}

export interface Variable {
  label: string;
  value: string;
  type: string;
  _value?: unknown;
}

export interface FunctionItem {
  type: string;
  name: string;
  description: string;
  useage?: string
  example?: string | undefined
}

export interface FunctionGroup {
  name: string;
  functions: FunctionItem[];
}

export interface GetEditorPosParams {
  value: string;
  index: number;
  ch: number;
  line: number;
  name: string;
  pos: Position
  isRightFieldEnd: boolean
}

export interface GetEditorPosReturns {
  range: Position[];
  ch: number
}

export type ReplaceVariable = (A: CodemirrorEditor, B: Position, C: Position, D: Variable) => void;

export type InitLineTag = (A: CodemirrorEditor, B: string, C: number, D?: Variable[]) => void;

export type InitDocTag = (A: CodemirrorEditor, B: string, C?: Variable[]) => void;

export type FuzzySearchField = (V: Variable[], S: string) => Variable[];

export type FuzzySearchFunctions = (F: FunctionGroup[], S: string) => Array<{
  name: string;
  functions: FunctionItem[];
}>;

export type UseFormula = (S: string, D: {}) => string | string[] | undefined;

export type IsValidField = (S: string, F: string[]) => boolean;

export type ReverseField = (S: string, T: Variable[]) => string;

export type GetNearestIndex = (S: string, T?: string[]) => number;

export type GetFieldBlock = (S: string, N: number) => string;

export type GetCodeBlock = (S: string, T: string) => string;

export type IsValidFunction = (S: string) => string;

export type GetEditorPos = (P: GetEditorPosParams) => GetEditorPosReturns;

export type FilterFieldColumn = (T: Variable[]) => Variable[];

export type FilterFormulaField = (T: IColumn) => Variable;

export type GetEscapedTimes = (T: Variable) => number;

export type ParseFullFieldData = (F: Variable[], S: IDataSource | any) => any;

export type ParseFieldData = (K: string, S: IDataSource | any) => any[] | null;

export type ParseField = (T: IColumn[]) => Variable[];

export type ParseKeyReplaceField = (F: string[], O: string, R: string[]) => string;
