const fs = require('fs')
const fsPromises = fs.promises

let Grid = {
  grid: [],
  initialize(size) {
    this.grid = Array.apply(null, Array(size)).map(() => {
      return Array.apply(null, Array(size)).map(() => '.');
    })
  },

  applyCoordinates(coordinates) {
    coordinates.forEach(coordinate => {
      let [x, y] = coordinate.coords;
      let { label } = coordinate;
      this.grid[y][x] = label;
    })
  },

  calculatePointDistanceToCoords(coordinates){
    this.grid = this.grid.map((row, yIdx) => {
      return row.map((point, xIdx) => {

        let distances = coordinates.map(coord => {
          let [cX, cY] = coord.coords;
          return {
            "label": coord.label,
            "distance": Math.abs(cX - xIdx) + Math.abs(cY - yIdx)
          }
        })

        let foundDuplicateMin = false;
        let minDistance = distances.reduce((min, cur) => {
          if (cur.distance === min.distance) {
            foundDuplicateMin = true;
            return cur;
          } else if (cur.distance < min.distance) {
            foundDuplicateMin = false; // if we already found a duplicate, it's no longer the min
            return cur;
          } else {
            return min;
          }
        }, {"label": undefined, "distance": Number.MAX_SAFE_INTEGER});

        return foundDuplicateMin ? "." : minDistance.label;
      })
    })
  },

  calculateLargestArea() {
    let counts = {};
    for(let y = 0; y < this.grid.length; y++){
      for(let x = 0; x < this.grid[0].length; x++){
        let point = this.grid[y][x];
        if(!counts[point]) {
          counts[point] = 1
        } else {
          counts[point] += 1;
        }
      }
    }

    counts = Object.keys(counts).map(key => {
      return {
        "label": key,
        "count": counts[key]
      }
    })

    counts = counts.filter(area => {
      let {grid} = this;
      let gridLength = grid.length -1;

      let topRow = grid[0];
      let bottomRow = grid[gridLength];
      let leftColumn = grid.reduce((col, row) => {
        col.push(row[0]);
        return col;
      }, []);
      let rightColumn = grid.reduce((col, row) => {
        col.push(row[gridLength]);
        return col;
      }, []);

      let isInfiniteArea = topRow.includes(area.label) || bottomRow.includes(area.label)
                        || leftColumn.includes(area.label) || rightColumn.includes(area.label);
      return !isInfiniteArea;
    })
    
    return Math.max(...counts.map(area => area.count))
  },

  print() {
    this.grid.forEach(row => {
      console.log(row.join(' '));
    })
  }
}

function buildLabelsASCII() {
  let labels = [];
  for(let i = 65; i < 91; i++) {
    labels.push(String.fromCharCode(i));
  }
  for (let i = 97; i < 123; i++) {
    labels.push(String.fromCharCode(i));
  }
  return labels;
}

fsPromises.open('6/coordinates.txt', 'r')
  .then(fh => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then(data => {
    let labels = buildLabelsASCII();
    data = data.split('\n');
    let inputCoordinates = data.map((tuple, index) => {
      let [x, y] = tuple.split(', ');
      x = Number(x);
      y = Number(y);
      return {
        "label": labels[index],
        "coords": [x, y]
      }
    });
    let maxX = data.map(tuple => Number(tuple.split(', ')[0]))
              .reduce((max, cur) => (cur > max ? cur : max), 0);
    let maxY = data.map(tuple => Number(tuple.split(', ')[1]))
              .reduce((max, cur) => (cur > max ? cur : max), 0);
    let gridSize = Math.max(maxX, maxY) + 1;

    Grid.initialize(gridSize);
    Grid.applyCoordinates(inputCoordinates);
    Grid.calculatePointDistanceToCoords(inputCoordinates);
    // Grid.print();
    let largestArea = Grid.calculateLargestArea();
    console.log('Largest area: ', largestArea);

  })
  .catch(err => console.log(err))