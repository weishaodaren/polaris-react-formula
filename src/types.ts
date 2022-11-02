import type { Position, Editor as CodemirrorEditor } from 'codemirror';
import type { IColumn, IDataSource } from './config/mock.column';

export type RewriteType<T> = {
  -readonly [key in keyof T]: T[key];
};

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

export type ReplaceVariable = (
  editor: CodemirrorEditor,
  begin: Position,
  end: Position,
  val: Variable
) => void;

export type InitLineTag = (
  editor: CodemirrorEditor,
  content: string,
  line: number,
  innerVariables?: Variable[],
) => void;

export type InitDocTag = (
  editor: CodemirrorEditor,
  code: string,
  innerVariables?: Variable[],
) => void;

export type FuzzySearchField = (
  fields: Variable[],
  inputValue: string,
) => Variable[];

export type FuzzySearchFunctions = (
  functionArray: FunctionGroup[],
  inputValue: string
) => Array<{
  name: string;
  functions: FunctionItem[];
  }>;

export type UseFormula = (
  value: string,
  dataSourceItem: {},
) => string | string[] | undefined;

export type IsValidField = (
  input: string,
  fields: string[]
) => boolean;

export type ReverseField = (
  input: string,
  fields: Variable[]
) => string;

export type GetNearestIndex = (
  inputValue: string,
  extraSymbols?: string[],
) => number;

export type GetFieldBlock = (
  inputValue: string,
  endIndex: number,
) => string;

export type GetCodeBlock = (
  inputValue: string,
  sign: string,
) => string;

export type IsValidFunction = (
  inputFunction: string
) => string;

export type GetEditorPos = (
  P: GetEditorPosParams
) => GetEditorPosReturns;

export type FilterFieldColumn = (
  inputArray: {
    label: string,
    value: string,
    type: string,
  }[],
) => Variable[];

export type FilterFormulaField = (
  T: IColumn[number]
) => Variable;

export type ParseFullFieldData = (
  fields: Variable[],
  sourceData: IDataSource | any
) => any;

export type ParseFieldData = (
  key: string,
  sourceData: IDataSource | any
) => any[] | null;

export type ParseField = (
  c: IColumn
) => Variable[];

export type ParseKeyReplaceField = (
  fields: string[],
  originalField: string,
  replacedFields: string[],
) => string;
