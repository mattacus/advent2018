const fs = require('fs');
const fsPromises = fs.promises;

let Instructions = {
  allSteps: new Set(),
  stepList: [],

  initialize(inputList) {
    this.stepList = inputList.map((el) => {
      let steps = el.match(/ [A-Z] /gi);
      let [requirementStep, targetStep] = steps.map((step) => step.trim());
      this.allSteps.add(requirementStep);
      this.allSteps.add(targetStep);
      return { requirementStep, targetStep };
    });
  },

  _findStep(fromList) {
    return [...this.allSteps].reduce((foundSteps, current) => {
      if (!fromList.includes(current)) {
        foundSteps.push(current);
        return foundSteps;
      } else {
        return foundSteps;
      }
    }, []);
  },

  getFirstStep() {
    return this._findStep(this.stepList.map((pair) => pair.targetStep));
  },

  getLastStep() {
    return this._findStep(this.stepList.map((pair) => pair.requirementStep));
  },

  getAvailableSteps(fromStep) {
    return this.stepList
      .filter((step) => step.requirementStep === fromStep)
      .map((filtered) => filtered.targetStep);
  },

  hasCompletedRequirements(toStep, takenSteps) {
    let requirements = this.stepList
      .filter((step) => step.targetStep === toStep)
      .map((step) => step.requirementStep);

    for (let requirement of requirements) {
      if (!takenSteps.includes(requirement)) return false;
    }
    return true;
  }
};

fsPromises
  .open('7/steps.txt', 'r')
  .then((fh) => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then((data) => {
    Instructions.initialize(data.split('\n'));
    let lastStep = Instructions.getLastStep()[0];
    let startingSteps = Instructions.getFirstStep().sort();
    let currentStep = startingSteps.shift();
    let stepsTaken = [];
    let availableSteps = startingSteps.slice();

    while (currentStep !== lastStep) {
      // update steps taken
      stepsTaken.push(currentStep);
      // get possible steps to take, from the current step
      let possibleSteps = Instructions.getAvailableSteps(currentStep);
      // add to available, make sure not to add any duplicates
      possibleSteps.forEach((step) => {
        if (!availableSteps.includes(step)) {
          availableSteps.push(step);
        }
      });
      availableSteps.sort();

      // determine next step to take
      let found = false;
      for (let i = 0; i < availableSteps.length; i++) {
        if (
          Instructions.hasCompletedRequirements(availableSteps[i], stepsTaken)
        ) {
          currentStep = availableSteps[i];
          availableSteps = availableSteps.filter(
            (step) => step !== currentStep
          );
          found = true;
          break;
        }
      }
      if (!found) {
        throw new Error(
          `No available steps found to take after ${currentStep}`
        );
      }
    }
    // add final step
    stepsTaken.push(currentStep);

    console.log('Step order is: ', stepsTaken.join(''));
  })
  .catch((err) => console.log(err));
