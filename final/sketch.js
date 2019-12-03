// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro, markerZb;

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');
  markerZb = world.getMarker('zb');
    allMarkers = [markerHiro, markerZb];
    for (var i = 0; i < allMarkers.length; i++){
        tempPlane = new Fplane();
        allMarkers[i].addChild(tempPlane);
    }
    added = false;
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

                   if (added == false){
                       allMarkers[i].addChild(allMarkers[j].children[0])
                       allMarkers[j].addChild(allMarkers[i].children[0])
                       
                       repositionPlanes(allMarkers);
                       
                       added = true;
                   }
                }
            }
        }
    }
}

class Fplane{
    
    constructor(){
        this.fPlane = new Plane({
            x:0, y:0, z:0,
            height: 1, width: 1,
            rotationX:-90,
            red: random(255), green: random(255), blue: random(255)
        })
        return this.fPlane
    }
}

function repositionPlanes(x){
    var xOffset
    for (var i = 0; i < x.length; i++){
        console.log(x[i])
        xOffset = 0
        for (var j = 0; j < x[i].children.length; j++){
            console.log(x[i].children[j]);
            x[i].children[j].x += xOffset
            xOffset += 1
        }
    }
}
