import React, { useCallback } from 'react';
import { OnChangeCallback } from './types';
import FormulaEditor from '.';
import { column, dataSource } from './config';

function App() {
  /**
   * Callback
   * @description 计算结果
   * @param value 值
   * @return void 0
   */
  const onCalc: (v: OnChangeCallback) => void = useCallback(({ value, formula }) => {
    console.log('这是最外层的值：', value, formula);
  }, []);

  return (
    <FormulaEditor
      value=''
      field={column}
      dataSource={dataSource}
      onChange={onCalc}
    />
  );
}

export default App;
