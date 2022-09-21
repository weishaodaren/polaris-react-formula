import React, { useCallback, useState } from 'react';
import { OnChangeCallback } from './types';
import FormulaEditor from '.';
import { column, dataSource } from './config';

function App() {
  const [visible, setVisible] = useState(true);

  const onCalc: (v: OnChangeCallback) => void = useCallback(({ value, formula }) => {
    console.log('这是最外层的值：', value, formula);
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
      dataSource={dataSource}
      onChange={onCalc}
      onClose={onClose}
    />
  );
}

export default App;
