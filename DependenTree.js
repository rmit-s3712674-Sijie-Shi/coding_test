//https://docs.google.com/document/d/169a19TCDQWjnVxGdSBADdPA1Xc38nyNDjK2ut2hNcXo/edit
// class Package {
//     constructor(name) {
//         this.name = name;
//         this.dependencies = [];
//     }

//     addDependency(dependency) {
//         this.dependencies.push(dependency);
//     }
// }

// function buildPackageGraph(adjList) {
//     const packages = {};

//     adjList.forEach(([pkg, dep]) => {
//         if (!packages[pkg]) {
//             packages[pkg] = new Package(pkg);
//         }
//         if (!packages[dep]) {
//             packages[dep] = new Package(dep);
//         }
//         packages[pkg].addDependency(packages[dep]);
//     });

//     return packages;
// }

// Example usage
const adjacencyList = [
    ['lodash', 'underscore'],
    ['lodash', 'left-pad'],
    ['react', 'lodash'],
    ['react', 'react-dom'],
    ['react-dom', 'left-pad'],
    ['underscore', 'jquery'],
    ['left-pad', 'is-positive'],
    ['express', 'body-parser'],
    ['body-parser', 'type-is']
];

// console.log(packageGraph);

class Package {
  constructor(name) {
    this.name = name;
    this.dependencies = [];
  }

  addDependencies(dep) {
    this.dependencies.push(dep);
  }

  getDependencies() {
    return this.dependencies;
  }
}

let packageMap = new Map(); // {key: string, value: Package}
let dependencyMap = new Map(); // {key: string, value: array}

const createPackage = (arr = []) => {
/**
 * Store the map as: {
 * Key: package name,
 * Value: package node
 * }
 * if it doesn't have package node saved as a key in the package map, 
 * then create a new one, and store it in the map
 * if it doesn't have dependencies node saved as a key in the package map, 
 * then create a new one, and store it tn the map
 * 
 * then, get the value (the package node) of package, add denpendencies package node to it.
 * 
 * Create another map to store the package and its dependencies,
 * so the iteration will be O(n)
 */
  arr.map(([package, dependencies]) => {
    
    if(!packageMap.has(package)) {
        let temp = new Package(package)
        packageMap.set(package, temp)
    }
    if(!packageMap.has(dependencies)) {
        let temp = new Package(dependencies)
        packageMap.set(dependencies, temp)
    }
    packageMap.get(package).addDependencies(packageMap.get(dependencies))
    if(dependencyMap.has(package)){
        let temp = [...dependencyMap.get(package), dependencies]
        dependencyMap.set(package, temp)
    } else {
        dependencyMap.set(package, [dependencies])
    }
  });
};

createPackage(adjacencyList);

const interatePackages = (key) => {
    if(!packageMap.has(key)) return
    if(packageMap.get(key).getDependencies().length === 0) {
        console.log(packageMap.get(key))
        //return dependencyMap.get(key)
    }
    let deps = packageMap.get(key).getDependencies()
    for(let i = 0; i < deps.length; i ++){
        interatePackages(deps[i].name)
    }
}
//console.log(packageMap)
interatePackages("react")
//console.log(packageGraph)

// class Package {
//     constructor(name) {
//         this.name = name;
//         this.left = null;
//         this.right = null;
//     }

//     addDependency(dependency) {
//         if (!this.left) {
//             this.left = dependency;
//         } else if (!this.right) {
//             this.right = dependency;
//         } else {
//             console.error(`Package ${this.name} already has two dependencies.`);
//         }
//     }
// }

// function buildBinaryPackageTrees(adjList) {
//     const packages = {};

//     // Create or get a package
//     function getOrCreatePackage(name) {
//         if (!packages[name]) {
//             packages[name] = new Package(name);
//         }
//         return packages[name];
//     }

//     adjList.forEach(([pkg, dep]) => {
//         const pkgObj = getOrCreatePackage(pkg);
//         const depObj = getOrCreatePackage(dep);
//         pkgObj.addDependency(depObj);
//     });

//     // Find root packages (those that are not dependencies)
//     const dependencySet = new Set(adjList.map(([_, dep]) => dep));
//     const rootPackages = Object.values(packages).filter(pkg => !dependencySet.has(pkg.name));

//     return rootPackages;
// }

// class Package {
//     constructor(name, parent = null) {
//         this.name = name;
//         this.dependencies = [];
//         this.parent = parent
//     }

//     addDependency(dep) {
//         this.dependencies.push(dep)
//     }
// }

// const buildDependencyTree = (list = []) => {
//     let packageMap = new Map();
//     list.map(([package, dep]) => {
//         if(packageMap.has(package)) {
//             const tempMap = new Map();
//             tempMap.set(dep, null);
//             let temp = [...packageMap.get(package), tempMap]

//         }
//     })
// }


// const adjacencyList = [
//     ['lodash', 'underscore'],
//     ['lodash', 'left-pad'],
//     ['react', 'lodash'],
//     ['react', 'react-dom'],
//     ['react-dom', 'left-pad'],
//     ['underscore', 'jquery'],
//     ['left-pad', 'is-positive'],
//     ['express', 'body-parser'],
//     ['body-parser', 'type-is']
// ];


// const packageTrees = buildBinaryPackageTrees(adjacencyList);
// console.log(packageTrees);