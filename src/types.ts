import type { Position } from 'codemirror';

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
}

export interface GetEditorPosReturns {
  range: Position[];
  ch: number
}
