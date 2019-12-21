import {readFileSync} from 'fs'

const convertOpCode = num => {
    let number = num
    let opCode = []
    for (let i = 0; i < 5; i++) {
        opCode = [number%10, ...opCode]
        number = Math.floor(number/10)
    }
    return opCode
}

const calculate = input => {
    const data = readFileSync(input).toString().split(',').map(num => parseInt(num))
    let index = 0
    let currentOpCode = convertOpCode(data[index])
    const inputNum = 5

    while (currentOpCode[3] !== 9 && currentOpCode[4] !== 9) {
        if (currentOpCode[4] === 1) {
            data[data[index + 3]] = data[currentOpCode[2] === 0 ? data[index + 1] : index + 1] + data[currentOpCode[1] === 0 ? data[index + 2] : index + 2]
            index += 4
        } else if (currentOpCode[4] === 2) {
            data[data[index + 3]] = data[currentOpCode[2] === 0 ? data[index + 1] : index + 1] * data[currentOpCode[1] === 0 ? data[index + 2] : index + 2]
            index += 4
        } else if (currentOpCode[4] === 3) {
            data[data[index + 1]] = inputNum
            index += 2
        } else if (currentOpCode[4] === 4) {
            console.log('Output:', data[currentOpCode[2] === 0 ? data[index + 1] : index + 1])
            index += 2
        } else if (currentOpCode[4] === 5) {
            if (data[currentOpCode[2] === 0 ? data[index + 1] : index + 1] !== 0) index = data[currentOpCode[1] === 0 ? data[index + 2] : index + 2]
            else index += 3
        } else if (currentOpCode[4] === 6) {
            if (data[currentOpCode[2] === 0 ? data[index + 1] : index + 1] === 0) index = data[currentOpCode[1] === 0 ? data[index + 2] : index + 2]
            else index += 3
        } else if (currentOpCode[4] === 7) {
            data[data[index + 3]] = (data[currentOpCode[2] === 0 ? data[index + 1] : index + 1] < data[currentOpCode[1] === 0 ? data[index + 2] : index + 2]) ? 1 : 0
            index += 4
        } else if (currentOpCode[4] === 8) {
            data[data[index + 3]] = (data[currentOpCode[2] === 0 ? data[index + 1] : index + 1] === data[currentOpCode[1] === 0 ? data[index + 2] : index + 2]) ? 1 : 0
            index += 4
        }
        currentOpCode = convertOpCode(data[index])
    }
}

// console.log(convertOpCode(1))

console.log(calculate(process.argv[2]))