

// const ONES = [
//     '', '', '', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять',
//     'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать',
//     'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'
// ]

// const TENS = [
//     '', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят',
//     'семьдесят', 'восемьдесят', 'девяносто'
// ]

// const HUNDREDS = [
//     '', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
//     'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
// ]

// const SCALES = [
//     ['', '', '', 'm'],
//     ['тысяча', 'тысячи', 'тысяч', 'f'],
//     ['миллион', 'миллиона', 'миллионов', 'm'],
//     ['миллиард', 'миллиарда', 'миллиардов', 'm'],
//     ['триллион', 'триллиона', 'триллионов', 'm'],
//     ['квадриллион', 'квадриллиона', 'квадриллионов', 'm'],
// ]

// function getGenderSpecific(num, gender) {
//     if (num === 1) {
//         if (gender === 'f') {
//             return 'одна'
//         }
//         if (gender === 'm') {
//             return 'один'
//         }
//         return 'одно'
//     }
//     if (num === 2) {
//         if (gender === 'f') {
//             return 'две'
//         }
//         if (gender === 'm') {
//             return 'два'
//         }
//         return 'два'
//     }
//     return ONES[num]
// }

// // 'tri' is short for 'triplet'
// function triToWords(num, gender) {
//     const parts = []
//     if (num === 0) {
//         return ''
//     }
//     const h = Math.floor(num / 100)
//     const rem = num % 100
//     if (h) {
//         parts.push(HUNDREDS[h])
//     }
//     if (rem < 20) {
//         if (rem) {
//             parts.push(getGenderSpecific(rem, gender))
//         }
//     } else {
//         const t = Math.floor(rem / 10)
//         const o = rem % 10
//         parts.push(TENS[t])
//         if (o) {
//             parts.push(getGenderSpecific(o, gender))
//         }
//     }
//     return parts.join(' ')
// }

// function scaleForm(num) {
//     const lastTwo = num % 100
//     if (lastTwo >= 11 && lastTwo <= 14) return 2
//     const last = num % 10
//     if (last === 1) return 0
//     if (last >= 2 && last <= 4) return 1
//     return 2
// }

// function detectGender(unitArr) {
//     if (!unitArr) {
//         return 'm'
//     }
//     const ending = unitArr[0].slice(-1)
//     if (ending === 'а' || ending === 'я') {
//         return 'f'
//     }
//     if (ending === 'о' || ending === 'е') {
//         return 'n'
//     }
//     return 'm'
// }

// function convertNumberToRussianWords(num, unitArr) {
//     if (!Number.isSafeInteger(num) || num < 0) {
//         return null
//     }

//     let parts = []
//     let cur = num
//     let scaleIdx = 0   

//     while (cur > 0) {
//         const tri = cur % 1000
//         if (tri > 0) {
//             if (scaleIdx > 0) {
//                 const scale = SCALES[scaleIdx]
//                 const gender = scale[3]
//                 const words = triToWords(tri, gender)
//                 const formIdx = scaleForm(tri)
//                 const scaleName = scale[formIdx]
//                 parts.push(scaleName)
//                 parts.push(words)
//             } else {
//                 const gender = detectGender(unitArr)
//                 const words = triToWords(tri, gender)
//                 parts.push(words)
//             }
//         }
//         cur = Math.floor(cur / 1000)
//         scaleIdx += 1
//     }
//     parts.reverse()
//     const numStr = parts.join(' ')
//     return numStr
// }

// function selectRussianPluralForm(num, unitArr) {
//     let form
//     const lastDigit = num % 10
//     if (lastDigit === 1) {
//         form = unitArr[0]
//     } else if (lastDigit >= 2 && lastDigit <= 4) {
//         form = unitArr[1]
//     } else {
//         form = unitArr[2]
//     }
//     return form
// }

// Object.defineProperty(Number.prototype, 'toText', {
//     configurable: true,
//     writable: true,
//     value: function (unitArr) {
//         const num = this.valueOf()
//         if (num === 0) {
//             if (unitArr) {
//                 return `ноль ${unitArr[2]}`
//             }
//             return 'ноль'
//         }
//         const words = convertNumberToRussianWords(num, unitArr)
//         if (unitArr) {
//             const pluralForm = selectRussianPluralForm(num, unitArr)
//             return `${words} ${pluralForm}`
//         }
//         return words
//     }
// })
