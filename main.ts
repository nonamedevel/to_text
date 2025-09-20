/*
    TypeScript implementation (based on JavaScript implementation from main.js)
*/

type UnitForms = [singular: string, plural1: string, plural2: string]

function numberToRussianWords(num: number, unit?: UnitForms): string | null {
    if (!Number.isSafeInteger(num) || num <= 0) {
        return null;
    }

    const ONES = [
        'ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять',
        'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать',
        'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'
    ]
    
    const TENS = [
        '', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят',
        'семьдесят', 'восемьдесят', 'девяносто'
    ]
    
    const HUNDREDS = [
        '', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
        'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
    ]
    
    const SCALES = [
        ['', '', '', 'm'],
        ['тысяча', 'тысячи', 'тысяч', 'f'],
        ['миллион', 'миллиона', 'миллионов', 'm'],
        ['миллиард', 'миллиарда', 'миллиардов', 'm'],
        ['триллион', 'триллиона', 'триллионов', 'm'],
        ['квадриллион', 'квадриллиона', 'квадриллионов', 'm'],
    ]
    
    function getOnes(num: number, gender: string) {
        if (num === 1) {
            return gender === 'f' ? 'одна' : 'один'
        } else if (num === 2) {
            return gender === 'f' ? 'две' : 'два'
        } else {
            return ONES[num]
        }
    }
    
    function triToWords(num: number, gender: string) {
        const parts = []
        if (num === 0) {
            return []
        }
        const h = Math.floor(num / 100)
        const rem = num % 100
        if (h) {
            parts.push(HUNDREDS[h])
        }
        if (rem < 20) {
            if (rem) {
                parts.push(getOnes(rem, gender))
            }
        } else {
            const t = Math.floor(rem / 10)
            const o = rem % 10
            parts.push(TENS[t])
            if (o) {
                parts.push(getOnes(o, gender))
            }
        }
        return parts
    }
    
    function scaleForm(n: number) {
        const lastTwo = n % 100
        if (lastTwo >= 11 && lastTwo <= 14) return 2
        const last = n % 10
        if (last === 1) return 0
        if (last >= 2 && last <= 4) return 1
        return 2
    }

    let parts: string[] = []
    let cur = num
    let scaleIdx = 0

    while (cur > 0) {
        const tri = cur % 1000
        if (tri > 0) {
            const scale = SCALES[scaleIdx]
            const gender = scale[3]
            const triWords = triToWords(tri, gender)
            if (scaleIdx > 0) {
                const formIdx = scaleForm(tri)
                const scaleName = scale[formIdx]
                parts = [...triWords, scaleName, ...parts]
            } else {
                parts = [...triWords, ...parts]
            }
        }
        cur = Math.floor(cur / 1000)
        scaleIdx += 1
    }

    const numStr = parts.join(' ')

    if (unit === undefined) {
        return numStr
    }

    let form
    const lastDigit = num % 10
    if (lastDigit === 1) {
        form = unit[0]
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        form = unit[1]
    } else {
        form = unit[2]
    }
    return `${numStr} ${form}`
}

Object.defineProperty(Number.prototype, 'toText', {
    configurable: true,
    writable: true,
    value: function (unit?: UnitForms) {
        return numberToRussianWords(this.valueOf(), unit)
    }
})
