// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro, markerZb;

var baseOffset = 0;
var actors = [];
var mountainActors = [];
var tumbleActors = [];
var bear;
var resources = 10; // starting number of resources
var addResources = false;
var overallState = 0;
var img
var mountainFlora = []
var mountainFauna = []
var rainforestFlora = []
var rainforestFauna = []
var desertFlora = []
var desertFauna = []
var waterFlora = []
var waterFauna = []



// 2D array of tile positions
var xyzArray = [
                    [-1, 0, -1], // index 0 tile
                    [-1, 0, 1], // index 1 tile
                    [1, 0, 1], // index 2 tile
                    [1, 0, -1] // index 3 tile
                ];

function preload(){
    img = loadImage('assets/startLogo.png')
}
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

        markerMountain = new markerOBJ(marker1, "marker1");
        markerMountain.addTile("Mountain");

        markerWater = new markerOBJ(marker2, "marker2");
        markerWater.addTile("Water");

        markerRF = new markerOBJ(marker3, "marker3");
        markerRF.addTile("Rainforest");

        markerDesert = new markerOBJ(marker4, "marker4");
        markerDesert.addTile("Desert");

        window.localStorage.setItem("previousGameState", "saved");
        window.localStorage.setItem("marker1", "Mountain");
        window.localStorage.setItem("marker2", "Water");
        window.localStorage.setItem("marker3", "Rainforest");
        window.localStorage.setItem("marker4", "Desert");

    } else {

        console.log("loading previous game");

        markerMountain = new markerOBJ(marker1, "marker1");
        markerWater = new markerOBJ(marker2, "marker2");
        markerRF = new markerOBJ(marker3, "marker3");
        markerDesert = new markerOBJ(marker4, "marker4");

        var previousM1 = window.localStorage.getItem("marker1");
        var previousM2 = window.localStorage.getItem("marker2");
        var previousM3 = window.localStorage.getItem("marker3");
        var previousM4 = window.localStorage.getItem("marker4");

        var m1Scenes = previousM1.split(',');
        for (let i = 0; i < m1Scenes.length; i++){
            // mountain
            if (m1Scenes[i] === "Water") {
                markerMountain.addTile("Water");
            } else if (m1Scenes[i] === "Rainforest"){
                markerMountain.addTile("Rainforest");
            } else if (m1Scenes[i] === "Desert"){
                markerMountain.addTile("Desert");
            } else if (m1Scenes[i] === "Mountain") {
                markerMountain.addTile("Mountain");
            }
        }

        var m2Scenes = previousM2.split(',');
        for (let i = 0; i < m2Scenes.length; i++){
            // water
            if (m2Scenes[i] === "Water") {
                markerWater.addTile("Water");
            } else if (m2Scenes[i] === "Rainforest"){
                markerWater.addTile("Rainforest");
            } else if (m2Scenes[i] === "Desert"){
                markerWater.addTile("Desert");
            } else if (m2Scenes[i] === "Mountain") {
                markerWater.addTile("Mountain");
            }
        }

        var m3Scenes = previousM3.split(',');
        for (let i = 0; i < m3Scenes.length; i++){
            // RF
            if (m3Scenes[i] === "Water") {
                markerRF.addTile("Water");
            } else if (m3Scenes[i] === "Rainforest"){
                markerRF.addTile("Rainforest");
            } else if (m3Scenes[i] === "Desert"){
                markerRF.addTile("Desert");
            } else if (m3Scenes[i] === "Mountain") {
                markerRF.addTile("Mountain");
            }
        }

        var m4Scenes = previousM4.split(',');
        for (let i = 0; i < m4Scenes.length; i++){
            // desert
            if (m4Scenes[i] === "Water") {
                markerDesert.addTile("Water");
            } else if (m4Scenes[i] === "Rainforest"){
                markerDesert.addTile("Rainforest");
            } else if (m4Scenes[i] === "Desert"){
                markerDesert.addTile("Desert");
            } else if (m4Scenes[i] === "Mountain") {
                markerDesert.addTile("Mountain");
            }
        }

    }

    allMarkers = [markerMountain, markerWater, markerRF, markerDesert];


}


