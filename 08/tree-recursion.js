const fs = require('fs');
const fsPromises = fs.promises;

fsPromises
  .open('8/input.txt', 'r')
  .then((fh) => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then((data) => {
    data = data.split(' ').map((char) => Number(char));
    let result = sumMetadata(data);
    console.log('Metadata sum: ', result);
  })
  .catch((err) => console.log(err));

function sumMetadata(inputTree) {
  let metaSum = 0;

  function treeRecurse(tree) {
    while (tree.length > 0) {
      let childNodes = tree.shift();
      let metaLength = tree.shift();

      // recurse
      if (childNodes !== 0) {
        for (let i = 0; i < childNodes; i++) {
          treeRecurse(tree);
        }
      }
      // base
      tree.splice(0, metaLength).forEach((el) => (metaSum += el));
      return;
    }
  }

  treeRecurse(inputTree);
  return metaSum;
}
