// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro, markerZb;

var baseOffset = 0;
var actors = [];

function setup() {
    world = new World('ARScene');
    var xOffset = 0;
    var zOffset = 0;

    marker1 = world.getMarker('hiro');
    marker2 = world.getMarker('zb');
    marker3 = world.getMarker('kanji');
    marker4 = world.getMarker('nyu');
    allMarkers = [marker1, marker2, marker3, marker4];
    for (var i = 0; i < allMarkers.length; i++){
        xOffset = 0
        zOffset = 0
        for (var j = 0; j < 1; j++){
            allMarkers[i].addChild(new Mountain(xOffset, zOffset, baseOffset));
            allMarkers[i].addChild(new Water(xOffset, zOffset, baseOffset));
            allMarkers[i].addChild(new Rainforest(xOffset, zOffset, baseOffset));
            allMarkers[i].addChild(new Desert(xOffset, zOffset, baseOffset));
        }
        
        // Hide Tiles
        if (i == 0){
            allMarkers[i].children[0]
            allMarkers[i].children[1].hide()
            allMarkers[i].children[2].hide()
            allMarkers[i].children[3].hide()
        }
        if (i == 1){
            allMarkers[i].children[0].hide()
            allMarkers[i].children[1]
            allMarkers[i].children[2].hide()
            allMarkers[i].children[3].hide()
        }
        if (i == 2){
            allMarkers[i].children[0].hide()
            allMarkers[i].children[1].hide()
            allMarkers[i].children[2]
            allMarkers[i].children[3].hide()
        }
        if (i == 3){
            allMarkers[i].children[0].hide()
            allMarkers[i].children[1].hide()
            allMarkers[i].children[2].hide()
            allMarkers[i].children[3]
        }
    }
}


function draw() {
  // erase the background
  world.clearDrawingCanvas();

    // move jellies
    for (let k = 0; k < actors.length; k++){
        actors[k].move();
    }
    
    for (var i = 0; i < allMarkers.length; i++){
        if (allMarkers[i].isVisible() == true){
            for (var j = 0; j < allMarkers.length; j++){

                if (allMarkers[i] != allMarkers[j] && allMarkers[j].isVisible() == true){
                    console.log('BOTH ARE VISIBLE')
                    fill(255);
                    textSize(50);
                    textAlign(CENTER);
                    text('2 things are visible', width/2, height/2);
                    
                    if ((allMarkers[0].isVisible() && allMarkers[1].isVisible()) || (allMarkers[1].isVisible() && allMarkers[0].isVisible())){
                        allMarkers[i].children[j].show();
                    }
                    
                    if ((allMarkers[0].isVisible() && allMarkers[2].isVisible()) || (allMarkers[2].isVisible() && allMarkers[0].isVisible())){
                        allMarkers[i].children[j].show();
                    }
                    
                    if ((allMarkers[1].isVisible() && allMarkers[2].isVisible()) || (allMarkers[2].isVisible() && allMarkers[1].isVisible())){
                        allMarkers[i].children[j].show();
                    }
                    
                    if ((allMarkers[0].isVisible() && allMarkers[3].isVisible()) || (allMarkers[3].isVisible() && allMarkers[0].isVisible())){
                        allMarkers[i].children[j].show();
                    }
                    
                    if ((allMarkers[1].isVisible() && allMarkers[3].isVisible()) || (allMarkers[3].isVisible() && allMarkers[1].isVisible())){
                        allMarkers[i].children[j].show();
                    }
                    
                    if ((allMarkers[2].isVisible() && allMarkers[3].isVisible()) || (allMarkers[3].isVisible() && allMarkers[2].isVisible())){
                        allMarkers[i].children[j].show();
                    }

                    // accounting for diagonals
                     if (allMarkers[i].children[0].visible && allMarkers[i].children[2].visible && (allMarkers[i].children[3].visible == false) && (allMarkers[i].children[1].visible == false)){
                        console.log('BOO!');

                        // swap tile 2 with tile 1 position
                        allMarkers[i].children[2].baseOffset = 1;
                        allMarkers[i].children[1].baseOffset = 0;

                        // swap tile 3 with tile 0 position

                    }
                }
            }

        }
    }
}

class Mountain{
    
    constructor(xOffset, zOffset, baseOffset){
        this.xOffset = xOffset
        this.zOffset = zOffset
        this.baseOffset = baseOffset;
        this.box1 = new Box({
            x: -1, y:0, z: -1,
            height: 2, width: 2, depth: 0.5,
            rotationX:-90,
            red: 148, green: 184, blue: 184
        })
        return this.box1
    }
}

class Desert{
    
    constructor(xOffset, zOffset, baseOffset){
        this.xOffset = xOffset
        this.zOffset = zOffset
        this.baseOffset = baseOffset;
        this.container = new Container3D({x: 1, y: 0, z: -1});

        this.container.addChild( new Box({
            x: 0, y: 0, z: this.baseOffset,
            height: 2, width: 2, depth: 0.5,
            rotationX:-90,
            red: 210, green: 180, blue: 140
        }));

        this.container.addChild(new Cacti())
        
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
    
    constructor(xOffset, zOffset, baseOffset){
        this.xOffset = xOffset
        this.zOffset = zOffset
        this.baseOffset = baseOffset;
        this.container = new Container3D({x: -1, y: 0, z: 1})
        this.container.addChild(new Box({
            x:0, y:0, z:0,
            red: 66, green: 212, blue: 245,
            height: 2, width:2, depth: 0.5,
            rotationX:-90,
            transparent: true,
            opacity: 0.5,
        }))
        this.container.addChild(new Box({
            x:0, y:-0.1, z:0,
            red: 66, green: 144, blue: 245,
            height: 2, width:2, depth: 0.2,
            rotationX:-90,
            transparent: true,
            opacity: 0.5,
        }))
        this.container.addChild(new Box({
            x:0, y:-0.3, z:0,
            red: 66, green: 84, blue: 245,
            height: 2, width:2, depth: 0.2,
            rotationX:-90,
            transparent: true,
            opacity: 0.5,
        }))

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
        // this.jelly.y = constrain(this.jelly.y, 0, 15);
        // this.jelly.x = constrain(this.jelly.x, -50, 50);
        // this.jelly.z = constrain(this.jelly.z, -50, 50);
    }
}

class Rainforest{

    constructor(xOffset, zOffset, baseOffset){
        
        this.xOffset = xOffset
        this.zOffset = zOffset
        this.baseOffset = baseOffset;
        this.container = new Container3D({x:1, y: 0, z: 1});

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