function draw() {
    // resources
    let h = hour();
    let m = minute();
    // increment resources by 5 every 30 min
    if ((m === 0 || m === 30 || m === 39) && addResources === false){
        addResources = true;
        resources += 5;
    } 

    if (addResources === true && (m !== 39 && m !== 30 && m !== 0)){
        console.log("inside second if statement");
        addResources = false;
    }

    console.log(addResources);

    if (m < 10){
        m = "0" + m; // adding a "0" in front of the minutes, if less than 10 min, format-wise
    }
    
     // move jellies
        for (let k = 0; k < actors.length; k++){
            actors[k].move();
        }

        for (let j = 0; j < mountainActors.length; j++){
            mountainActors[j].move();
        }

        for (let v = 0; v < tumbleActors.length; v++){
            tumbleActors[v].move();
        }
        for (let m = 0; m < mountainFlora.length; m++){
            mountainFlora[m].visible = true;
        }
        for (let r = 0; m < rainforestFlora.length; r++){
            rainforestFlora[r].visible = true;
        }
    
    if (overallState == 0){
        var c1 = color(24,169,153);
        var c2 = color(24,169,153);
        var c3 = color(24,169,153);
        var cText = color(72,67,73);
        var cHover = color(247,240,240);
        stroke(cText)
        
        if (mouseX >= 50 && mouseX <= 250 && mouseY >=400 && mouseY <=450){
            console.log('hit')
            c1 = cHover;
            if (mouseIsPressed){
                overallState = 1
            }
        }
        if (mouseX >= width-250 && mouseX <= width-50 && mouseY >=400 && mouseY <=450){
            console.log('hit2')
            c2 = cHover;
            if (mouseIsPressed){
                overallState = 2
            }
        }
        
        if (mouseX >= width-150 && mouseX <= width - 50 && mouseY >=150 && mouseY <=200){
            console.log('hit2')
            c3 = cHover;
            if (mouseIsPressed){
                window.location.href = "https://drive.google.com/drive/folders/15HX92Y23lS35LG5oAi30MXQd2EOiAPYL?usp=sharing";
            }
        }
        
        //ADD
        background(cText);
        fill(c1)
        rect(50,400,200,50,20);
        fill(cText)
        textAlign(CENTER);
        text('ADD TO WORLD', 150, 430)
        
        //VIEW
        fill(c2)
        rect(width-250,400,200,50,20);
        fill(cText)
        textAlign(CENTER);
        text('EDIT WORLD', width-150, 430)
        
        //MARKERS
        fill(c3)
        rect(width-150,150,100,50,20)
        fill(cText)
        textAlign(CENTER);
        text('MARKERS', width-100, 180)
        
        //CENTER
        imageMode(CENTER)
        image(img, width/2, height/2)
        imageMode(CORNER)
    }
    
    if (overallState == 1){
        noStroke()
        textAlign(LEFT)
        // erase the background
      world.clearDrawingCanvas();

        var newMarker = findNewMarker();

        if (newMarker !== null){

            var toAdd = newMarker.myTiles[0];
            var presentTiles = findVisibleMarkers();

            for (let j = 0; j < presentTiles.length; j++){

                if (!presentTiles[j].myTiles.includes(toAdd)){
                    presentTiles[j].addTile(toAdd); // adding newly entered tile to the tiles of present markers
                    var newStorageString = window.localStorage.getItem( presentTiles[j].markerName )
                    newStorageString += "," + toAdd
                    window.localStorage.setItem( presentTiles[j].markerName, newStorageString )
                }

                if (!newMarker.myTiles.includes(presentTiles[j].myTiles[0])){
                    newMarker.addTile(presentTiles[j].myTiles[0]); // add present tiles to newly displayed tile
                    var newStorageString = window.localStorage.getItem( newMarker.markerName )
                    newStorageString += "," + presentTiles[j].myTiles[0]
                    window.localStorage.setItem( newMarker.markerName, newStorageString )
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

        fill(24, 169, 153, 150);
        noStroke();
        rectMode(CENTER);
        rect(90, 158, 140, 50, 20);

        fill(72,67,73);
        textSize(14);
        text("Time: " + h + ": " + m, 35, 153);

        fill(72,67,73);
        textSize(14);
        text("Resources: " + resources, 35, 175);
        
        //BACK
        var c1 = color(24,169,153, 150);
        var cText = color(72,67,73);
        var cHover = color(247,240,240);
        
        if (mouseX >= 20 && mouseX <= 70  && mouseY >=190 && mouseY <= 215){
            console.log('hit')
            c1 = cHover
            if (mouseIsPressed){
                overallState = 0
            }
        }
        
        fill(c1)
        rectMode(CORNER)
        rect(20,190,50,25,20);
        fill(cText, 150)
        textAlign(CENTER);
        textSize(10)
        text('BACK', 45, 205)
        textSize(14)
    }
    
    if (overallState == 2){
        noStroke()
        world.clearDrawingCanvas();
        
        fill(24, 169, 153, 150);
        noStroke();
        rectMode(CENTER);
        rect(90, 158, 140, 50, 20);
        
        textAlign(LEFT)
        fill(72,67,73);
        textSize(14);
        text("Time: " + h + ": " + m, 35, 153);

        fill(72,67,73);
        textSize(14);
        text("Resources: " + resources, 35, 175);
        textAlign(RIGHT);
        
        //BACK
        var c1 = color(24,169,153, 150);
        var c2 = color(24,169,153,150);
        var c3 = color(24,169,153,150);
        var cText = color(72,67,73);
        var cHover = color(247,240,240);
        
        if (mouseX >= 20 && mouseX <= 70  && mouseY >=190 && mouseY <= 215){
            c1 = cHover
            if (mouseIsPressed){
                overallState = 0
            }
        }
       
        if (mouseX >= 20 && mouseX <= 120  && mouseY >=250 && mouseY <= 275){
            c2 = cHover
            if (mouseIsPressed ){
                console.log('PRESSED FLORA')
            }
        }
        
        if (mouseX >= 20 && mouseX <= 120  && mouseY >=280 && mouseY <= 305){
            c3 = cHover
            if (mouseIsPressed){
                console.log('PRESSED FAUNA')
            }
        }
        
        for (var i = 0; i < allMarkers.length; i++){
            if (allMarkers[i].marker.isVisible()){
                for (var j = 0; j < allMarkers.length; j++){
                    if (allMarkers[i] != allMarkers[j] && allMarkers[j].marker.isVisible()){
                        textSize(20);
                        stroke(0)
                        fill(255, 105, 97)
                        textAlign(CENTER)
                        text('PLEASE REMOVE ONE MARKER FROM FRAME', width/2, height/2);
                        textAlign(LEFT)
                        textSize(14)
                        noStroke()
                    }
                }
            }
        }
        
        fill(c1)
        rectMode(CORNER)
        rect(20,190,50,25,20);
        fill(c2)
        rect(20,250,100,25,20);
        fill(c3)
        rect(20,280,100,25,20);
        fill(cText, 150)
        textAlign(CENTER);
        textSize(10)
        text('BACK', 45, 205)
        text('Add Flora', 65, 265);
        text('Add Fauna', 65, 295);
        textSize(14)
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
            red: 63, green: 45, blue: 39
        }));

        this.container.addChild(new MountainLandscape());

        this.container.addChild(new Cloud(0, 1.5, -0.3));
        this.container.addChild(new Hawk(0, 1.5, 0.3, -20));
        this.container.addChild(new Hawk(0.7, 1, -0.3, 40));

        this.myBear = new Bear();
        mountainActors.push(this.myBear);
        this.container.addChild(this.myBear.bear);

        // mountain flora
        this.pt1 = new Pinetree(-0.75, 0.6, -0.75);
        this.pt2 = new Pinetree(0.3, 0.6, -.8);
        this.pt3 = new Pinetree(0.8, 0.6, -.5);
        this.pt4 = new Pinetree(-0.8, 0.6, .7);
        mountainFlora.push(this.pt1)
        mountainFlora.push(this.pt2)
        mountainFlora.push(this.pt3)
        mountainFlora.push(this.pt4)
        this.container.addChild(this.pt1.pinetree);
        this.container.addChild(this.pt2.pinetree);
        this.container.addChild(this.pt3.pinetree);
        this.container.addChild(this.pt4.pinetree);

        // rainforest flora
        this.venus8 = new Venus(0.8, 0.3, -0.2)
        this.venus9 = new Venus(-0.2, 0.3, 0.8)
        rainforestFlora.push(this.venus8)
        rainforestFlora.push(this.venus9)
        this.container.addChild(this.venus8.venus);
        this.container.addChild(this.venus9.venus);

        // desert flora
        this.cacti4 = new Cacti(-.8, 0.5, -.4)
        this.cacti5 = new Cacti(.7, 0.5, .6)
        desertFlora.push(this.cacti4)
        desertFlora.push(this.cacti5)
        this.container.addChild(this.cacti4.cacti);
        this.container.addChild(this.cacti5.cacti);

        // water flora
        this.palm8 = new PalmTree(-0.8, 0.5, 0.2)
        this.palm9 = new PalmTree(0, 0.5, -0.8)
        waterFlora.push(this.palm8)
        waterFlora.push(this.palm9)
        this.container.addChild(this.palm8.palmtree)
        this.container.addChild(this.palm9.palmtree)


        return this.container;
    }
}

