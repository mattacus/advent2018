const fs = require('fs')
const fsPromises = fs.promises

fsPromises.open('frequencies.txt', 'r')
  .then(fh => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then(frequencies => {
    let nums = frequencies.split('\n').map(el => Number(el));
    let sums = {};
    let duplicate = false;
    let i = 0;
    let sum = 0;
    while(!duplicate) {
      sum += nums[i];
      console.log(sum, nums[i], i)
      // console.log(sum)
      if(isNaN(sum)) {
        break;
      }
      if (sums[sum]){
        duplicate = true;
        console.log('Found! ', sum);
      } else {
        sums[sum] = sum;
      }
      i = (i < nums.length - 1) ? (i + 1) : 0;
    }
  })
  .catch(err => console.log(err))