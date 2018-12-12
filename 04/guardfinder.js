const fs = require('fs')
const fsPromises = fs.promises

fsPromises.open('4/guards.txt', 'r')
  .then(fh => {
    return fh.readFile({ encoding: 'utf-8', flag: 'r' });
  })
  .then(data => {
    let guardList = new Set();
    let formatted = data.split('\n').map(entry => {
      let timestamp = entry.match(/\[.*\]/);
      let guard = entry.match(/Guard #[0-9]+/);
      let event;
      if(guard) {
        guardList.add(guard[0]);
        event = entry.slice(guard.index + guard[0].length).trim();
      } else {
        event = entry.slice(timestamp.index + timestamp[0].length).trim();
      }
      return {
        timestamp: timestamp[0].slice(1, timestamp[0].length -1),
        guard: (guard ? guard[0] : undefined),
        event
      }
    })
    let sorted = formatted.sort(function (o1, o2) {
      return new Date(o1.timestamp) - new Date(o2.timestamp)
    })
    guardList = Array.from(guardList);
    guardList = guardList.map(guard => {
      let guardEvents = [];
      sorted.forEach((event, index) => {
        if(event.guard === guard){
          guardEvents.push(event)
          let i = index + 1;
          while(i < sorted.length && !sorted[i].guard) {
            guardEvents.push(sorted[i]);
            i++;
          }
        }
      })
      return {
        name: guard,
        guardEvents
      }
    })

    let sleepTimes = guardList.map(guard => {
      let {guardEvents} = guard;
      let minutes = {};
      let time = guardEvents.reduce((total, event, index) => {
        if (event.event === "begins shift"){
          let i = index + 1;
          while (i < guardEvents.length && guardEvents[i].event !== "begins shift") {
            let start = Number(guardEvents[i].timestamp.slice(-2));
            let end = Number(guardEvents[i+1].timestamp.slice(-2));
            for(let i = start; i <= end; i++) {
              minutes[i] = minutes[i] ? (minutes[i] + 1) : 1;
            }
            total += (end - start);
            i += 2;
          }
        }
        return total;
      }, 0)
      return {
        name: guard.name,
        timeAsleep: time,
        minutes
      }
    })
    let longest = Math.max(...sleepTimes.map(el => el.timeAsleep));
    let longestGuard = sleepTimes.filter(el => el.timeAsleep === longest)[0];
    console.log('Longest guard sleeper & time: ', longestGuard);
  })

  .catch(err => console.log(err))