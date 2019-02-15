const fs = require('fs');
const fsPromises = fs.promises;

fsPromises
  .open('<filename>.txt', 'r')
  .then((fh) => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then((data) => {
    main(data.split('\n'));
  })
  .catch((err) => console.log(err));

function main(input) {}
