// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro, markerZb;

var baseOffset = 0;
var actors = [];

// 2D array of tile positions -- FIX
var xyzArray = [
                    [-1, 0, -1], // index 0 tile
                    [-1, 0, 1], // index 1 tile
                    [1, 0, 1], // index 2 tile
                    [1, 0, -1] // index 3 tile
                ];

function setup() {
    world = new World('ARScene');
    var xOffset = 0;
    var zOffset = 0;

    marker1 = world.getMarker('hiro');
    marker2 = world.getMarker('zb'); 
    marker3 = world.getMarker('kanji'); 
    marker4 = world.getMarker('nyu'); 

    var previousGameState = window.localStorage.getItem("previousGameState");
    
    if (!previousGameState){
        console.log("starting new game");

        markerMountain = new markerOBJ(marker1);
        markerMountain.addTile("Mountain");

        markerWater = new markerOBJ(marker2);
        markerWater.addTile("Water");

        markerRF = new markerOBJ(marker3);
        markerRF.addTile("Rainforest");

        markerDesert = new markerOBJ(marker4);
        markerDesert.addTile("Desert");

        window.localStorage.setItem("previousGameState", "saved");
        window.localStorage.setItem("marker1", "Mountain");
        window.localStorage.setItem("marker2", "Water");
        window.localStorage.setItem("marker3", "Rainforest");
        window.localStorage.setItem("marker4", "Desert");

    } else {

        console.log("loading previous game");
        
        markerMountain = new markerOBJ(marker1);
        markerWater = new markerOBJ(marker2);
        markerRF = new markerOBJ(marker3);
        markerDesert = new markerOBJ(marker4);

        var previousM1 = window.localStorage.getItem("marker1");
        var previousM2 = window.localStorage.getItem("marker2");
        var previousM3 = window.localStorage.getItem("marker3");
        var previousM4 = window.localStorage.getItem("marker4");

        var m1Scenes = previousM1.split(',');
        for (let i = 0; i < m1Scenes.length; i++){

            // mountain
            if (m1Scenes[i] === "Water") {
                markerMountain.addTile("Water");
            } else if(m1Scenes[i] === "Rainforest"){
                markerMountain.addTile("Rainforest");
            } else if (m1Scenes[i] === "Desert"){
                markerMountain.addTile("Desert");
            } else if (m1Scenes[i] === "Mountain") {
                markerMountain.addTile("Mountain");
            }

        }
        
        // duplicate code for M1 scenes to the other markers

        // water

        // rf

        // desert

    }

    

    allMarkers = [markerMountain, markerWater, markerRF, markerDesert];

}


function draw() {
  // erase the background
  world.clearDrawingCanvas();

    // move jellies
    for (let k = 0; k < actors.length; k++){
        actors[k].move();
    }

    var newMarker = findNewMarker();

    if (newMarker !== null){

        var toAdd = newMarker.myTiles[0];
        var presentTiles = findVisibleMarkers();

        for (let j = 0; j < presentTiles.length; j++){

            if (!presentTiles[j].myTiles.includes(toAdd)){
                presentTiles[j].addTile(toAdd); // adding newly entered tile to the tiles of present markers
            }

            if (!newMarker.myTiles.includes(presentTiles[j].myTiles[0])){
                newMarker.addTile(presentTiles[j].myTiles[0]); // add present tiles to newly displayed tile
            }
        }

    }
    
    for (var i = 0; i < allMarkers.length; i++){

        if (allMarkers[i].marker.isVisible() == true){
            allMarkers[i].inPreviousFrame = true;
        } else {
            allMarkers[i].inPreviousFrame = false;
        }
    }

}

class Mountain{
    
    constructor(x, y, z){
        this.container = new Container3D({x: x, y: y, z: z});
        console.log("Mountain: ", x, y, z)

        this.container.addChild(new Box({
            x: 0, y:0, z: 0,
            height: 2, width: 2, depth: 0.5,
            rotationX:-90,
            red: 148, green: 184, blue: 184
        }));

        return this.container;
    }
}

class Desert{
    
    constructor(x, y, z){
       
        this.container = new Container3D({x: x, y: y, z: z});
        console.log("Desert: ", x, y, z)


        this.container.addChild( new Box({
            x: 0, y: 0, z: 0,
            height: 2, width: 2, depth: 0.5,
            rotationX:-90,
            red: 210, green: 180, blue: 140
        }));

        this.container.addChild(new Cacti());
        
        return this.container;
    }
}

class Cacti{
    
    constructor(){
        
        this.cacti = new OBJ({
            x:0, y: 0.5, z: 0, 
            img: 'cactus',
            asset:'cactus_obj', 
            mtl:'cactus_mtl', 
            scaleX: 0.3, scaleY: 0.3, scaleZ: 0.3
        });

        return this.cacti;
    }
   
}

class DesertSurface {

