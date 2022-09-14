import React, { useCallback } from 'react';
import 'codemirror/lib/codemirror.css';

import FormulaEditor from '.';
import { injectWindowApi } from './utils/tool';
import { column } from './config/mock.column';

const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
    },
    name: {
      type: 'void',
      title: '姓名',
      properties: {
        firstName: {
          type: 'string',
          required: true,
          title: '姓',
        },
        lastName: {
          type: 'string',
          title: '名',
        },
      },
    },
    projects: {
      type: 'array',
      title: 'Projects',
      items: {
        type: 'object',
        properties: {
          column_1: {
            type: 'void',
            properties: {
              sortable: {
                type: 'void',
                'x-component': 'ArrayTable.SortHandle',
              },
            },
          },
          column_2: {
            type: 'void',
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          column_3: {
            type: 'void',
            properties: {
              price: {
                type: 'number',
                title: 'Price',
              },
            },
          },
          column_4: {
            type: 'void',
            properties: {
              count: {
                type: 'number',
                title: 'Count',
              },
            },
          },
          column_5: {
            type: 'void',
            properties: {
              total: {
                type: 'number',
                title: 'Total',
              },
            },
          },
          column_6: {
            type: 'void',
            properties: {
              item: {
                type: 'void',
                properties: {
                  remove: {
                    type: 'void',
                  },
                  moveDown: {
                    type: 'void',
                  },
                  moveUp: {
                    type: 'void',
                  },
                },
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: 'Add',
        },
      },
    },
    sum: {
      type: 'number',
      title: '合计',
    },
  },
};

injectWindowApi();

function App() {
  /**
   * Callback
   * @description 计算结果
   * @param value 值
   * @return void 0
   */
  const onCalc = useCallback((value?: string) => {
    // console.log('这是最外层的值：', value);
  }, []);

  return (
    <FormulaEditor
      title='公式demo'
      field={column}
      schema={schema}
      style={{
        border: '1px solid gray',
        wordBreak: 'break-word',
      }}
      onChange={onCalc}
    />
  );
}

export default App;
