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
