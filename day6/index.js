import {readFileSync} from 'fs'

const recursePart1 = (orbitMap, root, depth) => {
    let totalOrbits = 0
    if (orbitMap[root]) {
        orbitMap[root].orbittedBy.forEach(child => {
            totalOrbits += recursePart1(orbitMap, child, depth + 1)
        })
    } 
    return totalOrbits + depth
}

const recursePart2 = (orbitMap, root, paths) => {
    if (!orbitMap[root]) {
        return [...paths, root]
    }

    const updatedPaths = orbitMap[root].orbittedBy.map(o => {
        const oPaths = recursePart2(orbitMap, o, paths)
        return oPaths.map(p => `${root})${p}`)
    }).flat()

    return updatedPaths
}

const calculatePart1 = input => {
    const data = readFileSync(input).toString().split('\n')
    const orbitMap = data.reduce((acc, curr) => {
        const orbit = curr.split(')')
        if (!acc[orbit[0]]) acc[orbit[0]] = {orbittedBy: []}
        acc[orbit[0]].orbittedBy.push(orbit[1])
        return acc
    }, {})
    const orbitCount = recursePart1(orbitMap, 'COM', 0)
    return orbitCount
}

const calculatePart2 = input => {
    const data = readFileSync(input).toString().split('\n')
    const orbitMap = data.reduce((acc, curr) => {
        const orbit = curr.split(')')
        if (!acc[orbit[0]]) acc[orbit[0]] = {orbittedBy: []}
        acc[orbit[0]].orbittedBy.push(orbit[1])
        return acc
    }, {})
    const orbitLeaves = recursePart2(orbitMap, 'COM', [])
    const youPath = orbitLeaves.find(l => l.match('YOU')).split(')')
    const santaPath = orbitLeaves.find(l => l.match('SAN')).split(')')
    let i = 0
    while (youPath[i] === santaPath[i]) i++
    const baseRoot = youPath[i - 1]
    const distance = youPath.length + santaPath.length - (2 * (i + 1))
    return distance
}

console.log(calculatePart2(process.argv[2]))
