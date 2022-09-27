// 匹配加减乘除
export const calcWayReg = /(?:[+]|[-]|[*]|[/]|[(]|[)]){1}$/g;
// 匹配小括号
export const braketReg = /\((.+?)\)/g;
// 匹配大括号
export const braceReg = /\{.*?\}/g;
// 匹配空格 逗号
export const blockReg = /[\\ \\,\\，]/g;
