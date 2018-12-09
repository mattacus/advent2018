const fs = require('fs')
const fsPromises = fs.promises

fsPromises.open('2/ids.txt', 'r')
  .then(fh => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then(data => {
    console.log(checksum(data.split('\n')))
  })
  .catch(err => console.log(err))

let checksum = (input) => {
  let twoCount = 0;
  let threeCount = 0;
  input.forEach(id => {
    let foo = id.split('').reduce((acc, cur) => {
      acc[cur] = acc[cur] ? (acc[cur] + 1) : 1;
      return acc;
    }, {})

    let hasTwo = false;
    let hasThree = false;
    Object.keys(foo).forEach((key) => {
      if (foo[key] === 2 && !hasTwo) {
        twoCount++;
        hasTwo = true;
      } else if (foo[key] === 3 && !hasThree) {
        threeCount++;
        hasThree = true;
      }
    })
  })
  return (twoCount * threeCount);
}