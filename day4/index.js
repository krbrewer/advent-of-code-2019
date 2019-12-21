import {readFileSync} from 'fs'

const numToArray = number => {
    let n = number
    let array = []
    while (n) {
        array = [n % 10, ...array]
        n = Math.floor(n/10)
    }
    return array
}

const validPasswordPart1 = number => {
    const numArray = numToArray(number)
    let double = false
    for (let i = 1; i < numArray.length; i++) {
        if (numArray[i] === numArray[i-1]) double = true
        if (numArray[i] < numArray[i-1]) return false
    }
    return double
}

const validPasswordPart2 = number => {
    const numArray = numToArray(number)
    for (let i = 0; i < numArray.length - 1; i++) {
        if (numArray[i + 1] < numArray[i]) return false
    }
    const occurances = numArray.reduce((acc, curr) => {
        if (!acc[curr]) acc[curr] = 1
        else acc[curr]++
        return acc
    }, {})
    return Object.keys(occurances).find(o => occurances[o] === 2) !== undefined
}

const data = readFileSync(process.argv[2]).toString().split('-').map(num => parseInt(num))
let passwordCount = 0

for (let i = data[0]; i <= data[1]; i++) {
    validPasswordPart2(i) && passwordCount++
}

console.log(passwordCount)
