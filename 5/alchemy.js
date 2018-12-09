const fs = require('fs');
const fsPromises = fs.promises;

(async function main() {
  try {
    const fh = await fsPromises.open('5/input.txt', 'r');
    let data = await fh.readFile({ encoding: 'utf-8', flag: 'r' });
    data = data.split('');
    console.log(`Input polymer length: ${data.length}`);

    let continueReaction = true;
    let i = 0;
    while(continueReaction) {
      // console.log(`Iteration [${i}]: ${data.join('')}`)
      continueReaction = data.reduce((pairFound, letter, idx) => {
        if(idx < data.length - 1) {
          let nextLetter = data[idx + 1];
          if( letter.toLowerCase() === nextLetter.toLowerCase()
          && (letter === letter.toLowerCase() && nextLetter === nextLetter.toUpperCase()
          || letter === letter.toUpperCase() && nextLetter === nextLetter.toLowerCase())) {
            data.splice(idx, 2);
            pairFound = true;
          }
        }
        return pairFound;
      }, false)
      i++;
    }
    // console.log(`Reaction result: ${data.join('')}`)
    console.log(`Resulting polymer length: ${data.length}`);
  } catch (e) {
    console.error(e);
  }
})()