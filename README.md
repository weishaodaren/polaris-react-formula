## 极星公式库 polaris-react-formula

> Formula compiler core.

See our website https://app.startable.cn/

### 📕 Install

Using npm:

```js
npm install --save polaris-react-formula
```

or using yarn:

```js
yarn add polaris-react-formula
```

or useing pnpm:

```js
pnpm install polaris-react-formula
```

### 📘 Type
|Property|Type|Description|Default Value|
|----|----|---|----|
|visible|`boolean`|控制Modal显示隐藏|`false`|
|value|`string`|公式值|`''`|
|className|`string`|类名|`''`|
|style|`React.CSSProperties`|类名|`''`|
|field|`IColumn`|字段 列||
|onClose|`(() => void)`|关闭Modal||
|onChange|`(formula: string, formulaField: string ) => void)`|获取计算值 回调|`undefined`|
|onLink|`(() => void)`|跳转外链|`undefined`|

### 📖 Usage
```js
import React, { useCallback, useState } from 'react';
import FormulaEditor, { useFormula } from 'polaris-react-formula';

function App() {
  const [visible, setVisible] = useState(true);
  const value = '';

  const onCalc = useCallback((formula: string, formulaField: string) => {
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

```