class MountainLandscape{
    constructor(){

        this.mountainLandscape = new OBJ({
            x:0, y: .45, z: 0,
            asset:'mountain_obj',
            mtl:'mountain_mtl',
            scaleX: 3, scaleY: 3, scaleZ: 3
        });

        return this.mountainLandscape;
    }
}

class Bear{

    constructor(){

        this.bear = new OBJ({
            x:.75, y: 0.25, z: .5,
            img: 'bear',
            asset:'bear_obj',
            mtl:'bear_mtl',
            scaleX: 0.03, scaleY: 0.03, scaleZ: 0.03
        });

        this.xOffset = random(1000);
        this.yOffset = 0;
        this.zOffset = random(1000);

        // not sure if i need this line or not but phillip doesn't have it
        //return this.bear;
    }

    move() {
    
        var bearX = map(noise(this.yOffset), 0, 1, -0.05, 0.05);
        var bearY = 0
        var bearZ = map(noise(this.zOffset), 0, 1, -0.05, 0.05);

		this.xOffset += 0.01;
		this.yOffset += 0;
        this.zOffset += 0.01;

        this.bear.nudge(bearX/4, bearY/4, bearZ/4)
        this.bear.y = constrain(this.bear.y, -0.5, 0.2);
        this.bear.x = constrain(this.bear.x, -0.75, 0.75);
        this.bear.z = constrain(this.bear.z, -0.75, 0.75);
    }
}


