var statusWeb = "";
var objects = [];
var videoVar = "";
var alarmSound = "";

function preload() {
    alarmSound = loadSound("emergency.mp3");
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(400, 100);
    videoVar = createCapture(VIDEO);
    videoVar.hide();
    setTimeout(function(){
        objectDetector = ml5.objectDetector('cocssd', modelLoaded);
        document.getElementById("statusLbl").innerHTML = "Detecting...";
    }, 2000);
}

function modelLoaded() {
    console.log("Model Loaded");
    statusWeb = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    } else {
        objects = results;
    }
}

function draw() {
    image(videoVar, 0, 0, 600, 450);
    stroke("red");
    strokeWeight(5);
    noFill();
    if(statusWeb != "") {
        objectDetector.detect(videoVar, gotResult);
        for(i = 0; i < objects.length; i++){
            if(objects[0].label != "person"){
                document.getElementById("statusLbl").innerHTML = "Baby not detected!"
                document.getElementById("statusLbl").style.color = "red";
                alarmSound.play();
            } else {
                document.getElementById("statusLbl").innerHTML = "Baby detected";
                document.getElementById("statusLbl").style.color = "green";
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }
}
