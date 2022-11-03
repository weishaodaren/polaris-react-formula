import React, { useCallback, useState } from 'react';
import FormulaEditor, { useFormula } from '.';
import { column, dataSource } from './mock';

function App() {
  const [visible, setVisible] = useState(true);
  // const [value, setValue] = useState('{7*2}-{7*2}');
  const [value, setValue] = useState('IF({标题}!="",{负责人},{截止时间})');
  // const [value, setValue] = useState('{7*2}-{负责人}');
  // const [value, setValue] = useState('IF({title} = "刘123建", {title}, {ownerId}) + SUM({title})');
  // const [value, setValue] = useState('IF({任务标题} = "刘123建", {任务标题}, {负责人}) + SUM({任务标题})');
  // const [value, setValue] = useState('{title}+{ownerId}');

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