class Pinetree{

    constructor(xCoord, yCoord, zCoord){
        this.pinetree = new OBJ({
            x:xCoord, y: yCoord, z: zCoord,
            asset:'pinetree_obj',
            mtl:'pinetree_mtl',
            scaleX: 0.25, scaleY: 0.25, scaleZ: 0.25,
            rotationY: 90
        });
        //return this.pinetree;
    }
}

class Cloud{

    constructor(xCoord, yCoord, zCoord){

        this.cloud = new OBJ ({
            asset: 'cloud_obj', mtl: 'cloud_mtl',
            x: xCoord, y: yCoord, z: zCoord,
            scaleX:2, scaleY: 2, scaleZ: 2,
            rotationX: 90
        })
        return this.cloud;
    }
}

class Hawk{

    constructor(xCoord, yCoord, zCoord, yRotate){

        this.hawk = new OBJ ({
            asset: 'hawk_obj', mtl: 'hawk_mtl',
            x: xCoord, y: yCoord, z: zCoord,
            scaleX:0.001, scaleY: 0.001, scaleZ: 0.001,
            rotationX: -90, rotationY: yRotate
        })
        return this.hawk;
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

        // add 3 tumbleweeds
        for (let i = 0; i < 3; i++){
            this.tumbleweed = new Tumbleweed();
            tumbleActors.push(this.tumbleweed);
            this.container.addChild(this.tumbleweed.tumble);
        }


        this.container.addChild(new DesertSurface());
        this.container.addChild(new Camel(0.3, 0.3, 0.2))
        
        // desert flora 
        this.cacti1 = new Cacti(-.7, 0.5, -.4)
        this.cacti2 = new Cacti(.6, 0.5, .4)
        this.cacti3 = new Cacti(-0.2, 0.5, .7)
        desertFlora.push(this.cacti1)
        desertFlora.push(this.cacti2)
        desertFlora.push(this.cacti3)
        this.container.addChild(this.cacti1.cacti);
        this.container.addChild(this.cacti2.cacti);
        this.container.addChild(this.cacti3.cacti);

        // rainforest flora
        this.venus6 = new Venus(-0.8, 0.3, 0)
        this.venus7 = new Venus(0.5, 0.3, -0.4)
        rainforestFlora.push(this.venus6)
        rainforestFlora.push(this.venus7)
        this.container.addChild(this.venus6.venus);
        this.container.addChild(this.venus7.venus);

        // mountain flora 
        this.pt7 = new Pinetree(0.3, 0.7, 0.6)
        this.pt8 = new Pinetree(-0.2, 0.7, -0.7)
        mountainFlora.push(this.pt7)
        mountainFlora.push(this.pt8)
        this.container.addChild(this.pt7.pinetree);
        this.container.addChild(this.pt8.pinetree);

        // water flora
        this.palm4 = new PalmTree(0, 0.5, -0.3)
        this.palm5 = new PalmTree(0.6, 0.5, 0)
        waterFlora.push(this.palm4)
        waterFlora.push(this.palm5)
        this.container.addChild(this.palm4.palmtree)
        this.container.addChild(this.palm5.palmtree)

        return this.container;
    }
}

