import {readFileSync} from 'fs'

const calculate = input => {
    const data = readFileSync(input).toString().split("\n").map(num => parseInt(num))
    const measurement = data.reduce((acc, curr) => {
        let weight = Math.max(Math.floor(curr/3) - 2, 0)
        let fuel = weight
        let newFuel = 0
        while (weight > 0) {
            newFuel = Math.max(Math.floor(weight/3) - 2, 0)
            fuel += newFuel
            weight = newFuel
        }
        return acc + fuel
    }, 0)
    return measurement
}

console.log(calculate(process.argv[2]))