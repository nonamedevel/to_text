// "use strict";
// function toText(num, unit) {
//     if (!Number.isSafeInteger(num) || num <= 0) {
//         return null;
//     }
//     const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//     const parts = [];
//     let cur = num;
//     while (cur > 0) {
//         let d = cur % 10;
//         parts.push(DIGITS[d]);
//         cur = Math.floor(cur / 10);
//     }
//     let numStr = '';
//     for (let i = parts.length - 1; i >= 0; i--) {
//         numStr += parts[i];
//     }
//     if (unit === undefined) {
//         return numStr;
//     }
//     let form;
//     const lastDigit = num % 10;
//     if (lastDigit === 1) {
//         form = unit[0];
//     }
//     else if (lastDigit >= 2 && lastDigit <= 4) {
//         form = unit[1];
//     }
//     else {
//         form = unit[2];
//     }
//     return `${numStr} ${form}`;
// }
// console.log(toText(42));
// console.log(toText(1e6));
// console.log(toText(1.5e6));
// console.log(toText(0));
// console.log(toText(-5));
// console.log(toText(3.14));
// console.log(toText(Infinity));
// console.log(toText(9007199254740992));
// console.log(toText(1, ['рубль', 'рубля', 'рублей']));
// console.log(toText(10, ['сообщение', 'сообщения', 'сообщений']));
// console.log(toText(23, ['яблоко', 'яблока', 'яблок']));