class Cacti{
    constructor(xCoord, yCoord, zCoord){
        this.cacti = new OBJ({
            x:xCoord, y: yCoord, z: zCoord,
            img: 'cactus',
            asset:'cactus_obj',
            mtl:'cactus_mtl',
            scaleX: 0.15, scaleY: 0.28, scaleZ: 0.15
        });
        //return this.cacti;
    }
}

class Camel{

    constructor(xCoord, yCoord, zCoord){

        this.camel = new OBJ({
            x:xCoord, y: yCoord, z: zCoord,
            img: 'camel',
            asset:'camel_obj',
            mtl:'camel_mtl',
            scaleX: .001, scaleY: .001, scaleZ: .001
        });

        return this.camel;
    }
}

class Tumbleweed{

    constructor(){

        this.tumble = new OBJ({
            x: random(-.75, .75), y: 0.35, z: random(-.75, .75),
            asset:'tumble_obj',
            mtl:'tumble_mtl',
            scaleX: 0.16, scaleY: 0.16, scaleZ: 0.16
        });

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
        this.zOffset += 0.012;

        this.tumble.nudge(xMovement/4, yMovement/4, zMovement/4);
        this.tumble.y = constrain(this.tumble.y, .35, 0.55);
        this.tumble.x = constrain(this.tumble.x, -0.75, 0.75);
        this.tumble.z = constrain(this.tumble.z, -0.75, 0.75);

        this.tumble.spinX(1);
        this.tumble.spinY(.5);
        this.tumble.spinZ(.8);

    }

}

