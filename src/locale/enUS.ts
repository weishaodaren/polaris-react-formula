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
};
