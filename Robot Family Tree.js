//https://docs.google.com/document/d/1b5MNB2Avhc1dtqOg_PLlLbHg6MaKx0jo/edit#heading=h.gjdgxs
//Part 1: This Robot data structure will be a tree, can be stored as an array.
//        [[{_id}]]

// class Robot {
//     constructor(id, value, parentNode = null) {
//         this.id = id;
//         this.parentNode = parentNode;
//         this.value = value;
//         this.childrenNode = [];
//     }

//     get isLeaf() {
//         return this.childrenNode.length === 0
//     }

//     addChildren(key, value = key) {
//         const tempNode = new Robot(key, value, this.id)
//         this.childrenNode.push(tempNode)
//     }
// }

// class RobotTree {
//     constructor(key, value = key){
//         this.root = new Robot(key, value);
//     }
// }

// let RobotSet = new RobotTree(1, 1);

// RobotSet.root.addChildren(2, 2)

// console.log(RobotSet)

class Robot {
  constructor(id, parent = null) {
    this.id = id;
    this.parent = parent;
    this.robotLevel = parent ? parent.robotLevel + 1 : 1;
    this.replicas = [];
  }

  replicate(replicaID) {
    let newReplica = new Robot(replicaID, this);
    this.replicas.push(newReplica);
    return newReplica;
  }

  communicateWithReplica() {
    this.replicas.length > 0
      ? this.replicas.forEach((rep) =>
          console.log(`${this.id} communicates with ${rep.id}`)
        )
      : console.log(`No replica for ${this.id}`);
  }

  selfDestruct() {
    if (this.parent === null) {
      console.log(`Cannot delete robot without parent`);
      return;
    }
    this.parent.replicas = this.parent.replicas.filter(
      (node) => node.id !== this.id
    );
    this.replicas.forEach((rep) => {
      rep.parent = this.parent;
      rep.robotLevel = this.parent.robotLevel + 1;
      this.parent.replicas.push(rep);
    });

    // Clear this robot's references
    this.replicas = [];
    this.parent = null;
  }

  //   level() {
  //     if (this.parent === null) return 1;
  //     return this.parent.level() + 1
  //   }
  level() {
    console.log(this.robotLevel);
  }

  lowestCommonAncestor(robot) {
    let ancesterForCurrentRobot = []
    let ancesterForTargetRobot = []
    let result
    function iterate(robot, arr = []) {
        if(robot.parent === null) return;
        if(ancesterForCurrentRobot.indexOf(robot.parent) || ancesterForTargetRobot.indexOf(robot.parent)) {
            result = robot.parent;
            return
        }
        arr.push(robot.parent)
        iterate(robot.parent, arr)
    }
    iterate(this)
    iterate(robot)
    console.log(result.id)
    return result.id
  }
}

let newRobot = new Robot(1);
let newReplica1 = newRobot.replicate(2);
let newReplica2 = newRobot.replicate(3);
let newReplica11 = newReplica1.replicate(4);
let newReplica12 = newReplica1.replicate(5);
let newReplica13 = newReplica1.replicate(6);
let newReplica21 = newReplica2.replicate(7);
let newReplica22 = newReplica2.replicate(8);
let newReplica31 = newReplica22.replicate(9);
newRobot.communicateWithReplica();
// newReplica13.level();
// newReplica1.selfDestruct();
// newRobot.communicateWithReplica();
newReplica31.level();
newReplica31.lowestCommonAncestor(newReplica13)