class DesertSurface {

    constructor(){

        this.desertLandscape = new OBJ({
            x:0, y: .17, z: 0,
            img: 'dland',
            asset:'dland_obj',
            mtl:'dland_mtl',
            scaleX: 0.002, scaleY: 0.002, scaleZ: 0.002
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
            /*red: 66, green: 212, blue: 245,*/ asset: 'ocean', repeatX:2, repeatY:2,
            height: 2, width:2, depth: 0.5,
            rotationX:-90,
            transparent: true,
            opacity: 0.7,
        }))
        
        this.container.addChild(new OBJ({
            x:0.18, y:0.3, z:0,
            asset:'island_obj',
            mtl:'island_mtl',
            scaleX: 0.015, scaleY: 0.015, scaleZ: 0.015
        }))
        
        this.myJelly = new Jellies();
        this.mySun = new Sun();
        actors.push(this.myJelly);
        this.container.addChild(this.myJelly.jelly);
        actors.push(this.mySun);
        this.container.addChild(this.mySun.sun)
        this.container.addChild( new Walrus())
        

        // rainforest flora
        this.venus4 = new Venus(0, 0.4, 0.6)
        this.venus5 = new Venus(-0.2, 0.6, 0.1)
        rainforestFlora.push(this.venus4)
        rainforestFlora.push(this.venus5)
        this.container.addChild(this.venus4.venus);
        this.container.addChild(this.venus5.venus);

        // mountain flora 
        this.pt7 = new Pinetree(0.5, 0.7, 0.5)
        this.pt8 = new Pinetree(-0.5, 0.7, -0.5)
        mountainFlora.push(this.pt7)
        mountainFlora.push(this.pt8)
        this.container.addChild(this.pt7.pinetree);
        this.container.addChild(this.pt8.pinetree);

        // desert flora
        this.cacti6 = new Cacti(-.5, 0.5, .4)
        this.cacti7 = new Cacti(.4, 0.5, -.5)
        desertFlora.push(this.cacti6)
        desertFlora.push(this.cacti7)
        this.container.addChild(this.cacti6.cacti);
        this.container.addChild(this.cacti7.cacti);

        // water flora 
        this.palm1 = new PalmTree(0, 0.7, -0.3)
        this.palm2 = new PalmTree(0.6, 0.5, 0)
        this.palm3 = new PalmTree(-0.2, 0.5, 0.6)
        waterFlora.push(this.palm1)
        waterFlora.push(this.palm2)
        waterFlora.push(this.palm3)
        this.container.addChild(this.palm1.palmtree)
        this.container.addChild(this.palm2.palmtree)
        this.container.addChild(this.palm3.palmtree)

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
        this.jelly.y = constrain(this.jelly.y, -0.5, 0.2);
        this.jelly.x = constrain(this.jelly.x, -0.75, 0.75);
        this.jelly.z = constrain(this.jelly.z, -0.75, 0.75);

    }
}

class Sun{
    
    constructor(){
        this.sun = new OBJ({
            x:-0.5, y:1, z:-0.5,
            red:249, green:215, blue:28,
            asset:'sun_obj',
            mtl: 'sun_obj',
            scaleX: 0.003, scaleY: 0.003, scaleZ: 0.003
        })
    }
    
    move(){
        this.sun.spinY(1)
    }
}

class Walrus{
    
    constructor(){
        this.walrus = new OBJ({
            x:0.75, y:0.4, z:0.1,
            asset:'walrus_obj',
            mtl: 'walrus_mtl',
            scaleX: .0002, scaleY: .0002, scaleZ: .0002
        })

        return this.walrus
    }   
}

class PalmTree{
    
