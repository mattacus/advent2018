let startingState = {
  elfPicks: [0, 1],
  scores: [3, 7]
};

let NUM_RECIPES = 824501;

let nextState = (inputState) => {
  let { elfPicks, scores } = inputState;
  let [elf1, elf2] = elfPicks;

  // combine recipes
  let scoreSum = scores[elf1] + scores[elf2];
  let sumDigits = scoreSum
    .toString()
    .split('')
    .map((numStr) => Number(numStr));
  scores = scores.concat(sumDigits);

  // step through scoreboard
  elf1 = (elf1 + scores[elf1] + 1) % scores.length;
  elf2 = (elf2 + scores[elf2] + 1) % scores.length;

  return {
    elfPicks: [elf1, elf2],
    scores
  };
};

let currentState = startingState;
console.log(
  `Current State: ${currentState.scores.join(' ')}, picks: ${
    currentState.elfPicks
  }`
);

let iterations = 0;
while (currentState.scores.length <= NUM_RECIPES + 10) {
  currentState = nextState(currentState);
  iterations++;
}

let nextTen = currentState.scores
  .slice(NUM_RECIPES)
  .slice(0, 10)
  .join('');

console.log(`After ${NUM_RECIPES}: ${nextTen}`);
console.log('Iterations', iterations);
