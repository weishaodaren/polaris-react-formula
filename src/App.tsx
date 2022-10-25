import React, { useCallback, useState } from 'react';
import FormulaEditor, { useFormula } from '.';
import { column, dataSource } from './config';

function App() {
  const [visible, setVisible] = useState(true);
  // const value = 'IF({title} = "刘123建", {title}, {ownerId})';
  const value = '';

  const onCalc = useCallback((formula: string, formulaField: string) => {
    console.log('formula:', formula);
    console.log('field:', formulaField);

    const res = useFormula(formula, dataSource[0]);
    console.log('result:', res);
  }, []);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <button onClick={() => setVisible(true)}>Click Me</button>
      <FormulaEditor
        visible={visible}
        value={value}
        field={column}
        onChange={onCalc}
        onClose={onClose}
        />
      </>
  );
}

export default App;
