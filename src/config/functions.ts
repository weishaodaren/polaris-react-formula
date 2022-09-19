/* eslint-disable no-irregular-whitespace */
export default [
  {
    name: '逻辑',
    functions: [
      {
        name: 'IF',
        description: `判断是否满足某个条件，如果满足则返回第一个值，如果不满足则返回第二个值。

【logical】是逻辑条件，表示计算结果为真（true）和假（false）的表达式。
【value1】是当逻辑条件为真时的返回值。
【value2】是当逻辑条件为假时的返回值。

IF支持嵌套使用，并且可以用于检查单元格是否为空白/为空。`,
        useage: 'IF(logical, value1, value2)',
        example: '',
        type: 'input',
      },
      {
        name: 'AND',
        description: `如果所有参数均为真（true），则返回真（true），否则返回假（false）。

【logical】是逻辑参数，可以是逻辑值、数组或引用的维格列`,
        useage: 'AND(logical1, [logical2, ...])',
        type: 'multiselect',
      },
      {
        name: 'OR',
        description: `如果任何一个参数为真（true），则返回真（true），否则返回假（false）。

【logical】是逻辑参数，可以是逻辑值、数组或引用的维格列。`,
        useage: 'OR(logical1, [logical2, ...])',
        type: 'multiselect',
      },
      {
        name: 'NOT',
        description: `反转其参数的逻辑值。

【boolean】是布尔参数，意味着你的输入值必须是逻辑判断且输出值只有真和假，比如比较两个值谁大谁小。
当你参数的逻辑判断为真（true）时函数返回假（false）；
当你参数的逻辑判断为假（false）时函数返回真（true）；description

如例子一：2>3输出值是假，但经过反转后函数输出值的是真。
如例子二：NOT({年纪} > 18)经过NOT函数反转后，其实相当于判断{年纪} ≤ 18`,
        useage: 'NOT(boolean)',
        type: 'multiselect',
      },
      {
        name: 'SWITCH',
        description: `本函数为多分支选择函数，它由表达式和多个分支+返回值组成，如果表达式等于某个分支值，则函数输出该分支对应的返回值。

【expression】是表达式，其运算的结果会与每个分支进行匹配。
【pattern】是分支，每个分支代表表达式的可能运算结果。每一个分支都有对应的返回值。
【result】是返回值，如果表达式的运算结果匹配了一个分支，则输出对应的返回值。
【default】是默认值，如果运算结果没有匹配任何一个分支，则函数输出默认值。默认值未填写时为空值。

比如例子一，{国家}是引用的一列数据，其输出值可能是成千上万个国家名称，它是该函数中的表达式。“中国”和“中文”分别为其中一条分支和返回值，它表示如果{国家}的输出值为“中国”时，则返回“中文”。而“通用英语”为默认值，它表示{国家}的输出值没有匹配任何分支时，则输出“通用英语”`,
        useage: 'SWITCH(expression, [pattern, result...], [default])',
        type: 'input',
      },
    ],
  },
  {
    name: '文字',
    functions: [
      {
        name: 'CONCATENATE',
        description: `将多个文本值串联成单个文本值。（其效果等同于 &）

【text1..】是要串联的多个值，可以输入文本、数字、日期参数或者引用列数据。

请用双引号将你要串联的文本值引起来，数字和引用列除外。
特例：如果要串联双引号，你需要使用反斜杠（\\）作为转义字符。`,
        useage: 'CONCATENATE(text1, [text2, ...])',
        type: 'input',
      },
      {
        name: 'LEFT',
        description: `从文本的开头提取多个字符。

【string】是要被提取字符的文本。
【howMany】是提取的字符数量。用数字表示，比如"3"，代表从左到右提取3个字符。`,
        useage: 'LEFT(string, howMany)',
        type: 'input',
      },
      {
        name: 'RIGHT',
        description: `从文本的末尾提取出多个字符。

【string】是要被提取字符的文本。
【howMany】是提取的字符数量。用数字表示，比如"5"，代表从右到左提取5个字符。`,
        useage: 'RIGHT(string, howMany)',
        type: 'input',
      },
      {
        name: 'MID',
        description: `从内容中特定位置提取一段固定长度的文本。

【string】是你输入的一段内容，其中包含了被提取的文本。该内容可以是输入的文本或者引用的维格列数据。
【whereToSearch】是你指定从哪儿提取文本，用数字表示。比如数字"3"表示从内容的第3个字符开始提取。
【count】是提取的文本长度，用数字表示。比如数字"2"表示从指定位置提取2个字符。`,
        useage: 'MID(string, whereToStart, count)',
        type: 'input',
      },
      {
        name: 'REPLACE',
        description: `将内容中特定位置的一段文本替换为新文本。

【string】是你输入的一段内容，其中包含了被替换的文本。该内容可以是输入的文本或者引用的维格列数据。
【start_character】是你指定从哪儿替换文本，用数字表示。比如数字"3"表示从内容的第3个字符开始替换。
【number_of_characters】是你指定要替换掉多少个字符，用数字表示。比如数字"2"表示替换掉指定位置的2个字符。
【replacement】是替换原文本的新文本。

（如果你想将内容中所有出现的原文本替换为新文本，请参见SUBSTITUTE。）`,
        useage: 'REPLACE(string, whereToStart, count, replacement)',
        type: 'input',
      },
      {
        name: 'TRIM',
        description: `清除文本开头和结尾的空格。

【value】是需要被处理的文本。`,
        useage: 'TRIM(string)',
        type: 'input',
      },
      {
        name: 'LEN',
        description: `统计一段文本的字符长度。

【string】是要计算长度的文本；标点符号、空格等也会占一个字符。`,
        useage: 'LEN(string)',
        type: 'inputnumber',
      },
      {
        name: 'LOWER',
        description: `将文本中所有大写字符全部转换为小写字符。

【string】是被转换的文本。`,
        useage: 'LOWER(string)',
        type: 'input',
      },
      {
        name: 'UPPER',
        description: `将文本中所有小写字符全部转换为大写字符。

【string】是被转换的文本。`,
        useage: 'UPPER(string)',
        type: 'input',
      },
      // {
      //   // TODO: useless
      //   name: 'EXACT',
      //   description: '文字进行精确匹配',
      // },
      {
        name: 'FIND',
        description: `查找特定的文本在内容中第一次出现的位置。

【stringToFind】是要查找到的特定文本。
【whereToSearch】指定从哪段内容内查找文本。可以输入文本参数或者引用维格列。
【startFromPosition】非必填，指定从内容的哪个位置开始查找（用数字表示第几个字符）。

本函数可以在一大段内容中快速查找特定文本出现的位置。
如果返回数字3，表示文本出现在该内容的第3个字符。
如果未找到匹配的文本，则结果将为0。

其效果与SEARCH()类似，但是未找到匹配项时，SEARCH()返回值为空而不是0。`,
        useage: 'FIND(stringToFind, whereToSearch, [startFromPosition])',
        type: 'inputnumber',
      },
      {
        name: 'NUMBERVALUE',
        description: `将文本字符串转换为数字。

【text】表示要转换的文本值。

本函数可以将文本内的数字提取出来。`,
        useage: 'NUMBERVALUE(text)',
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'PROPER',
      //   description: '修正英文字母的大小写',
      // },
      {
        name: 'REPT',
        description: `根据指定次数重复文本。

【string】是需要重复的文本。
【mumber】是指定的重复次数。用数字表示，比如”2“，表示重复2次。`,
        useage: 'REPT(string, number)',
        type: 'input',
      },
      {
        name: 'SEARCH',
        description: `搜索特定的文本在内容中第一次出现的位置。

【stringToFind】是要搜索到的特定文本。
【whereToSearch】指定从哪段内容搜索文本。可以输入文本参数或者引用维格列。
【startFromPosition】非必填，指定从内容的哪个位置开始搜索（用数字表示第几个字符）。

本函数可以在一大段内容中快速搜索特定文本出现的位置。
如果返回数字3，表示文本出现在该内容的第3个字符。
如果未找到匹配的文本，则结果将为空值。

其效果与FIND()类似，但是未找到匹配项时，FIND()返回值为0而不是空值。`,
        useage: 'SEARCH(stringToFind, whereToSearch, [startFromPosition])',
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'SPLIT',
      //   description: '返回一个从零开始、一维 数组 指定数量的子字符串',
      // },
      {
        name: 'SUBSTITUTE',
        description: `将内容中特定的文本全部替换为新文本。

【string】是你输入的一段内容，其中包含了被替换的文本。该内容可以是输入的文本或者引用的维格列数据。
【old_text】要被替换的原文本。
【new_text】替换原文本的新文本。
【index】非必填，是索引号，指定索引号后系统仅会替换特定位置的原文本。

本函数将文本中的原字符替换为新字符，在没有特别声明的情况下，新字符将替换所有出现的原字符。

（如果你想替换指定起点位置和终点位置之间的字符，请参见REPLACE。）`,
        useage: 'SUBSTITUTE(string, oldText, newText, [index])',
        type: 'input',
      },
    ],
  },
  {
    name: '数字',
    functions: [
      {
        name: 'ABS',
        description: `简介
取数值的绝对值。

参数说明
value：是要对其求绝对值的数值。
绝对值：正数的绝对值是本身，负数的绝对值是去掉负号。`,
        useage: 'ABS(value)',
        type: 'inputnumber',
      },
      {
        name: 'AVERAGE',
        description: `返回多个数值的算术平均数。

【number...】是进行运算的数值参数，可以输入数字或引用数值类型的列。数值类型的列包括数字、货币、百分比、评分等。

如果其中某个参数是文本值，比如"八"，在运算时会被当做0。`,
        useage: 'AVERAGE(number1, [number2, ...])',
        type: 'inputnumber',
      },
      {
        name: 'CEILING',
        description: `将数值向上舍入为最接近的指定基数的倍数。

【value】是要向上舍入的值。
【significance】非必填，是用于向上舍入的基数，返回值为基数的倍数。如果未提供，默认取1。
【向上舍入】即它返回值是大于或等于原数值,且为最接近的基数的倍数。`,
        useage: 'CEILING(value, [significance])',
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'CEILINGMATH',
      //   description: '将数字向上舍入为最接近的整数或最接近的指定基数的倍数',
      // },
      {
        name: 'COUNT',
        description: `统计「数字」类型值的数量。

【number】可以是输入的参数或引用的列。

本函数可以计算输入的参数或单元格内包含了多少个数值（数字、货币、百分比、评分都为数值）。`,
        useage: 'COUNT(number1, [number2, ...])',
        type: 'inputnumber',
      },
      {
        name: 'COUNTA',
        description: `统计非空值的数量。

【textOrNumber】可以是输入的参数或引用的列。

本函数可以计算输入的参数或单元格内包含了多少个非空值。
比如，可以统计一个单元格内有多少个选项，多少个图片。多少个成员等。
还可以统计神奇引用的单元格内的数组非空值。`,
        useage: 'COUNTA(textOrNumber1, [number2, ...])',
        type: 'inputnumber',
      },
      {
        name: 'EXP',
        description: `返回e的指定次方。

【e】是自然数，约为2.718282
【power】是幂。即指定e的多少次方。`,
        useage: 'EXP(power)',
        type: 'inputnumber',
      },
      {
        name: 'FLOOR',
        description: `将数值向下舍入为最接近的指定基数的倍数。

【value】是要向下舍入的值。
【significance】非必填，是用于向下舍入的基数，返回值为基数的倍数。如果未提供，默认取1。
【向下舍入】即它返回值是小于或等于原数值,且为最接近基数的倍数。`,
        useage: 'FLOOR(value, [significance])',
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'FLOORMATH',
      //   description: '将数字向下舍入为最接近的整数或最接近的指定基数的倍数',
      // },
      {
        name: 'MAX',
        description: `返回最大的数值。

【number...】是进行运算的数值参数，可以输入数字或引用数值类型的列。数值类型的列包括数字、货币、百分比、评分等。

另外，本函数的输入值都为日期格式时，可以比较多个日期中最晚的日期。`,
        useage: 'MAX(number1, [number2, ...])',
        type: 'inputnumber',
      },
      {
        name: 'MIN',
        description: `返回最小的数值。

【number…】是进行运算的数值参数，可以输入数字或引用数值类型的列。数值类型的列包括数字、货币、百分比、评分等。

另外，本函数的输入值都为日期格式时，可以比较多个日期中最晚的日期。`,
        useage: 'MIN(number1, [number2, ...])',
        type: 'inputnumber',
      },
      {
        name: 'INT',
        description: `将数值向下舍入为最接近的整数。

【value】是要向下舍入的值。
【向下舍入】即它返回值是小于或等于原数值。`,
        useage: 'INT(value)',
        type: 'inputnumber',
      },
      {
        name: 'MOD',
        description: `返回两数值相除的余数。

【value】是被除数。
【divisor】是除数。

返回结果的符号与除数的符号相同。`,
        useage: 'MOD(value, divisor)',
        type: 'inputnumber',
      },
      // {
      //   // TODO: useless
      //   name: 'PRODUCT',
      //   description: '返回所有参与字段中数值的乘积',
      // },
      {
        name: 'SUM',
        description: `将所有数值相加。

【number...】是进行运算的数值参数，可以输入数字或引用数值类型的列。数值类型的列包括数字、货币、百分比、评分等。`,
        usage: 'SUM(number1, [number2, ...])',
        example: '',
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
        description: `按指定的位数对数值进行四舍五入。

【value】是要四舍五入的值
【precision】非必填，要进行四舍五入运算的位数。未填写时默认为1。

如果位数大于 0，则四舍五入到指定的小数位。
如果位数等于 0，则四舍五入到最接近的整数。　
如果位数小于 0，则在小数点左侧进行四舍五入。`,
        useage: 'ROUND(value, [precision])',
        type: 'inputnumber',
      },
      {
        name: 'ROUNDUP',
        description: `按指定的位数将数值延绝对值增大方向舍入。

【value】是要舍入的值。
【precision】非必填，要将数字舍入到的位数。未填写时默认为1。
【绝对值增大】即它返回值是远离0（零）方向。

如果位数大于 0，则四舍五入到指定的小数位。
如果位数等于 0，则四舍五入到最接近的整数。　
如果位数小于 0，则在小数点左侧进行四舍五入。`,
        useage: 'ROUNDUP(value, [precision])',
        type: 'inputnumber',
      },
      {
        name: 'ROUNDDOWN',
        description: `按指定的位数将数值延绝对值减小方向舍入。

【value】是要舍入的值。
【precision】非必填，要将数字舍入到的位数。未填写时默认为1。
【绝对值减小】即它返回值是靠近0（零）方向。

如果位数大于 0，则四舍五入到指定的小数位。
如果位数等于 0，则四舍五入到最接近的整数。　
如果位数小于 0，则在小数点左侧进行四舍五入。`,
        useage: 'ROUNDDOWN(value, [precision])',
        type: 'inputnumber',
      },
      {
        name: 'POWER',
        description: `返回指定基数的幂。即指定基数的多少次方。

【base】是基数。
【power】是幂。`,
        useage: 'POWER(base, power)',
        type: 'inputnumber',
      },
      // {
      //   // TODO
      //   name: 'LN',
      //   description: '计算指定数字的自然对数',
      // },
      {
        name: 'LOG',
        description: `以指定基数为底，返回数值的对数。

【number】是想要计算其对数的数值。
【base】是对数的基数（底数），如果未指定基数，则默认为10。`,
        useage: 'LOG(number, base=10))',
        type: 'inputnumber',
      },
      // {
      //   // TODO
      //   name: 'LOG10',
      //   description: '返回数字以 10 为底的对数',
      // },
      {
        name: 'SQRT',
        description: `返回数值的平方根。

【value】是要对其求平方根的数值。

如果数值为负数，则 SQRT 返回 Nan`,
        useage: 'SQRT(value)',
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
        description: `返回指定日期属于当月的第几号，输出格式为1-31之间的整数。

【date】是指定的日期。
比如，数字1表示日期属于当月的第1号。`,
        useage: 'DAY(date)',
        type: 'inputnumber',
      },
      {
        name: 'DAYS',
        description: `返回两个日期之间的差值（有正负），即日期1减去日期2。

【date1】日期1
【date2】日期2
【units】计时单位，日期1与日期2差值的计算单位。比如按“天”计算也可以转换为按“年”计算。

计时单位包括以下符号，两种格式都可以使用：「单位说明符 」→ 「缩写」
毫秒："milliseconds" → "ms"
秒："seconds" → "s"
分钟："minutes" → "m"
小时："hours" → "h"
天："days" → "d"
周："weeks" → "w"
月："months" → "M"
季度："quarters" → "Q"
年："years" → "y"

点击下方链接可查看全部计时单位。`,
        useage: 'DAYS(date1, date2, [units])',
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
        description: `返回指定日期对应的四位数年份。

【date】是指定的日期。`,
        useage: 'YEAR(date)',
        type: 'inputnumber',
      },
      {
        name: 'MONTH',
        description: `返回指定日期对应的月份。

【date】是指定的日期。

本函数输出值为1（一月）至12（十二月）之间的整数。`,
        useage: 'MONTH(date)',
        type: 'inputnumber',
      },
      {
        name: 'HOUR',
        description: `返回指定日期的对应的时刻，输出格式为0（12:00 am）到23（11:00 pm）之间的整数。

【date】是指定的日期。
比如，18表示18:00`,
        useage: 'HOUR(date)',
        type: 'inputnumber',
      },
      {
        name: 'MINUTE',
        description: `返回指定日期的分钟数，输出格式为0到59之间的整数。
`,
        useage: 'MINUTE(date)',
        type: 'inputnumber',
      },
      {
        name: 'SECOND',
        description: `返回指定日期的秒种，输出格式为0到59之间的整数。

【date】是指定的日期。`,
        useage: 'SECOND(date)',
        type: 'inputnumber',
      },
      {
        name: 'TODAY',
        description: `返回今天的日期（年月日），但不会精确到时分秒（默认为00:00:00）。如果想要精确到时分秒，请使用函数NOW。

可以直接使用此函数返回年月日，见例子一；
也可以和DATEADD或DATETIME_DIFF等函数一起使用，比如用{截止时间}减去当前时间，来显示项目的倒计时，见例子二。

注意：仅当重新刷新计算公式或刷新表格时，这个函数返回的结果才会更新。`,
        useage: 'TODAY()',
        type: 'datepicker',
      },
      {
        name: 'NOW',
        description: `返回今天的日期和时间，会精确到时分秒。

可以直接使用此函数返回年月日，见例子一；

也可以和DATEADD或DATETIME_DIFF等函数一起使用，比如用{截止时间}减去当前时间，来显示项目的倒计时，见例子二。

 注意：仅当重新刷新计算公式或刷新表格时，这个函数返回的结果才会更新。`,
        useage: 'NOW()',
        type: 'datepicker',
      },
      {
        name: 'WEEKDAY',
        description: `返回指定日期对应一周中的星期几。

【date】是指定的日期。
【startDayOfWeek】非必填，是一周的开始时间，默认情况下每周从星期日开始（即周日为0）。 你还可以将开始时间设置为"Monday"(星期一，见例子二)

本函数输出值为0到6之间的整数。 `,
        useage: 'WEEKDAY(date, [startDayOfWeek])',
        type: 'inputnumber',
      },
      {
        name: 'WEEKNUM',
        description: `返回指定日期对应为一年中的第几个星期。

【date】是指定的日期。
【startDayOfWeek】非必填，是一周的开始时间，默认情况下每周从星期日开始（即周日为0）。 你还可以将开始时间设置为"Monday"(星期一)

本函数输出值为整数。比如6，代表该日期属于一年中的第6个星期。`,
        useage: 'WEEKNUM(date, [startDayOfWeek])',
        type: 'inputnumber',
      },
    ],
  },
];
