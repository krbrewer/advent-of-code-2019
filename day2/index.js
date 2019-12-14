import {readFileSync} from 'fs'

const address0 = data => {
    let index = 0
    while (data[index] !== 99) {
        if (data[index] === 1) {
            data[data[index + 3]] = data[data[index + 1]] + data[data[index + 2]]
        } else if (data[index] === 2) {
            data[data[index + 3]] = data[data[index + 1]] * data[data[index + 2]]
        }
        index += 4
    }

    return data[0]
}

const calculatePart1 = input => {
    const data = readFileSync(input).toString().split(',').map(num => parseInt(num))
    data[1] = 12
    data[2] = 2

    return address0([...data])
}

const calculatePart2 = input => {
    const goal = 19690720
    const data = readFileSync(input).toString().split(',').map(num => parseInt(num))

    for (let i = 0; i < data.length; i++) {
        data[1] = i
        for (let j = 0; j < data.length; j++) {
            data[2] = j
            if (address0([...data]) === goal) return 100 * i + j
        }
    }
}

console.log(calculatePart2(process.argv[2]))