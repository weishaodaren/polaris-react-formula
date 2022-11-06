/* eslint-disable no-irregular-whitespace */
import { Locale } from '../locale';

export default [
  {
    name: Locale[10],
    functions: [
      {
        name: 'IF',
        description: Locale[11],
        useage: 'IF(logical, value1, value2)',
        example: Locale[12],
        type: 'input',
      },
      {
        name: 'AND',
        description: Locale[13],
        useage: 'AND(logical1, [logical2, ...])',
        example: `AND(3>2, 4>3)
=> true`,
        type: 'multiselect',
      },
      {
        name: 'OR',
        description: Locale[14],
        useage: 'OR(logical1, [logical2, ...])',
        example: `OR(3>2, 2>3)
=>  true`,
        type: 'multiselect',
      },
      {
        name: 'NOT',
        description: Locale[15],
        useage: 'NOT(boolean)',
        example: Locale[16],
        type: 'multiselect',
      },
      {
        name: 'SWITCH',
        description: Locale[17],
        useage: 'SWITCH(expression, [pattern, result...], [default])',
        example: Locale[18],
        type: 'input',
      },
    ],
  },
  {
    name: '文字',
    functions: [
      {
        name: 'CONCATENATE',
        description: Locale[19],
        useage: 'CONCATENATE(text1, [text2, ...])',
        example: Locale[20],
        type: 'input',
      },
      {
        name: 'LEFT',
        description: Locale[21],
        useage: 'LEFT(string, howMany)',
        example: Locale[22],
        type: 'input',
      },
      {
        name: 'RIGHT',
        description: Locale[23],
        useage: 'RIGHT(string, howMany)',
        example: Locale[24],
        type: 'input',
      },
      {
        name: 'MID',
        description: Locale[25],
        useage: 'MID(string, whereToStart, count)',
        example: Locale[26],
        type: 'input',
      },
      {
        name: 'REPLACE',
        description: Locale[27],
        useage: 'REPLACE(string, whereToStart, count, replacement)',
        example: Locale[28],
        type: 'input',
      },
      {
        name: 'TRIM',
        description: Locale[29],
        useage: 'TRIM(string)',
        example: Locale[30],
        type: 'input',
      },
      {
        name: 'LEN',
        description: Locale[31],
        useage: 'LEN(string)',
        example: Locale[32],
        type: 'inputnumber',
      },
      {
        name: 'LOWER',
        description: Locale[33],
        useage: 'LOWER(string)',
        example: `LOWER("Hello!")
=> hello!`,
        type: 'input',
      },
      {
        name: 'UPPER',
        description: Locale[34],
        useage: 'UPPER(string)',
        example: `UPPER("Hello!")
=> HELLO!`,
        type: 'input',
      },
      // {
      //   // TODO: useless
      //   name: 'EXACT',
      //   description: '文字进行精确匹配',
      // },
      {
        name: 'FIND',
        description: Locale[35],
        useage: 'FIND(stringToFind, whereToSearch, [startFromPosition])',
        example: Locale[36],
        type: 'inputnumber',
      },
      {
        name: 'NUMBERVALUE',
        description: Locale[37],
        useage: 'NUMBERVALUE(text)',
        example: `VALUE("$10000")
=> 10000`,
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'PROPER',
      //   description: '修正英文字母的大小写',
      // },
      {
        name: 'REPT',
        description: Locale[38],
        useage: 'REPT(string, number)',
        example: `REPT("哈", 2)
=> 哈哈`,
        type: 'input',
      },
      {
        name: 'SEARCH',
        description: Locale[39],
        useage: 'SEARCH(stringToFind, whereToSearch, [startFromPosition])',
        example: Locale[40],
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'SPLIT',
      //   description: '返回一个从零开始、一维 数组 指定数量的子字符串',
      // },
      {
        name: 'SUBSTITUTE',
        description: Locale[41],
        useage: 'SUBSTITUTE(string, oldText, newText, [index])',
        example: Locale[42],
        type: 'input',
      },
    ],
  },
  {
    name: Locale[43],
    functions: [
      {
        name: 'ABS',
        description: Locale[44],
        useage: 'ABS(value)',
        example: Locale[45],
        type: 'inputnumber',
      },
      {
        name: 'AVERAGE',
        description: Locale[46],
        useage: 'AVERAGE(number1, [number2, ...])',
        example: Locale[47],
        type: 'inputnumber',
      },
      {
        name: 'CEILING',
        description: Locale[48],
        useage: 'CEILING(value, [significance])',
        example: `CEILING(1.99)
=> 2

CEILING(-1.99, 0.1)
=> -1.9`,
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'CEILINGMATH',
      //   description: '将数字向上舍入为最接近的整数或最接近的指定基数的倍数',
      // },
      {
        name: 'COUNT',
        description: Locale[49],
        useage: 'COUNT(number1, [number2, ...])',
        example: `COUNT(1, 3, 5, "", "七")
=> 3`,
        type: 'inputnumber',
      },
      {
        name: 'COUNTA',
        description: Locale[50],
        useage: 'COUNTA(textOrNumber1, [number2, ...])',
        example: `COUNTA(1, 3, 5, "", "七")
=> 4`,
        type: 'inputnumber',
      },
      {
        name: 'COUNTIF',
        description: Locale[51],
        useage: 'COUNTIF(values, keyword, operation)',
        example: Locale[52],
        type: 'inputnumber',
      },
      {
        name: 'EXP',
        description: Locale[53],
        useage: 'EXP(power)',
        example: `EXP(1)
=> 2.72

EXP(2)
=> 7.40`,
        type: 'inputnumber',
      },
      {
        name: 'FLOOR',
        description: Locale[54],
        useage: 'FLOOR(value, [significance])',
        example: `FLOOR(1.01, 0.1)
=> 1.0

FLOOR(-1.99, 0.1)
=> -2.0`,
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'FLOORMATH',
      //   description: '将数字向下舍入为最接近的整数或最接近的指定基数的倍数',
      // },
      {
        name: 'MAX',
        description: Locale[55],
        useage: 'MAX(number1, [number2, ...])',
        example: Locale[56],
        type: 'inputnumber',
      },
      {
        name: 'MIN',
        description: Locale[57],
        useage: 'MIN(number1, [number2, ...])',
        example: Locale[58],
        type: 'inputnumber',
      },
      {
        name: 'INT',
        description: Locale[59],
        useage: 'INT(value)',
        example: `INT(1.99)
=> 1

INT(-1.99)
=> -2`,
        type: 'inputnumber',
      },
      {
        name: 'MOD',
        description: Locale[60],
        useage: 'MOD(value, divisor)',
        example: `MOD(7, 2)
=> 1`,
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'PRODUCT',
      //   description: '返回所有参与字段中数值的乘积',
      // },
      {
        name: 'SUM',
        description: Locale[61],
        useage: 'SUM(number1, [number2, ...])',
        example: Locale[62],
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'SUMPRODUCT',
      //   description: '返回所有参与字段中数值的总和',
      // },
      // {
      //   // TODO: useless
      //   name: 'SUMIF',
      //   description: '统计表格中符合条件的数值，并求和',
      // },
      {
        name: 'ROUND',
        description: Locale[63],
        useage: 'ROUND(value, [precision])',
        example: `ROUND(1.99, 0)
=> 2

ROUND(18.8, -1)
=> 20`,
        type: 'inputnumber',
      },
      {
        name: 'ROUNDUP',
        description: Locale[64],
        useage: 'ROUNDUP(value, [precision])',
        example: `ROUNDUP(1.1, 0)
=> 2

ROUNDUP(-1.1, 0)
=> -2`,
        type: 'inputnumber',
      },
      {
        name: 'ROUNDDOWN',
        description: Locale[65],
        useage: 'ROUNDDOWN(value, [precision])',
        example: `ROUNDDOWN(1.9, 0)
=> 1

ROUNDDOWN(-1.9, 0)
=> -1`,
        type: 'inputnumber',
      },
      {
        name: 'POWER',
        description: Locale[66],
        useage: 'POWER(base, power)',
        example: `POWER(2, 5)
=> 32

POWER(-5, 3)
=> -125`,
        type: 'inputnumber',
      },
      // {
      //   // TODO
      //   name: 'LN',
      //   description: '计算指定数字的自然对数',
      // },
      {
        name: 'LOG',
        description: Locale[67],
        useage: 'LOG(number, base=10))',
        example: `LOG(1024, 2)
=> 10

LOG(10000)
=> 4`,
        type: 'inputnumber',
      },
      // {
      //   // TODO
      //   name: 'LOG10',
      //   description: '返回数字以 10 为底的对数',
      // },
      {
        name: 'SQRT',
        description: Locale[68],
        useage: 'SQRT(value)',
        example: `SQRT(10000)
=> 100`,
        type: 'inputnumber',
      },
    ],
  },
  {
    name: '时间',
    functions: [
      // {
      //   // TODO
      //   name: 'DATE',
      //   description:
      //     '将数字拼接成为年份，数字字段顺序为：年／月／日／时／分／秒',
      // },
      {
        name: 'DAY',
        description: Locale[69],
        useage: 'DAY(date)',
        example: Locale[70],
        type: 'inputnumber',
      },
      {
        name: 'DAYS',
        description: Locale[71],
        useage: 'DAYS(date1, date2)',
        example: `DAYS( "2020-08-11"  ,"2020-08-10")
=> 1

DAYS( "2020-08-9" ,"2020-08-10")
=> -1

DAYS( {截止时间} , TODAY())
=> 48`,
        type: 'inputnumber',
      },
      // {
      //   // TODO
      //   name: 'DAYS360',
      //   description: '按照一年 360 天的算法，返回两个日期间相差的天数',
      // },
      // {
      //   // TODO
      //   name: 'EDATE',
      //   description: '返回指定日期相隔指定月份的日期',
      // },
      // {
      //   // TODO
      //   name: 'EOMONTH',
      //   description: '返回指定日期相隔指定月份的最后一天',
      // },
      {
        name: 'YEAR',
        description: Locale[72],
        useage: 'YEAR(date)',
        example: `YEAR("2020/10/01")
=> 2020

YEAR({毕业时间})
=> 2020`,
        type: 'inputnumber',
      },
      {
        name: 'MONTH',
        description: Locale[73],
        useage: 'MONTH(date)',
        example: `MONTH("2020.10.01")
=> 10

MONTH({毕业时间})
=> 6`,
        type: 'inputnumber',
      },
      {
        name: 'HOUR',
        description: Locale[74],
        useage: 'HOUR(date)',
        example: `HOUR({打卡时间})
=> 9`,
        type: 'inputnumber',
      },
      {
        name: 'MINUTE',
        description: Locale[75],
        useage: 'MINUTE(date)',
        example: `MINUTE({打卡时间})
=>30`,
        type: 'inputnumber',
      },
      {
        name: 'NETWORKDAYS',
        description: Locale[76],
        useage: 'NETWORKDAYS(startDate, endDate, [holidays])',
        example: `NETWORKDAYS("2020-10-01", "2020-10-02")
=> 2

NETWORKDAYS("2020-10-02", "2020-10-01")
=> -2

NETWORKDAYS("2020-10-01", "2020-10-05")
=> 3

NETWORKDAYS({产品启动日期}, {产品上线日期} , "2020-06-25, 2020-06-26, 2020-06-27")
=> 100`,
        type: 'inputnumber',
      },
      {
        name: 'SECOND',
        description: Locale[77],
        useage: 'SECOND(date)',
        example: `SECOND({打卡时间})
=> 1`,
        type: 'inputnumber',
      },
      {
        name: 'TODAY',
        description: Locale[78],
        useage: 'TODAY()',
        example: `TODAY()
=> "2020/06/02 00:00"

DATETIME_DIFF( {截止时间} , TODAY(),"days")
=> 15`,
        type: 'datepicker',
      },
      {
        name: 'NOW',
        description: Locale[79],
        useage: 'NOW()',
        example: `NOW()
=> "2020/06/02 07:12"

DATETIME_DIFF( {截止时间} , NOW(),"days")
=> 15`,
        type: 'datepicker',
      },
      {
        name: 'WORKDAY',
        description: Locale[80],
        useage: 'WORKDAY(startDate, numDays, [holidays])',
        example: `WORKDAY("2020/10/01" , 1)
=> 2020/10/02

WORKDAY("2020/10/01" , 1，"2020-10-02")
=> 2020/10/05

WORKDAY({启动日期}, 100, "2020-10-01, 2020-10-02, 2020-10-03, 2020-10-04, 2020-10-05, 2020-10-06, 2020-10-07, 2020-10-08")
=> 2020-11-11`,
        type: 'datepicker',
      },
      {
        name: 'WEEKDAY',
        description: Locale[81],
        useage: 'WEEKDAY(date, [startDayOfWeek])',
        example: `WEEKDAY("2020.10.01")
=>4

WEEKDAY("2020.10.01", "Monday")
=>3

WEEKDAY(TODAY())`,
        type: 'inputnumber',
      },
      {
        name: 'WEEKNUM',
        description: Locale[82],
        useage: 'WEEKNUM(date, [startDayOfWeek])',
        example: `WEEKNUM("2020.10.01")
=>40

WEEKNUM("2020.10.01", "Sunday")
=>40

WEEKNUM(TODAY())
=>33`,
        type: 'inputnumber',
      },
    ],
  },
];

// 公式样例
export const Sample = {
  name: Locale[6],
  description: Locale[7],
  useage: Locale[8],
  example: Locale[9],
  type: 'input',
};
