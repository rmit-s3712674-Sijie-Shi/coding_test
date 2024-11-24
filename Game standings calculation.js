//https://docs.google.com/document/d/1mB5v-b3euLd4gdkfj43bI9EeFjww_PTB/edit#heading=h.gjdgxs
const players = [
  { name: "Mike", animals: { Cows: 10, Pigs: 0 } },
  { name: "Alex", animals: { Cows: 7, Pigs: 1 } },
  { name: "Tess", animals: { Cows: 7, Pigs: 1 } },
  { name: "Rocky", animals: { Cows: 7, Pigs: 1 } },
];

let animalTypes = {
  Cows: "Cows",
  Pigs: "Pigs",
};

class Pig {
    constructor(name, count){
        this.name = name;
        this.count = -count;
        this.score = 0;
    }
}

class Cow {
    constructor(name, count){
        this.name = name;
        this.count = count;
        this.score = 0;
    }

    calculateScore(){
        this.score = this.count % 2 === 0 ? this.score + 1 : this.score
    }
}

const customScoring = {
  Cows: (count) => (count % 2 === 0 ? 1 : 0), // Extra point for even number of cows
  Pigs: (count) => -count, // Score based on fewest pigs (negative count to reverse sorting)
};

const calculateScore = (arr = []) => {
  let result = {};
  const users = userParser(arr);
  //console.log(users);
  for (const type in animalTypes) {
    let length = users[type].length;
    // users[type].forEach((element, index) => {
    //   const score = length - index;
    //   if (result[element.name]) {
    //     result[element.name] += score;
    //   } else {
    //     result[element.name] = score;
    //   }
    // });
    for (let i = 0; i < length; i++) {
      let start = i;
      let end = i;
      while (
        end < length - 1 &&
        users[type][end + 1].count === users[type][start].count
      ) {
        end++;
      }
      const points = (length - start + length - end) / 2;

      for (let j = start; j <= end; j++) {
        users[type][j].score += points
        users[type][j].calculateScore && users[type][j].calculateScore()
        console.log(users[type][j], users[type][j].score)
        if (result[users[type][j].name]) {
            result[users[type][j].name] += users[type][j].score;
          } else {
            result[users[type][j].name] = users[type][j].score;
          }
      }
      i = end;
    }
  }
  console.log(result);
  return result;
};

/**
 * edit user structure
 * { 
 *  Cows: [ Mike: 3, Alex: 5, Tess: 4 ],
    Pigs: [ Mike: 2, Alex: 1, Tess: 4 } 
    }
 */
const userParser = (arr = []) => {
  let result = {};
  for (const type in animalTypes) {
    result[type] = [];
  }
  arr.map((user) => {
    let newCow = new Cow(user.name, user.animals[animalTypes.Cows])
    result[animalTypes.Cows].push(newCow);
    let newPig = new Pig(user.name, user.animals[animalTypes.Pigs])
    result[animalTypes.Pigs].push(newPig);
  });
  result = sortUsers(result);
  return result;
};

const sortUsers = (data = {}) => {
  let result = {};
  for (const animal in data) {
    if (data.hasOwnProperty(animal)) {
      result[animal] = data[animal].sort((a, b) => b.score - a.score);
    }
  }
  //console.log(result)
  return result;
};

calculateScore(players);

// const calculate = () => {
//     let users = {
//         Cows: [],
//         Pigs: []
//     }
//     players.forEach(player => {
//         users.Cows.push({
//             name: player.name,
//             count: player.animals.Cows
//         })
//         users.Pigs.push({
//             name: player.name,
//             count: player.animals.Pigs
//         })
//     })
//     users.Cows = users.Cows.slice().sort((a,b) =>
//         b.count - a.count
//     )
//     users.Pigs = users.Pigs.slice().sort((a,b) =>
//         b.count - a.count
//     )
//     let result = {}
//     users.Cows.forEach((user, index) => {
//         result[user.name] = users.Cows.length - index
//     })
//     users.Pigs.forEach((user, index) => {
//         result[user.name] += users.Pigs.length - index
//     })
//     console.log(result)
// }

//calculate()
