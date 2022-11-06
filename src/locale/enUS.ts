export default {
  1: 'Please enter the formula',
  2: 'Select a Polaris field or function',
  3: 'Confirm',
  4: 'Cancel',
  5: 'Polaris field',
  6: 'Sample formula',
  7: 'Fill in variables, operators and functions to form formulas to perform operations',
  8: `Reference to Polaris field: {field ID}
Use the operator: 2 * 5
Use function: AVERAGE({number column 1}, {number column 2})
Use IF statement: IF(logical condition, "value 1", "value 2")`,
  9: `Unit price * Quantity
Name "-" Year
AVERAGE({Math}, {Language}, {English})
IF({average score} > 60, "👍", "❗")`,
  10: 'Logical',
  11: `Determines whether a condition is satisfied. If it is satisfied, the first value is returned, if not, the second value is returned.

logical] is a logical condition, which means that the result of the calculation is a true (true) and false (false) expression.
[value1] is the return value when the logical condition is true.
value2] is the return value when the logical condition is false.

IF supports nested use, and can be used to check whether the cell is blank/empty.`,
  12: `IF({score} > 60, "pass", "fail")

IF({Water temperature} > 40, IF({Water temperature} < 60, "Just right", "Too hot"), "Too cold")

IF({Date} = "", "Please enter the date", "Date has been entered")`,
  13: `If all parameters are true (true), then it returns true (true), otherwise it returns false (false).

[logical] is a logical parameter, which can be a logical value, an array or a referenced polar star field`,
  14: `If any of the parameters is true (true), then it returns true (true), otherwise it returns false (false).

[logical] is a logical parameter, which can be a logical value, an array, or a referenced polar star field.`,
  15: `Inverts the logical value of its argument.

boolean] is a boolean argument, meaning that your input value must be a logical judgment and the output value is only true and false, such as comparing two values who is larger and who is smaller.
When the logical judgment of your argument is true (true), the function returns false (false).
When the logical judgment of your argument is false (false) when the function returns true (true); description

such as example one: 2>3 output value is false, but after the inverse function output value of true.
Such as example two: NOT ({ age} > 18) after the NOT function inversion, in fact, equivalent to the judgment of { age} ≤ 18`,
  16: 'NOT({age} > 18)',
  17: `This function is a multi-branch selection function, which consists of an expression and multiple branches + return value. If the expression is equal to a branch value, the function outputs the return value corresponding to that branch.

[expression] is an expression, the result of its operation will match with each branch.
[pattern] is the branch, each branch represents the possible results of the expression. Each branch has a corresponding return value.
[result] is the return value. If the result of an expression matches a branch, the corresponding return value is output.
[default] is the default value, if the result of the operation does not match any branch, the function will output the default value. The default value is empty when it is not filled in.

For example, in Example 1, {country} is a column of data referenced, and its output value may be the name of thousands of countries, which is the expression in the function. "China" and "Chinese" are one of the branches and the return value, respectively, which means that if the output value of {country} is "China", then it returns "Chinese". And "General English" is the default value, which means "General English" is output if the output value of {country} does not match any branch`,
  18: `SWITCH({country}, "China", "Chinese", "Russia", "Russian", "France", "French", "Japan", "Japanese", "General English")

SWITCH("C", "A", "Excellent", "B", "Average", "C", "Average", "D", "Poor", "No grade")
=>Ordinary`,
  19: `Concatenates multiple text values into a single text value. (The effect is equivalent to &)

[text1...] is the multiple values to be concatenated, you can enter text, numbers, date parameters or reference column data.

Please use double quotes to cause the text values you want to concatenate, except for numbers and quoted columns.
Special case: To concatenate double quotes, you need to use a backslash (\\) as an escape character.`,
  20: `CONCATENATE({name}, {age}, "years")

CONCATENATE("\\"", {age}, "\\"")`,
  21: ` Extracts multiple characters from the beginning of the text.

string] is the text whose characters are to be extracted.
HowMany] is the number of characters to be extracted. It is represented by a number, such as "3", which means extracting 3 characters from left to right.`,
  22: `LEFT("Polaris field: support API, feel free to DIY", 3)
=> Polaris field

LEFT({year of birth}, 4)
=> 1996`,
  23: `Extracts multiple characters from the end of the text.

[string] is the text whose characters are to be extracted.
[howMany] is the number of characters to be extracted. For example, "5" means extracting 5 characters from right to left.`,
  24: `RIGHT("Polaris field: support API, DIY at will", 5)
=> Polaris field

RIGHT({birth year and month}, 5)
=> 12-06`,
  25: `Extracts a fixed-length piece of text from a specific location in the content.

[string] is a piece of content you enter that contains the text being extracted. The content can be either the entered text or the referenced Polaris field data.
[WhereToSearch] is where you specify the text to be extracted from, expressed as a number. For example, the number "3" means that the text is extracted from the third character of the content.
[count] is the length of the extracted text, expressed as a number. For example, the number "2" means extracting 2 characters from the specified position.`,
  26: `MID("This apple is big and round", 3, 2)
=> Apple

MID("This apple is big and round", 99, 2)
=> Null

MID("This apple is big and round", 3, 99)
=> apple is big and round

MID({guest name}, 2, 99)
=> Hikaru`,
  27: `Replaces a piece of text at a specific location in the content with new text.

[string] is a piece of content that you enter that contains the text being replaced. The content can be either the entered text or the referenced Polaris field data.
[start_character] is where you specify the text to be replaced from, expressed as a number. For example, the number "3" means that the text is replaced from the third character of the content.
[number_of_characters] is the number of characters you specify to be replaced, expressed as a number. For example, the number "2" means to replace 2 characters in the specified position.
[replacement] is to replace the original text with new text.

(If you want to replace all occurrences of the original text in the content with new text, see SUBSTITUTE.)`,
  28: `REPLACE("This apple is big and round", 3, 2, "peach")
=> This peach is big and round

REPLACE("This apple is big and round", 3, 99, "Durian is sweet and fragrant")
=> this durian is fragrant and sweet

REPLACE({guest name}, 1, 1, "X")
=> X Hikaru`,
  29: `Clear the spaces at the beginning and end of the text.

[value] is the text to be processed.`,
  30: `TRIM(" Spaces on both sides will be cleared! ")
=> Spaces on both sides will be cleared!`,
  31: `Count the length of characters of a piece of text.

[string] is the text whose length is to be counted; punctuation marks, spaces, etc. will also take up a character.`,
  32: `LEN("Guess how long I am?")
=> 8

LEN("a blank")
=> 7`,
  33: `Converts all uppercase characters in the text to lowercase characters.

[string] is the text being converted.`,
  34: `Converts all lowercase characters in the text to uppercase characters.

[string] is the text being converted.`,
  35: `Find the position of the first occurrence of a specific text in the content.

[stringToFind] is the specific text to be found.
[whereToSearch] specifies from which paragraph the text is to be found within the content. You can enter text parameters or reference the polar star field.
[startFromPosition] is not required, specifying the position from which the content is to be found (the first few characters are indicated by a number).

This function can quickly find the position of a specific text in a large section of content.
If the number 3 is returned, it means that the text appears in the third character of the content.
If no matching text is found, the result will be 0.

The effect is similar to SEARCH(), but when no match is found, SEARCH() returns the value of null instead of 0.`,
  36: `FIND("Apple", "This apple is big and round, want to buy two pounds of apples?")
=> 3

FIND("Banana", "This apple is big and round, want to buy two pounds of apples?")
=> 0

FIND("Apple", "This apple is big and round, want to buy two pounds of apples?" , 10)
=> 13`,
  37: `Converts a text string to a number.

[text] indicates the text value to be converted.

This function extracts the numbers within the text.`,
  38: `Repeat the text according to the specified number of times.

[string] is the text to be repeated.
[mumber] is the number of times to repeat. It is expressed as a number, such as "2", which means repeat 2 times.`,
  39: `Search for the first occurrence of a specific text in the content.

[stringToFind] is the specific text to be searched.
[whereToSearch] specifies from which content the text is searched. You can enter text parameters or reference the polar star field.
[startFromPosition] is not required, specifying from which position of the content to start the search (with a number indicating the first few characters).

This function allows you to quickly search for the location of a specific text in a large section of content.
If the number 3 is returned, it means that the text appears in the third character of the content.
If no matching text is found, the result will be a null value.

The effect is similar to FIND(), but when no match is found, FIND() returns a value of 0 instead of null.`,
  40: `SEARCH("Apple", "This apple is big and round, want to buy two pounds of apples?")
=> 3

SEARCH("Banana", "This apple is big and round, want to buy two pounds of apples?")
=> empty value

SEARCH("Apple", "This apple is big and round, want to buy two pounds of apples?" , 10)
=> 13`,
  41: `Replaces all the specific text in the content with new text.

[string] is a piece of content that you enter that contains the text being replaced. The content can be either the entered text or the referenced Polaris field data.
[old_text] The original text to be replaced.
[new_text] The new text to replace the original text.
[index] is not required, it is the index number, after specifying the index number, the system will only replace the original text in a specific position.

This function will replace the original characters in the text with new characters, in the absence of a special declaration, the new characters will replace all the original characters that appear.

(If you want to replace the characters between the specified starting position and the ending position, see REPLACE.)`,
  42: `SUBSTITUTE("小胡, 小张, 小王", "小", "老")
=> Old Hu, Old Zhang, Old Wang

SUBSTITUTE("小胡, 小张, 小王", "小", "老", 3)
=> Xiao Hu, Lao Zhang, Xiao Wang`,
  43: 'Digital',
  44: `Introduction
Take the absolute value of the value.

Parameter Description
value: the value to find the absolute value of.
absolute value: the absolute value of a positive number is itself, the absolute value of a negative number is by removing the negative sign.`,
  45: `// value > 0
Formula: ABS(1.5)
Operation result: 1.50

// value = 0
Formula: ABS (0)
The result of the operation: 0.00

// value < 0
Formula: ABS (-1.5)
Result: 1.50`,
  46: `Returns the arithmetic mean of multiple values.

[number...] is the numeric parameter to perform the operation. You can enter a number or reference a column of numeric type. Numeric columns include numbers, currencies, percentages, ratings, and so on.

If one of the parameters is a text value, such as "eight", it will be treated as 0 in the operation.`,
  47: `AVERAGE(2, 4, "6", "eight")
  =>(2 + 4 + 6 + 0) /4 =3
  
  AVERAGE({math grade}, {English grade}, {language grade}) `,
  48: `Rounds the value up to the nearest multiple of the specified base.

  [value] is the value to be rounded up.
  [Significance] is not required, it is the base to be used for upward rounding, and the return value is a multiple of the base. If not provided, the default is 1.
  [Upward rounding] means it returns a value greater than or equal to the original value, and is a multiple of the nearest base.`,
  49: `Count the number of "number" type values.

  [number] can be the parameter entered or the column referenced.
  
  This function can calculate how many values are contained in the input parameters or cells (numbers, currencies, percentages, ratings are all values).`,
  50: `Count the number of non-null values.

  [textOrNumber] can be the input parameters or reference to the column.
  
  This function can calculate how many non-null values are contained in the input parameters or cells.
  For example, you can count how many options within a cell, how many pictures. How many members, etc.
  Can also count the magical reference to the array of non-null values within the cell.`,
  51: `Count the number of occurrences of keyword in values.

  values: specify where to find the data from. Supports data of array type or text type.
  keyword: the keyword to be looked up and counted.
  operation: comparator, not required. You can fill in the condition symbols greater than ">", less than "<", equal to "=", not equal to "! =", if not filled in the default is equal to.
  Example 1 does not fill in the comparison character, the default count is equal to the number of times the value of "A" appears.
  Example 2 is filled with the comparator ">", which means that the number of times a value greater than "2" appears is counted.
  
  Usage scenarios.
  1) You can count the number of occurrences of the character "A" in a string of text arrays [A, B , C , D, A] as 2, see example 1.
  2) You can count the number of numbers greater than 3 in an array of numbers [1, 2, 3, 4, 5] as 2, see example 2.
  3) You can count the number of occurrences of "grape" in a string of text "eat grapes without spitting out the skin" as 2, see example 3.`,
  52: `COUNTIF({rating}, "A")
  => 2
  // Where {Rating} is a "magic quote" type wiggle column and the data format is an array.
  
  COUNTIF({Score}, 3, ">")
  => 2
  // where {Score} is the "magic quote" type of the dimension column, and the data format is an array.
  
  COUNTIF({snippets}, "grapes")
  => 2
  // where {jingle} is a dimension column of type "text", and the data format is text string.`,
  53: `Returns the specified power of e.

  [e] is a natural number, about 2.718282
  [power] is the power. That is, how many powers of e are specified.`,
  54: `Rounds the value down to the nearest multiple of the specified base.

  [value] is the value to be rounded down.
  [significance] is not required, it is the base to be rounded down, and the return value is a multiple of the base. If not provided, the default is 1.
  [rounding down] means it returns a value less than or equal to the original value, and is the closest multiple of the base.`,
  55: `Return the maximum value.

  [number...] is the numeric parameter to perform the operation. You can enter a number or reference a column of numeric type. Columns of numeric type include numbers, currency, percentages, ratings, etc.
  
  In addition, when the input values of this function are in date format, you can compare the latest date among multiple dates.`,
  56: `MAX(5, -5, 555, -55)
  => 555
  
  MAX({math grade}, {English grade}, {language grade})`,
  57: `Returns the smallest value.

  [number...] is the numeric parameter to perform the operation. You can enter a number or reference a column of numeric type. Columns of numeric type include numbers, currency, percentages, ratings, etc.
  
  In addition, the input values of this function are in date format, you can compare the latest date among multiple dates.`,
  58: 'MIN({Math score}, {English score}, {Language score})',
  59: `Rounds the value down to the nearest integer.

  [value] is the value to be rounded down.
  [round down] means it returns a value that is less than or equal to the original value.`,
  60: `Returns the remainder of the division of two values.

  [value] is the divisor.
  [divisor] is the number of divisors.
  
  The sign of the returned result is the same as the sign of the divisor.`,
  61: `Add up all the values.

  [number...] is the numeric parameter to perform the operation. You can enter a number or reference a column of numeric type. Columns of numeric type include number, currency, percentage, rating, etc.`,
  62: `UM(1, 2, "3", "four")
  => 1 + 2 + 3 = 6
  
  SUM({math grade}, {English grade}, {language grade})`,
  63: `Rounds the value by the specified number of digits.

  [value] is the value to be rounded
  [precision] is not required, the number of bits to be rounded. The default is 1 when not filled.
  
  If the number of digits is greater than 0, it will be rounded to the specified decimal place.
  If the number of digits is equal to 0, it will be rounded to the nearest integer.　
  If the number of digits is less than 0, the number is rounded to the left of the decimal point.`,
  64: `Rounds the value by the specified number of digits in the direction of increasing absolute value.

  [value] is the value to be rounded.
  [precision] is not required, the number of digits to be rounded to. The default is 1 when not filled.
  [absolute value increasing] i.e. it returns the value in the direction away from 0 (zero).
  
  If the number of digits is greater than 0, it will be rounded to the specified decimal place.
  If the number of digits is equal to 0, it will be rounded to the nearest integer.　
  If the number of digits is less than 0, the number is rounded to the left of the decimal point.`,
  65: `Rounds the value by the specified number of digits in the direction of absolute value reduction.

  [value] is the value to be rounded.
  [precision] is not required, the number of digits to be rounded to. The default is 1 when not filled.
  [absolute value decrement] i.e. it returns a value close to 0 (zero) direction.
  
  If the number of digits is greater than 0, it will be rounded to the specified decimal place.
  If the number of digits is equal to 0, it will be rounded to the nearest integer.　
  If the number of digits is less than 0, the number is rounded to the left of the decimal point.`,
  66: `Returns the power of the specified base. That is, how many powers of the specified base.

  [base] is the base.
  [power] is the power.`,
  67: `Returns the logarithm of the value with the specified base.

  [number] is the value whose logarithm you want to calculate.
  [base] is the base of the logarithm (base), if no base is specified, the default is 10.`,
  68: `Returns the square root of the value.

  [value] is the value for which the square root is to be found.
  
  If the value is negative, SQRT returns Nan`,
  69: `The output format is an integer between 1 and 31.

  [date] is the specified date.
  For example, the number 1 means the date belongs to the first number of the current month.`,
  70: `DAY("2020.10.01")
  =>1
  
  DAY({completion date})
  =>5`,
  71: `Returns the difference between two dates (with positive or negative), i.e., date1 minus date2.

  [date1] date1
  [date2] date2
  `,
  72: `Returns the four-digit year corresponding to the specified date.

  [date] is the specified date.`,
  73: `Returns the month corresponding to the specified date.

  [date] is the specified date.
  
  The output value of this function is an integer between 1 (January) and 12 (December).`,
  74: `The output format is an integer between 0 (12:00 am) and 23 (11:00 pm).

  [date] is the specified date.
  For example, 18 means 18:00`,
  75: `Returns the number of minutes on the specified date, in the output format of an integer between 0 and 59.
  `,
  76: `Count how many working days (with plus or minus) are between two dates.

  [startDate] The start date.
  [endDate] Cutoff date. If the start date is later than the end date, the number will be negative.
  [holidays] Not required. It is the date to be removed from the working calendar, such as a holiday. Its input format is "yyyy-mm-dd", and multiple dates separated by commas.
  
  This function counts the working days between the starting and ending dates, excluding weekends and the specific dates you specify.`,
  77: `Returns the number of seconds of the specified date, and the output format is an integer between 0 and 59.

  [date] is the specified date.`,
  78: `Returns today's date (year, month and day), but not to the exact hour, minute and second (default is 00:00:00). If you want to be precise to the hour, minute and second, please use the function NOW.

  can use this function directly to return the year, month and day, see example one.
  Can also be used with functions such as DATEADD or DATETIME_DIFF, for example, to display the countdown to the project by subtracting the current time from {cutoff time}, see example two.
  
  Note: The result returned by this function is updated only when the calculation formula is refreshed or the table is refreshed.`,
  79: `return today's date and time, will be accurate to the hour, minute and second.

  can use this function directly to return the year, month and day, see example one.
  
  Can also be used with functions such as DATEADD or DATETIME_DIFF, for example, to display the countdown to the project by subtracting the current time from {cutoff time}, see example two.
  
   Note: The result returned by this function is updated only when the calculation formula is refreshed or the table is refreshed.`,
  80: `Returns the date several business days after the start date.

  [startDate] is the start date you specified.
  [numDays] is the number of working days after the start date you specify, expressed as a positive number. For example, the number "1" represents the date one business day after the start date, see example 1.
  [holidays] is not required. It is a specific date to be removed from the calendar, such as a holiday. The input format is "yyyy-mm-dd", with multiple dates separated by commas, see example 3.
  
  The working days of this function do not include weekends and specific dates you specify.`,
  81: `Returns the day of the week for the specified date.

  [date] is the specified date.
  [startDayOfWeek] is not required, it is the start time of the week, by default the week starts on Sunday (i.e. Sunday is 0). You can also set the start time to "Monday" (Monday, see example two)
  
  The output value of this function is an integer between 0 and 6. `,
  82: `Returns the specified date corresponding to the first week of the year.

  [date] is the specified date.
  [startDayOfWeek] is not required, it is the start time of the week, and by default, the week starts on Sunday (i.e. Sunday is 0). You can also set the start time to "Monday" (Monday)
  
  The output value of this function is an integer. For example, 6, representing the date belongs to the 6th week of the year.`,
  83: 'Usage',
  84: 'For example',
  85: 'Return to',
  86: 'column cell values',
  87: 'No search results yet',
  88: 'Invalid Polaris field or function name: ',
  89: 'Incorrect formula: ',
  90: 'Unknown operators: ',
  91: 'function requires at least',
  92: 'parameters',
  93: 'function requires',
  94: 'asymmetrical',
  95: 'Beginning error',
  96: 'Ending error',
  97: 'Continuous Operations',
  98: 'after the illegal operation',
};
