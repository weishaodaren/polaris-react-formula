import React, { useCallback } from 'react';
import 'codemirror/lib/codemirror.css';

import FormulaEditor from '.';
import { injectWindowApi } from './utils/tool';
import { column, dataSource } from './config/mock.column';

injectWindowApi();

function App() {
  /**
   * Callback
   * @description 计算结果
   * @param value 值
   * @return void 0
   */
  const onCalc: (value: string) => void = useCallback(() => {
    // console.log('这是最外层的值：', value);
  }, []);

  return (
    <FormulaEditor
      field={column}
      dataSource={dataSource}
      style={{
        border: '1px solid gray',
        wordBreak: 'break-word',
      }}
      onChange={onCalc}
    />
  );
}

export default App;
