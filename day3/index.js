import {readFileSync} from 'fs'

const pathFinder = data => {
    const path = data.reduce((acc, step) => {
        const direction = step[0]
        const distance = parseInt(step.substring(1))
        
        if (direction === 'U') {
            if (!acc[acc.curr[0]]) acc[acc.curr[0]] = []
            for (let i = 0; i <= distance; i++) {
                if (!acc[acc.curr[0]].find(x => x[0] === acc.curr[1] + i)) acc[acc.curr[0]].push([acc.curr[1] + i, acc.stepCount])
                acc.stepCount++
            }
            acc.curr[1] += distance
        } else if (direction === 'D') {
            if (!acc[acc.curr[0]]) acc[acc.curr[0]] = []
            for (let i = 0; i <= distance; i++) {
                if (!acc[acc.curr[0]].find(x => x[0] === acc.curr[1] - i)) acc[acc.curr[0]].push([acc.curr[1] - i, acc.stepCount])
                acc.stepCount++
            }
            acc.curr[1] -= distance
        } else if (direction === 'L') {
            for (let i = 0; i <= distance; i++) {
                if (!acc[acc.curr[0] - i]) acc[acc.curr[0] - i] = []
                if (!acc[acc.curr[0] - i].find(x => x[0] === acc.curr[1])) acc[acc.curr[0] - i].push([acc.curr[1], acc.stepCount])
                acc.stepCount++
            }
            acc.curr[0] -= distance
        } else {
            for (let i = 0; i <= distance; i++) {
                if (!acc[acc.curr[0] + i]) acc[acc.curr[0] + i] = []
                if (!acc[acc.curr[0] + i].find(x => x[0] === acc.curr[1])) acc[acc.curr[0] + i].push([acc.curr[1], acc.stepCount])
                acc.stepCount++
            }
            acc.curr[0] += distance
        }
        // Account for next direction finding the last step of previous direction first
        acc.stepCount--
        return acc
    }, {curr: [0,0], stepCount: 0, 0: []})

    const {curr, stepCount, ...pathWithoutCurr} = path
    return pathWithoutCurr
}

const findIntersections = (path1, path2) => {
    const intersections = Object.keys(path1).reduce((acc, curr) => {
        acc[curr] = path1[curr].filter(x => path2[curr] && path2[curr].find(y => y[0] === x[0])).map(x => x[0])
        if (!acc[curr].length) delete acc[curr]
        return acc
    }, {})
    if (intersections['0'].length > 1){
        delete intersections['0'][0]
    } else {
        delete intersections['0']
    }

    return intersections
}

const calculatePart1 = input => {
    const data = readFileSync(input).toString().split('\n').map(steps => steps.split(','))
    const path1 = pathFinder(data[0])
    const path2 = pathFinder(data[1])
    
    const intersection = findIntersections(path1, path2)
    
    const manhattanDistances = Object.keys(intersection).reduce((acc, curr) => {
        acc.push([...intersection[curr]].map(y => Math.abs(curr) + Math.abs(y)))
        return acc.flat()
    }, [])
    return Math.min(...manhattanDistances)
}

const calculatePart2 = input => {
    const data = readFileSync(input).toString().split('\n').map(steps => steps.split(','))
    const path1 = pathFinder(data[0])
    const path2 = pathFinder(data[1])

    const intersection = findIntersections(path1, path2)
    
    const stepLengths = Object.keys(intersection).reduce((acc, curr) => {
        const path1IntersectionLengths = path1[curr].filter(x => intersection[curr].includes(x[0])).sort((a, b) => a < b ? -1 : 1).map(x => x[1])
        const path2IntersectionLengths = path2[curr].filter(x => intersection[curr].includes(x[0])).sort((a, b) => a < b ? -1 : 1).map(x => x[1])
        acc.push(path1IntersectionLengths.map((x, idx) => x + path2IntersectionLengths[idx]))
        return acc
    }, []).flat()

    return Math.min(...stepLengths)
}

console.log(calculatePart2(process.argv[2]))