// const [np, nt] = process.argv.slice(2,4);
const [np, nt] = [10, 1618];
const { CLinkedList } = require('./linkedlist');

let Game = {
  numPlayers: np,
  lastMarble: nt,
  marbles: CLinkedList(),

  runSimulation() {
    let currentMarble = null;
    for (let i = 0; i <= this.lastMarble; i++) {
      // first marble - just insert
      if (i === 0) {
        this.marbles.addToHead(i);
        currentMarble = this.marbles.head;
      } else {
        // Todo
      }
    }
  }
};

Game.runSimulation();

console.log('done');
