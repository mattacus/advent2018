const fs = require('fs')
const fsPromises = fs.promises
const filename = '10/input';

fsPromises.open(filename + '.txt', 'r')
  .then(fh => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then(data => {
    let toJSON = data.split('\n').map(el => {
      let match = el.match(/<-*\s*\d*, -*\s*\d*>/g);
      if(!match) {
        throw new Error('A line did not match expected format');
      }
      match = match.map(m => JSON.parse(m.replace(/</, '[').replace(/>/, ']').replace(/\s*/g, '')));
      let [position, velocity] = match;
      
      return {
        position,
        velocity
      }
    })

    return fsPromises.writeFile(filename + '.json', JSON.stringify(toJSON))
  })
  .then(_ => {
    console.log(`Successfully created ${filename + '.json'}`)
  })
  .catch(err => console.log(err))