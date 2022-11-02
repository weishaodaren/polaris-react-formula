import React, { useCallback, useState } from 'react';
import FormulaEditor, { useFormula } from '.';
import { column, dataSource } from './config';

function App() {
  const [visible, setVisible] = useState(true);
  // const [value, setValue] = useState('');
  // const [value, setValue] = useState('IF({title} = "刘123建", {title}, {ownerId}) + SUM({title})');
  // const [value, setValue] = useState('IF({多选}="A"||{多选}="B"||{多选}="A, B","通过"，"不通过")');
  const [value, setValue] = useState('IF({任务标题} = "刘123建", {任务标题}, {负责人}) + SUM({任务标题})');

  const onCalc = useCallback((formulaField: string, formula: string) => {
    setValue(formulaField);
    console.log('%c Formula:', 'color: pink', formula);
    console.log('%c Field:', 'color: orange', formulaField);

    const res = useFormula(formula, dataSource[0]);
    console.log('%c Result:', 'color: yellow', res);
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
