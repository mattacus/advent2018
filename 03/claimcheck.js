const fs = require('fs');
const fsPromises = fs.promises;

class Fabric {
  constructor(size) {
    this.fabric = Array.apply(null, Array(size)).map(() => {
      return Array.apply(null, Array(size)).map(() => '.');
    });
  }

  print() {
    this.fabric.forEach((row) => {
      console.log(row.join(' '));
    });
  }

  addClaimToFabric(claim) {
    let [id, , pos, size] = claim.split(' ');
    let [r, c] = pos
      .slice(0, -1)
      .split(',')
      .map((el) => Number(el));
    let [rLen, cLen] = size.split('x').map((el) => Number(el));

    for (let row = r; row < r + rLen; row++) {
      for (let col = c; col < c + cLen; col++) {
        let fabricTile = this.fabric[row][col];
        if (fabricTile === '.') {
          this.fabric[row][col] = '0';
        } else if (fabricTile === '0') {
          this.fabric[row][col] = 'X';
        }
      }
    }
  }

  countOverlaps() {
    return this.fabric.reduce((sum, row) => {
      sum += row.reduce((sum, el) => {
        if (el === 'X') {
          sum++;
        }
        return sum;
      }, 0);
      return sum;
    }, 0);
  }
}

fsPromises
  .open('3/claims.txt', 'r')
  .then((fh) => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then((data) => {
    data = data.split('\n');
    let elfFabric = new Fabric(1000);
    data.forEach((claim) => elfFabric.addClaimToFabric(claim));
    // elfFabric.print();
    console.log(elfFabric.countOverlaps());
  })
  .catch((err) => console.log(err));