    constructor(xCoord, yCoord, zCoord){
        this.palmtree = new OBJ({
            x:xCoord, y:yCoord, z:zCoord,
            asset:'palm_tree_obj',
            mtl: 'palm_tree_mtl',
            scaleX: 2.5, scaleY: 2.5, scaleZ: 2.5
        })

        //return this.palmtree
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
        this.container.addChild(new Parrots(0, 1.5, 0.3, -20));
        //this.container.addChild(new Rains(0.5, .5, -0.3, 40));
        this.container.addChild(new Jaguar(0.7, .3, -.2))

        // rainforest flora 
        this.venus1 = new Venus(0.8, 0.3, -0.8)
        this.venus2 = new Venus(-0.3, 0.3, 0)
        this.venus3 = new Venus(0.5, 0.3, 0.5)
        rainforestFlora.push(this.venus1)
        rainforestFlora.push(this.venus2)
        rainforestFlora.push(this.venus3)
        this.container.addChild(this.venus1.venus);
        this.container.addChild(this.venus2.venus);
        this.container.addChild(this.venus3.venus);

        // mountain flora 
        this.pt9 = new Pinetree(0, 0.7, 0.9)
        this.pt10 = new Pinetree(-0.5, 0.7, -0.5)
        mountainFlora.push(this.pt9)
        mountainFlora.push(this.pt10)
        this.container.addChild(this.pt9.pinetree);
        this.container.addChild(this.pt10.pinetree);

        // desert flora
        this.cacti8 = new Cacti(-.8, 0.5, .4)
        this.cacti9 = new Cacti(.7, 0.5, -.6)
        desertFlora.push(this.cacti8)
        desertFlora.push(this.cacti9)
        this.container.addChild(this.cacti8.cacti);
        this.container.addChild(this.cacti9.cacti);   
        
        // water flora
        this.palm4 = new PalmTree(0, 0.7, -0.3)
        this.palm5 = new PalmTree(0.6, 0.5, 0)
        waterFlora.push(this.palm4)
        waterFlora.push(this.palm5)
        this.container.addChild(this.palm4.palmtree)
        this.container.addChild(this.palm5.palmtree)

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

class Parrots{

    constructor(){

        this.parrots = new OBJ({
            x:0.22, y: 1.2, z: 0.01,
            img: 'parrot',
            asset:'parrot_obj',
            mtl:'parrot_mtl',
            scaleX: 0.001, scaleY: 0.001, scaleZ: 0.001
        });

        return this.parrots;
    }
}

class Jaguar{

    constructor(xCoord, yCoord, zCoord){

        this.jaguar = new OBJ({
            x:xCoord, y: yCoord, z: zCoord,
            img: 'jaguar',
            asset:'jaguar_obj',
            mtl:'jaguar_mtl',
            scaleX: 0.04, scaleY: 0.04, scaleZ: 0.04
        });

        return this.jaguar;
    }
}

class Venus{

    constructor(xCoord, yCoord, zCoord){

        this.venus = new OBJ({
            x:xCoord, y: yCoord, z: zCoord,
            img: 'venus',
            asset:'venus_obj',
            mtl:'venus_mtl',
            scaleX: 0.05, scaleY: 0.05, scaleZ: 0.05
        });

        //return this.venus;
    }
}


class Rains{

    constructor(){

        this.rains = new OBJ({
            x:-.5, y: 1.2, z: -.5,
            img: 'rain',
            asset:'rain_obj',
            mtl:'rain_mtl',
            scaleX: .7, scaleY: .7, scaleZ: .7,
        });

        return this.rains;
    }
}

class markerOBJ {

    constructor(marker, markerName){
        this.marker = marker;
        this.markerName = markerName;
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


/*

MOUNTAIN
flora:
- pinetree
fauna: 
- bear
- hawk


RAINFOREST:
flora:
- venus fly trap 
fauna:
- parrot 
- jaguar


DESERT:
flora:
- tumbleweed
- cacti 
fauna:
- armadillo

WATER:
flora:
- palm tree
fauna:
- jelly 
- walrus

*/
