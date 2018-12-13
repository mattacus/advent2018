const fs = require('fs')
const fsPromises = fs.promises

const initialGen = '####....#...######.###.#...##....#.###.#.###.......###.##..##........##..#.#.#..##.##...####.#..##.#';
const NUM_GENERATIONS = 20;

fsPromises.open('12/rules.txt', 'r')
  .then(fh => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then(data => {
    data = data.split('\n');

    let rules = data.map(line => {
      let [pattern, outcome] = line.replace(/\s/g, '').split('=>');
      return {pattern, outcome};
    })

    let currentGen = initialGen.split('');
    let origIdx = 0;
    let generations = [];

    generations.push(currentGen);

    for(let i = 0; i < NUM_GENERATIONS; i++) {

      /* dynamically resize array of pots */
      if (currentGen.indexOf('#') < 1) {  // pad left
        currentGen.unshift('.');
        currentGen.unshift('.');
        origIdx += 2;  // keep track of our original 0 index
      }
      if(currentGen.slice().reverse().indexOf('#') < 1) { // pad right
        currentGen.push('.');
        currentGen.push('.');
      }
  
      currentGen = currentGen.map((C, idx) => {
        let L1 = (idx - 1 >= 0) ? currentGen[idx - 1] : '.';
        let L2 = (idx - 2 >= 0) ? currentGen[idx - 2] : '.';
        let R1 = (idx + 1 < currentGen.length) ? currentGen[idx + 1] : '.';
        let R2 = (idx + 2 < currentGen.length) ? currentGen[idx + 2] : '.';
  
        let pattern = L2 + L1 + C + R1 + R2;
  
        for(let rule of rules) {
          if(pattern === rule.pattern) {
            return rule.outcome;
          }
        }
  
        return ".";
      })
      generations.push(currentGen);
    }
    generations.forEach((gen, idx) => {
      console.log(`Generation[${idx}]: ${gen.join('')}`)
    })

    let result = generations[20].reduce((rowSum, pot, idx) => {
      return (pot === '#') ? rowSum + idx - origIdx : rowSum;
    }, 0)
    console.log('orig idx', origIdx)
    console.log('Result: ', result)
  })
  .catch(err => console.log(err))