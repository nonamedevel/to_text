/*
    Number type
*/
function test1() {
    console.log(typeof 42)
    console.log(typeof 0)
    console.log(typeof 3.14)
    console.log(typeof -5)
    console.log(typeof 1e6)
    console.log(typeof Infinity)
    console.log(typeof 9007199254740992) // Number.MAX_SAFE_INTEGER + 1
}

/*
    We are interested only in positive integers
    (null is used instead of throwing an error to simplify testing)
*/
function test1() {
    function toText(num) {
        // if (!Number.isFinite(num)) {
        //     return null
        // }
        // if (!Number.isInteger(num)) {
        //     return null
        // }
        if (!Number.isSafeInteger(num)) {
            return null
        }
        if (num <= 0) {
            return null
        }
        return num.toString()
    }
    console.log(toText(42))
    console.log(toText(1e6))
    console.log(toText(1.5e6))
    console.log(toText(0))
    console.log(toText(-5))
    console.log(toText(3.14))
    console.log(toText(Infinity))
    console.log(toText(9007199254740992))
}

/*
    We can define a function on the Number prototype if necessary
*/
function test1() {
    Object.defineProperty(Number.prototype, 'toText', {
        configurable: true,
        writable: true,
        value: function () {
            console.log(this)
            console.log(this.valueOf())
            return 'one hundred'
        }
    })
    console.log((100).toText())
}

/*
    The algorithm
    
    There are faster alternatives,
    but they are more complex and it only makes sense to use them 
    in performance-critical code
*/
function test1() {
    function toText(num) {
        if (!Number.isSafeInteger(num) || num <= 0) {
            return null
        }
        const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const parts = []
        let cur = num
        while (cur > 0) {
            let d = cur % 10
            parts.push(DIGITS[d])
            cur = Math.floor(cur / 10)
        }
        // parts.reverse()
        // return parts.join('')

        let result = ''
        for (let i = parts.length - 1; i >= 0; i--) {
            result += parts[i]
        }
        return result
    }
    console.log(toText(42))
    console.log(toText(1e6))
    console.log(toText(1.5e6))
    console.log(toText(0))
    console.log(toText(-5))
    console.log(toText(3.14))
    console.log(toText(Infinity))
    console.log(toText(9007199254740992))
}

/*
    Add unit
*/
function test() {
    function toText(num, unit) {
        if (!Number.isSafeInteger(num) || num <= 0) {
            return null
        }
        const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const parts = []
        let cur = num
        while (cur > 0) {
            let d = cur % 10
            parts.push(DIGITS[d])
            cur = Math.floor(cur / 10)
        }
        let numStr = ''
        for (let i = parts.length - 1; i >= 0; i--) {
            numStr += parts[i]
        }
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
    console.log(toText(42))
    console.log(toText(1e6))
    console.log(toText(1.5e6))
    console.log(toText(0))
    console.log(toText(-5))
    console.log(toText(3.14))
    console.log(toText(Infinity))
    console.log(toText(9007199254740992))

    console.log(toText(1, ['рубль', 'рубля', 'рублей']))
    console.log(toText(10, ['сообщение', 'сообщения', 'сообщений']))
    console.log(toText(23, ['яблоко', 'яблока', 'яблок']))
}

test()
