const fs = require('fs')
const fsPromises = fs.promises

fsPromises.open('frequencies.txt', 'r')
  .then(fh => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then(frequencies => {
    let result = frequencies.split('\n').map(el => Number(el)).reduce((sum, el) => {return sum += el})
    console.log(result);
  })
  .catch(err => console.log(err))