const fs = require('fs');
const fsPromises = fs.promises;

let instructions = [
  'addr',
  'addi',
  'mulr',
  'muli',
  'banr',
  'bani',
  'borr',
  'bori',
  'setr',
  'seti',
  'gtir',
  'gtri',
  'gtrr',
  'eqir',
  'eqre',
  'eqrr'
];

let testInstructions = (reg, instr, a, b, c) => {
  let res = reg.slice(); // copy reg so we don't mutate it yet

  let ops = {
    addr: () => {
      res[c] = res[a] + res[b];
    },
    addi: () => {
      res[c] = res[a] + b;
    },
    mulr: () => {
      res[c] = res[a] * res[b];
    },
    muli: () => {
      res[c] = res[a] * b;
    },
    banr: () => {
      res[c] = res[a] & res[b];
    },
    bani: () => {
      res[c] = res[a] & b;
    },
    borr: () => {
      res[c] = res[a] | res[b];
    },
    bori: () => {
      res[c] = res[a] | b;
    },
    setr: () => {
      res[c] = res[a];
    },
    seti: () => {
      res[c] = a;
    },
    gtir: () => {
      res[c] = a > res[b] ? 1 : 0;
    },
    gtri: () => {
      res[c] = res[a] > b ? 1 : 0;
    },
    gtrr: () => {
      res[c] = res[a] > res[b] ? 1 : 0;
    },
    eqir: () => {
      res[c] = a === res[b] ? 1 : 0;
    },
    eqre: () => {
      res[c] = res[a] === b ? 1 : 0;
    },
    eqrr: () => {
      res[c] = res[a] === res[b] ? 1 : 0;
    }
  };

  ops[instr](); // execute function at instruction key

  return res;
};

function main(input) {
  let samples = input.match(/Before: .*\n.*\n.*/gm);
  samples = samples.map((sample) => {
    let lines = sample.split('\n');
    if (lines.length) {
      lines = lines.map((line) => {
        line = line
          .replace(/[,]/g, '')
          .match(/[0-9]\s[0-9]\s[0-9]\s[0-9]/)[0]
          .replace(/[\s]/g, '')
          .split('');
        return line.map((char) => Number(char));
      });
    }
    return {
      before: lines[0],
      op: lines[1],
      after: lines[2]
    };
  });

  let opCount = 0;
  let threeMoreCount = 0;

  samples.forEach((sample) => {
    let { before, op, after } = sample;
    instructions.forEach((instruction) => {
      let result = testInstructions(before, instruction, op[1], op[2], op[3]);
      if (after.join('') === result.join('')) {
        opCount++;
      }
    });
    if (opCount >= 3) {
      threeMoreCount++;
    }
    opCount = 0;
  });

  console.log('Number of 3 or more: ', threeMoreCount);
}

fsPromises
  .open('16/input.txt', 'r')
  .then((fh) => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then((data) => {
    main(data);
  })
  .catch((err) => console.log(err));
