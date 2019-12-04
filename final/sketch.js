// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro, markerZb;

function setup() {
    world = new World('ARScene');
    var xOffset = 0;
    var yOffset = 0;

    marker1 = world.getMarker('hiro');
    marker2 = world.getMarker('zb');
    marker3 = world.getMarker('kanji');
    marker4 = world.getMarker('nyu');
    allMarkers = [marker1, marker2, marker3, marker4];
    for (var i = 0; i < allMarkers.length; i++){
        xOffset = 0
        zOffset = 0
        for (var j = 0; j < 4; j++){
            allMarkers[i].addChild(new Fbox(xOffset, zOffset));
            xOffset++
            if (xOffset >= 2){
                xOffset = 0;
                zOffset++
            }
        }
        
        //Hide Tiles
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
                }
            }
        }
    }
}

class Fbox{
    
    constructor(xOffset, zOffset){
        this.xOffset = xOffset
        this.zOffset = zOffset
        this.box1 = new Box({
            x: this.xOffset - 0.5, y:0, z: this.zOffset -0.5,
            height: 1, width: 1, depth: 0.5,
            rotationX:-90,
            red: random(255), green: random(255), blue: random(255)
        })
        return this.box1
    }
}
