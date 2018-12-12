const SERIAL = 2187;

function gridBuilder() {
  let grid = [];
  for(let y = 0; y < 300; y++) {
    let row = [];
    for(let x = 0; x < 300; x++) {
      let rackID = (x+1)+10;
      let powLvl = rackID * (y+1);
      powLvl += SERIAL;
      powLvl *= rackID;
      let hundreds = (powLvl.toString().length > 3) ? 
                      Number(powLvl.toString().slice(-3)[0]) : 0;
      powLvl = hundreds - 5;
      row[x] = powLvl;
    }
    grid.push(row);
  }

  return grid;
}

function gridPrinter(grid) {
  grid.forEach(row => {
    row = row.map(num => {
      let str = num.toString()
      if(str.slice(0,1) !== '-'){
        return ' '.concat(str);
      } else {
        return str;
      }
    })
    console.log(row.join('\t'));
  })
}

function findLargestWindow(grid) {
  let max = 0;
  let maxLoc = [0, 0];
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      let c = grid[y][x];
      let tl = grid[y-1][x-1];
      let t = grid[y-1][x];
      let tr = grid[y-1][x+1];
      let l = grid[y][x-1];
      let r = grid[y][x+1];
      let bl = grid[y+1][x-1];
      let b = grid[y+1][x];
      let br = grid[y+1][x+1];
      
      let sum = c + tl + t + tr + l + r + bl + b + br;
      if(sum > max) {
        max = sum;
        maxLoc = [x, y];
      }
    }
  }
  return {
    max,
    maxLoc
  }
}

let fuelCellGrid = gridBuilder();
// gridPrinter(fuelCellGrid);
let maxResults = findLargestWindow(fuelCellGrid);
console.log('Max results: ', maxResults);
