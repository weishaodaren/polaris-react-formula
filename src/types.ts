export interface Variable {
  label: string;
  value: string;
  type: string;
  _value?: unknown;
}

export interface FunctionItem {
  name: string;
  description: string;
}

export interface FunctionGroup {
  name: string;
  functions: FunctionItem[];
}
