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
