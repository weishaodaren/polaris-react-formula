import React, { useCallback, useState } from 'react';
import FormulaEditor, { useFormula } from '.';
import { column, dataSource } from './config';

function App() {
  const [visible, setVisible] = useState(true);
  const value = 'IF({title}= \'32142323\', \'A\', \'B\', SUM({title}, {ownerId}))';

  const onCalc = useCallback((formula: string, formulaField: string) => {
    console.log('formula：', formula);
    console.log('field:', formulaField);
  }, []);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

    const A = useFormula(value, dataSource[0]);
    console.log(A);

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