    constructor(){
        
        this.desertLandscape = new OBJ({
            x:0, y: 0, z: 0, 
            img: 'desert',
            asset:'desert_obj', 
            mtl:'desert_mtl', 
            scaleX: 0.3, scaleY: 0.3, scaleZ: 0.3
        });

        return this.desertLandscape;
    }

}

class Water{
    
    constructor(x, y, z){
        this.container = new Container3D({x: x, y: y, z: z})
        console.log("Water:", x, y, z)
        this.container.addChild(new Box({
            x:0, y:0, z:0,
            red: 66, green: 212, blue: 245,
            height: 2, width:2, depth: 0.5,
            rotationX:-90,
            transparent: true,
            opacity: 0.5,
        }))
        // this.container.addChild(new Box({
        //     x:0, y:-0.1, z:0,
        //     red: 66, green: 144, blue: 245,
        //     height: 2, width:2, depth: 0.2,
        //     rotationX:-90,
        //     transparent: true,
        //     opacity: 0.5,
        // }))
        // this.container.addChild(new Box({
        //     x:0, y:-0.3, z:0,
        //     red: 66, green: 84, blue: 245,
        //     height: 2, width:2, depth: 0.2,
        //     rotationX:-90,
        //     transparent: true,
        //     opacity: 0.5,
        // }))

        this.myJelly = new Jellies();
        actors.push(this.myJelly);
        this.container.addChild(this.myJelly.jelly);
        
        return this.container;
        
    }
}

class Jellies{
    
    constructor(){
        this.jelly = new OBJ({
            x:0, y:0.2, z:0, 
            asset:'jelly_obj', 
            mtl:'jelly_mtl', 
            scaleX: 0.5, scaleY: 0.5, scaleZ: 0.5
        })
        this.xOffset = random(1000);
        this.yOffset = random(1000);
        this.zOffset = random(1000);
    }

    move() {
		var yMovement = map(noise(this.yOffset), 0, 1, -0.05, 0.05);
		var xMovement = map(noise(this.xOffset), 0, 1, -0.05, 0.05);
		var zMovement = map(noise(this.zOffset), 0, 1, -0.05, 0.05);

		this.xOffset += 0.01;
		this.yOffset += 0.01;
        this.zOffset += 0.01;

		this.jelly.nudge(xMovement/4, yMovement/4, zMovement/4);
    
    }
}

class Rainforest{

    constructor(x, y, z){

        this.container = new Container3D({x:x, y: y, z: z});
        console.log("Rainforest: ", x, y, z)


        this.container.addChild( new Box({
            x: 0, y: 0, z: 0,
            height: 2, width: 2, depth: 0.5,
            rotationX:-90,
            red: 0, green: 102, blue: 0
        }));

        this.container.addChild(new Trees())
        return this.container;
    }
}

class Trees{

    constructor(){

        this.trees = new OBJ({
            x:0.22, y: .2, z: 0.01,
            img: 'tree',
            asset:'tree_obj',
            mtl:'tree_mtl',
            scaleX: 0.0043, scaleY: 0.004, scaleZ: 0.00375
        });

        return this.trees;
    }
}

class markerOBJ {

    constructor(marker){
        this.marker = marker;
        this.tileCount = 0;
        this.inPreviousFrame = false;
        this.myTiles = [];
    }

    addTile(tileChild){

        if (tileChild === "Mountain"){
            this.myTiles.push("Mountain");
            var temp = new Mountain(xyzArray[this.tileCount][0], xyzArray[this.tileCount][1], xyzArray[this.tileCount][2])
        };

        if (tileChild === "Desert"){
            this.myTiles.push("Desert");
            var temp = new Desert(xyzArray[this.tileCount][0], xyzArray[this.tileCount][1], xyzArray[this.tileCount][2]);
        }

        if (tileChild === "Water"){
            this.myTiles.push("Water");
            var temp = new Water(xyzArray[this.tileCount][0], xyzArray[this.tileCount][1], xyzArray[this.tileCount][2])
        };

        if (tileChild === "Rainforest"){
            this.myTiles.push("Rainforest");
            var temp = new Rainforest(xyzArray[this.tileCount][0], xyzArray[this.tileCount][1], xyzArray[this.tileCount][2])
        };

        this.marker.addChild(temp); // adding the landscape

       this.marker.children[this.tileCount].show(); // displays all tiles currently in marker
       this.tileCount += 1;

    }

}

// returns latest marker that enters scene
function findNewMarker(){

    for (let i = 0; i < allMarkers.length; i++){

        if (allMarkers[i].inPreviousFrame === false && allMarkers[i].marker.isVisible()) { // tile just entered scene
            return allMarkers[i];
        }

    }

    return null;

}

function findVisibleMarkers(){

    var temp = [];

    for (let i = 0; i < allMarkers.length; i++){

        if (allMarkers[i].inPreviousFrame === true && allMarkers[i].marker.isVisible()) { // tile just entered scene
            temp.push(allMarkers[i]);
        }

    }

    return temp;

}
