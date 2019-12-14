import { readFile } from 'fs';
readFile('input.txt', (err, data) => {
    if (err) throw err;
    var array = data.toString().split("\n");
    for (i in array) {
        console.log(array[i]);
    }
})