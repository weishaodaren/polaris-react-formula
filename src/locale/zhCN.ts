export default {
  1: '请输入公式',
  2: '选择极星字段或函数',
  3: '确认',
  4: '取消',
  5: '极星字段',
  6: '公式样例',
  7: '填写变量、运算符和函数来组成公式进行运算',
  8: `引用极星字段：{字段ID}
使用运算符：2 * 5
使用函数：AVERAGE({数字列1}, {数字列2})
使用IF语句：IF(逻辑条件, "值1", "值2")`,
  9: `单价 * 数量
姓名 "-" 年纪
AVERAGE({数学}, {语文}, {英语})
IF({平均分} > 60, "👍", "❗")`,
  10: '逻辑',
  11: `判断是否满足某个条件，如果满足则返回第一个值，如果不满足则返回第二个值。

【logical】是逻辑条件，表示计算结果为真（true）和假（false）的表达式。
【value1】是当逻辑条件为真时的返回值。
【value2】是当逻辑条件为假时的返回值。

IF支持嵌套使用，并且可以用于检查单元格是否为空白/为空。`,
  12: `IF({分数} > 60, "及格", "不及格")

IF({水温} >  40, IF({水温} < 60, "刚刚好", "太热"), "太冷")

IF({Date} = "", "请输入日期", "日期已经输入")`,
  13: `如果所有参数均为真（true），则返回真（true），否则返回假（false）。

【logical】是逻辑参数，可以是逻辑值、数组或引用的极星字段`,
  14: `如果任何一个参数为真（true），则返回真（true），否则返回假（false）。

【logical】是逻辑参数，可以是逻辑值、数组或引用的极星字段。`,
  15: `反转其参数的逻辑值。

【boolean】是布尔参数，意味着你的输入值必须是逻辑判断且输出值只有真和假，比如比较两个值谁大谁小。
当你参数的逻辑判断为真（true）时函数返回假（false）；
当你参数的逻辑判断为假（false）时函数返回真（true）；description

如例子一：2>3输出值是假，但经过反转后函数输出值的是真。
如例子二：NOT({年纪} > 18)经过NOT函数反转后，其实相当于判断{年纪} ≤ 18`,
  16: 'NOT({年纪} > 18)',
  17: `本函数为多分支选择函数，它由表达式和多个分支+返回值组成，如果表达式等于某个分支值，则函数输出该分支对应的返回值。

【expression】是表达式，其运算的结果会与每个分支进行匹配。
【pattern】是分支，每个分支代表表达式的可能运算结果。每一个分支都有对应的返回值。
【result】是返回值，如果表达式的运算结果匹配了一个分支，则输出对应的返回值。
【default】是默认值，如果运算结果没有匹配任何一个分支，则函数输出默认值。默认值未填写时为空值。

比如例子一，{国家}是引用的一列数据，其输出值可能是成千上万个国家名称，它是该函数中的表达式。“中国”和“中文”分别为其中一条分支和返回值，它表示如果{国家}的输出值为“中国”时，则返回“中文”。而“通用英语”为默认值，它表示{国家}的输出值没有匹配任何分支时，则输出“通用英语”`,
  18: `SWITCH({国家}, "中国", "中文", "俄国", "俄语", "法国", "法语", "日本", "日语", "通用英语")

SWITCH("C", "A", "优秀", "B", "中等", "C", "普通", "D", "较差", "没有成绩")
=>普通`,
  19: `将多个文本值串联成单个文本值。（其效果等同于 &）

【text1..】是要串联的多个值，可以输入文本、数字、日期参数或者引用列数据。

请用双引号将你要串联的文本值引起来，数字和引用列除外。
特例：如果要串联双引号，你需要使用反斜杠（\\）作为转义字符。`,
  20: `CONCATENATE({姓名}, {年纪}, "岁")

CONCATENATE("\\"", {年纪}, "\\"")`,
  21: `从文本的开头提取多个字符。

【string】是要被提取字符的文本。
【howMany】是提取的字符数量。用数字表示，比如"3"，代表从左到右提取3个字符。`,
  22: `LEFT("极星字段：支持API，随意DIY", 3)
=> 极星字段

LEFT({出生年月}, 4)
=> 1996`,
  23: `从文本的末尾提取出多个字符。

【string】是要被提取字符的文本。
【howMany】是提取的字符数量。用数字表示，比如"5"，代表从右到左提取5个字符。`,
  24: `RIGHT("极星字段：支持API，随意DIY", 5)
=> 极星字段

RIGHT({出生年月}, 5)
=> 12-06`,
  25: `从内容中特定位置提取一段固定长度的文本。

【string】是你输入的一段内容，其中包含了被提取的文本。该内容可以是输入的文本或者引用的极星字段数据。
【whereToSearch】是你指定从哪儿提取文本，用数字表示。比如数字"3"表示从内容的第3个字符开始提取。
【count】是提取的文本长度，用数字表示。比如数字"2"表示从指定位置提取2个字符。`,
  26: `MID("这个苹果又大又圆", 3, 2)
=> 苹果

MID("这个苹果又大又圆", 99, 2)
=> 空值

MID("这个苹果又大又圆", 3, 99)
=> 苹果又大又圆

MID({嘉宾姓名}, 2, 99)
=> 彦祖`,
  27: `将内容中特定位置的一段文本替换为新文本。

【string】是你输入的一段内容，其中包含了被替换的文本。该内容可以是输入的文本或者引用的极星字段数据。
【start_character】是你指定从哪儿替换文本，用数字表示。比如数字"3"表示从内容的第3个字符开始替换。
【number_of_characters】是你指定要替换掉多少个字符，用数字表示。比如数字"2"表示替换掉指定位置的2个字符。
【replacement】是替换原文本的新文本。

（如果你想将内容中所有出现的原文本替换为新文本，请参见SUBSTITUTE。）`,
  28: `REPLACE("这个苹果又大又圆", 3, 2, "桃子")
=> 这个桃子又大又圆

REPLACE("这个苹果又大又圆", 3, 99, "榴莲又香又甜")
=> 这个榴莲又香又甜

REPLACE({嘉宾姓名}, 1, 1, "X")
=> X彦祖`,
  29: `清除文本开头和结尾的空格。

【value】是需要被处理的文本。`,
  30: `TRIM(" 两边空格会被清除! ")
=>两边空格会被清除!`,
  31: `统计一段文本的字符长度。

【string】是要计算长度的文本；标点符号、空格等也会占一个字符。`,
  32: `LEN("你猜猜我有多长？")
=> 8

LEN("a blank")
=> 7`,
  33: `将文本中所有大写字符全部转换为小写字符。

【string】是被转换的文本。`,
  34: `将文本中所有小写字符全部转换为大写字符。

【string】是被转换的文本。`,
  35: `查找特定的文本在内容中第一次出现的位置。

【stringToFind】是要查找到的特定文本。
【whereToSearch】指定从哪段内容内查找文本。可以输入文本参数或者引用极星字段。
【startFromPosition】非必填，指定从内容的哪个位置开始查找（用数字表示第几个字符）。

本函数可以在一大段内容中快速查找特定文本出现的位置。
如果返回数字3，表示文本出现在该内容的第3个字符。
如果未找到匹配的文本，则结果将为0。

其效果与SEARCH()类似，但是未找到匹配项时，SEARCH()返回值为空而不是0。`,
  36: `FIND("苹果", "这个苹果又大又圆，要买两斤苹果吗？")
=> 3

FIND("香蕉", "这个苹果又大又圆，要买两斤苹果吗？")
=> 0

FIND("苹果", "这个苹果又大又圆，买两斤苹果吗？"，10)
=> 13`,
  37: `将文本字符串转换为数字。

【text】表示要转换的文本值。

本函数可以将文本内的数字提取出来。`,
  38: `根据指定次数重复文本。

【string】是需要重复的文本。
【mumber】是指定的重复次数。用数字表示，比如”2“，表示重复2次。`,
  39: `搜索特定的文本在内容中第一次出现的位置。

【stringToFind】是要搜索到的特定文本。
【whereToSearch】指定从哪段内容搜索文本。可以输入文本参数或者引用极星字段。
【startFromPosition】非必填，指定从内容的哪个位置开始搜索（用数字表示第几个字符）。

本函数可以在一大段内容中快速搜索特定文本出现的位置。
如果返回数字3，表示文本出现在该内容的第3个字符。
如果未找到匹配的文本，则结果将为空值。

其效果与FIND()类似，但是未找到匹配项时，FIND()返回值为0而不是空值。`,
  40: `SEARCH("苹果", "这个苹果又大又圆，要买两斤苹果吗？")
=> 3

SEARCH("香蕉", "这个苹果又大又圆，要买两斤苹果吗？")
=> 空值

SEARCH("苹果", "这个苹果又大又圆，买两斤苹果吗？"，10)
=> 13`,
  41: `将内容中特定的文本全部替换为新文本。

【string】是你输入的一段内容，其中包含了被替换的文本。该内容可以是输入的文本或者引用的极星字段数据。
【old_text】要被替换的原文本。
【new_text】替换原文本的新文本。
【index】非必填，是索引号，指定索引号后系统仅会替换特定位置的原文本。

本函数将文本中的原字符替换为新字符，在没有特别声明的情况下，新字符将替换所有出现的原字符。

（如果你想替换指定起点位置和终点位置之间的字符，请参见REPLACE。）`,
  42: `SUBSTITUTE("小胡，小张，小王", "小", "老")
=> 老胡，老张，老王

SUBSTITUTE("小胡，小张，小王", "小", "老", 3)
=> 小胡，老张，小王`,
  43: '数字',
  44: `简介
取数值的绝对值。

参数说明
value：是要对其求绝对值的数值。
绝对值：正数的绝对值是本身，负数的绝对值是去掉负号。`,
  45: `// value > 0
公式：ABS(1.5)
运算结果：1.50

//value = 0
公式：ABS(0)
运算结果：0.00

// value < 0
公式：ABS(-1.5)
运算结果：1.50`,
  46: `返回多个数值的算术平均数。

【number...】是进行运算的数值参数，可以输入数字或引用数值类型的列。数值类型的列包括数字、货币、百分比、评分等。

如果其中某个参数是文本值，比如"八"，在运算时会被当做0。`,
  47: `AVERAGE(2, 4, "6", "八")
  =>(2 + 4 + 6 + 0) /4 =3
  
  AVERAGE({数学成绩}, {英语成绩}, {语文成绩}) `,
  48: `将数值向上舍入为最接近的指定基数的倍数。

  【value】是要向上舍入的值。
  【significance】非必填，是用于向上舍入的基数，返回值为基数的倍数。如果未提供，默认取1。
  【向上舍入】即它返回值是大于或等于原数值,且为最接近的基数的倍数。`,
  49: `统计「数字」类型值的数量。

  【number】可以是输入的参数或引用的列。
  
  本函数可以计算输入的参数或单元格内包含了多少个数值（数字、货币、百分比、评分都为数值）。`,
  50: `统计非空值的数量。

  【textOrNumber】可以是输入的参数或引用的列。
  
  本函数可以计算输入的参数或单元格内包含了多少个非空值。
  比如，可以统计一个单元格内有多少个选项，多少个图片。多少个成员等。
  还可以统计神奇引用的单元格内的数组非空值。`,
  51: `在values中统计keyword出现的次数。

  values：指定从哪里查找数据。支持数组类型或文本类型的数据。
  keyword：要查找并统计的关键词。
  operation：比较符，非必填项。你可以填入条件符号大于">"，小于"<"，等于"="，不等于"!="，如果不填写默认为等于。
  例子一中没有填写比较符，默认统计等于"A"的值出现的次数。
  例子二中填写了比较符">"，意味统计大于"2"的值出现的次数。
  
  使用场景：
  1）可以统计一串文本数组[A, B , C , D, A]中，字符"A"出现的数量为2，见例子一。
  2）可以统计一串数字数组[1, 2, 3, 4, 5]中，大于3的数字数量为2，见例子二。
  3)可以统计一串文本字符串"吃葡萄不吐葡萄皮"中，"葡萄"出现的次数为2，见例子三。`,
  52: `COUNTIF({评级}, "A")
  => 2
  // 其中{评级}为”神奇引用“类型的维格列，数据格式为数组。
  
  COUNTIF({得分}, 3, ">")
  => 2
  // 其中{得分}为”神奇引用“类型的维格列，数据格式为数组。
  
  COUNTIF({顺口溜}, "葡萄")
  => 2
  // 其中{顺口溜}为”文本“类型的维格列，数据格式为文本字符串。`,
  53: `返回e的指定次方。

  【e】是自然数，约为2.718282
  【power】是幂。即指定e的多少次方。`,
  54: `将数值向下舍入为最接近的指定基数的倍数。

  【value】是要向下舍入的值。
  【significance】非必填，是用于向下舍入的基数，返回值为基数的倍数。如果未提供，默认取1。
  【向下舍入】即它返回值是小于或等于原数值,且为最接近基数的倍数。`,
  55: `返回最大的数值。

  【number...】是进行运算的数值参数，可以输入数字或引用数值类型的列。数值类型的列包括数字、货币、百分比、评分等。
  
  另外，本函数的输入值都为日期格式时，可以比较多个日期中最晚的日期。`,
  56: `MAX(5, -5, 555, -55)
  => 555
  
  MAX({数学成绩}, {英语成绩}, {语文成绩})`,
  57: `返回最小的数值。

  【number…】是进行运算的数值参数，可以输入数字或引用数值类型的列。数值类型的列包括数字、货币、百分比、评分等。
  
  另外，本函数的输入值都为日期格式时，可以比较多个日期中最晚的日期。`,
  58: 'MIN({数学成绩}, {英语成绩}, {语文成绩})',
  59: `将数值向下舍入为最接近的整数。

  【value】是要向下舍入的值。
  【向下舍入】即它返回值是小于或等于原数值。`,
  60: `返回两数值相除的余数。

  【value】是被除数。
  【divisor】是除数。
  
  返回结果的符号与除数的符号相同。`,
  61: `将所有数值相加。

  【number...】是进行运算的数值参数，可以输入数字或引用数值类型的列。数值类型的列包括数字、货币、百分比、评分等。`,
  62: `UM(1, 2, "3", "四")
  => 1 + 2 + 3 =6
  
  SUM({数学成绩}, {英语成绩}, {语文成绩})`,
  63: `按指定的位数对数值进行四舍五入。

  【value】是要四舍五入的值
  【precision】非必填，要进行四舍五入运算的位数。未填写时默认为1。
  
  如果位数大于 0，则四舍五入到指定的小数位。
  如果位数等于 0，则四舍五入到最接近的整数。　
  如果位数小于 0，则在小数点左侧进行四舍五入。`,
  64: `按指定的位数将数值延绝对值增大方向舍入。

  【value】是要舍入的值。
  【precision】非必填，要将数字舍入到的位数。未填写时默认为1。
  【绝对值增大】即它返回值是远离0（零）方向。
  
  如果位数大于 0，则四舍五入到指定的小数位。
  如果位数等于 0，则四舍五入到最接近的整数。　
  如果位数小于 0，则在小数点左侧进行四舍五入。`,
  65: `按指定的位数将数值延绝对值减小方向舍入。

  【value】是要舍入的值。
  【precision】非必填，要将数字舍入到的位数。未填写时默认为1。
  【绝对值减小】即它返回值是靠近0（零）方向。
  
  如果位数大于 0，则四舍五入到指定的小数位。
  如果位数等于 0，则四舍五入到最接近的整数。　
  如果位数小于 0，则在小数点左侧进行四舍五入。`,
  66: `返回指定基数的幂。即指定基数的多少次方。

  【base】是基数。
  【power】是幂。`,
  67: `以指定基数为底，返回数值的对数。

  【number】是想要计算其对数的数值。
  【base】是对数的基数（底数），如果未指定基数，则默认为10。`,
  68: `返回数值的平方根。

  【value】是要对其求平方根的数值。
  
  如果数值为负数，则 SQRT 返回 Nan`,
  69: `返回指定日期属于当月的第几号，输出格式为1-31之间的整数。

  【date】是指定的日期。
  比如，数字1表示日期属于当月的第1号。`,
  70: `DAY("2020.10.01")
  =>1
  
  DAY({完成日期})
  =>5`,
  71: `返回两个日期之间的差值（有正负），即日期1减去日期2。

  【date1】日期1
  【date2】日期2
  `,
  72: `返回指定日期对应的四位数年份。

  【date】是指定的日期。`,
  73: `返回指定日期对应的月份。

  【date】是指定的日期。
  
  本函数输出值为1（一月）至12（十二月）之间的整数。`,
  74: `返回指定日期的对应的时刻，输出格式为0（12:00 am）到23（11:00 pm）之间的整数。

  【date】是指定的日期。
  比如，18表示18:00`,
  75: `返回指定日期的分钟数，输出格式为0到59之间的整数。
  `,
  76: `统计两个日期之间相隔多少个工作日（有正负）。

  【startDate】起始日期。
  【endDate】截止日期。如果起始日期比截止日期晚，则会出现负数。
  【holidays】非必填。是要从工作日历中去除的日期，例如节假日。其输入格式为「yyyy-mm-dd」，多个日期以逗号分隔的。
  
  本函数统计起止日期之间的工作日，不包括周末和你指定的特定日期。`,
  77: `返回指定日期的秒种，输出格式为0到59之间的整数。

  【date】是指定的日期。`,
  78: `返回今天的日期（年月日），但不会精确到时分秒（默认为00:00:00）。如果想要精确到时分秒，请使用函数NOW。

  可以直接使用此函数返回年月日，见例子一；
  也可以和DATEADD或DATETIME_DIFF等函数一起使用，比如用{截止时间}减去当前时间，来显示项目的倒计时，见例子二。
  
  注意：仅当重新刷新计算公式或刷新表格时，这个函数返回的结果才会更新。`,
  79: `返回今天的日期和时间，会精确到时分秒。

  可以直接使用此函数返回年月日，见例子一；
  
  也可以和DATEADD或DATETIME_DIFF等函数一起使用，比如用{截止时间}减去当前时间，来显示项目的倒计时，见例子二。
  
   注意：仅当重新刷新计算公式或刷新表格时，这个函数返回的结果才会更新。`,
  80: `返回起始日期若干个工作日之后的日期。

  【startDate】是你指定的起始日期。
  【numDays】是你指定的起始日期之后的工作日天数，用正数表示。比如，数字“1”代表起始日期一个工作日之后的日期，见例子一；
  【holidays】非必填。是要从日历中去除的特定日期，例如节假日。其输入格式为「yyyy-mm-dd」，多个日期以逗号分隔的，见例子三。
  
  本函数的工作日不包括周末和你指定的特定日期。`,
  81: `返回指定日期对应一周中的星期几。

  【date】是指定的日期。
  【startDayOfWeek】非必填，是一周的开始时间，默认情况下每周从星期日开始（即周日为0）。 你还可以将开始时间设置为"Monday"(星期一，见例子二)
  
  本函数输出值为0到6之间的整数。 `,
  82: `返回指定日期对应为一年中的第几个星期。

  【date】是指定的日期。
  【startDayOfWeek】非必填，是一周的开始时间，默认情况下每周从星期日开始（即周日为0）。 你还可以将开始时间设置为"Monday"(星期一)
  
  本函数输出值为整数。比如6，代表该日期属于一年中的第6个星期。`,
  83: '用法',
  84: '举个例子',
  85: '返回',
  86: '列单元格的值',
  87: '暂无搜索结果',
  88: '无效的极星字段或函数名称：',
  89: '错误的公式：',
  90: '未知的运算符：',
  91: '函数至少需要',
  92: '个参数',
  93: '函数需要',
  94: '不对称',
  95: '开头错误',
  96: '结尾错误',
  97: '连续运算',
  98: '后非法运算',
};