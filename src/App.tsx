import React, { useCallback, useState } from 'react';
import FormulaEditor from '.';
import { column } from './config';

function App() {
  const [visible, setVisible] = useState(true);

  const onCalc: (v: string) => void = useCallback((formula) => {
    console.log('这是最外层的值：', formula);
  }, []);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  // TODO: 调试数据
  // useEffect(() => {
  //   const value = 'SUM(1, 2, SUM(2, 5))';
  //   const A = useFormula(value, dataSource[0]);
  //   console.log(A);
  // }, []);

  return (
    <FormulaEditor
      visible={visible}
      value=''
      field={column}
      onChange={onCalc}
      onClose={onClose}
    />
  );
}

export default App;
