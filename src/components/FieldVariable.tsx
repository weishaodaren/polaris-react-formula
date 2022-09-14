import React, { useCallback } from 'react';
import type { FC } from 'react';
import '../styles/fieldVariable.less';

export interface IFieldVariableProps {
  label: string;
  value: string;
  type: string;
  pick?: (id: string) => void;
  _value?: unknown
}

const FieldVariable: FC<IFieldVariableProps> = ({
  label,
  type,
  value,
  pick,
}) => {
  const handlePick = useCallback(() => {
    if (type === 'array' || type === 'object') {
      return;
    }

    pick?.(value);
  }, []);
  return (
    <div
      className={'field-variable'}
      onClick={handlePick}
    >
      {label}
    </div>
  );
};

export default FieldVariable;
