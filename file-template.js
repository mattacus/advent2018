const fs = require('fs')
const fsPromises = fs.promises

fsPromises.open('<filename>.txt', 'r')
  .then(fh => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then(data => {
    console.log(data.split('\n'))
  })
  .catch(err => console.log(err))