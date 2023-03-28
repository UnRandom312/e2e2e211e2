leftwristX = 0;
leftwristY = 0;
RightwristX = 0;
RightwristY = 0;
scoreleft = 0;
scoreright = 0;
musicaa = ""
function preload(){
    musicaa = loadSound("Coconut doggy.mp3")
}

function setup(){
    canvas = createCanvas(300,300)
    canvas.center()
    videos = createCapture(VIDEO)
    videos.hide()
    poseNet = ml5.poseNet(videos, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('poseNet inicializado')
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        scoreleft = results[0].pose.keypoints[9].score
        scoreright = results[0].pose.keypoints[10].score
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        RightwristX = results[0].pose.rightWrist.x;
        RightwristY = results[0].pose.rightWrist.y;
        console.log("leftwristX = " + leftwristX + "leftwristY = " + leftwristY );
        console.log("RightwristX = " + RightwristX + "RightwristY = " + RightwristY );
    }
}
function draw(){
    image(videos,10,10,300,300)
    fill('#75c691')
    stroke('black')
    if(scoreleft > 0.2){
    circle(leftwristX,leftwristY,20)
    var wirsts = Number(leftwristY)
    var wirstR = floor(wirsts)
    var volumen = wirstR / 300
    document.getElementById("volumen").innerHTML = "volumen = " + volumen 
    musicaa.setVolume(volumen)
    }
    if(scoreright > 0.2){
    circle(RightwristX,RightwristY,20)
    if(RightwristY > 0 && RightwristY <= 50){
        document.getElementById("velocidad").innerHTML = "velocidad 0.5x"
        musicaa.rate(0.5)
    }
    else if(RightwristY > 50 && RightwristY <=100){
        document.getElementById("velocidad").innerHTML = "velocidad 1x"
        musicaa.rate(1)
    }
    else if(RightwristY > 100 && RightwristY <= 150){
        document.getElementById("velocidad").innerHTML = "velocidad 1.5x"
        musicaa.rate(1.5)
    }
    else if(RightwristY > 150 && RightwristY <= 200){
        document.getElementById("velocidad").innerHTML = "velocidad 2x"
        musicaa.rate(2)
    }
    else if(RightwristY > 200 && RightwristY <= 250){
        document.getElementById("velocidad").innerHTML = "velocidad 2.5x"
        musicaa.rate(2.5)
    }
    else if(RightwristY > 250 && RightwristY <= 300){
        document.getElementById("velocidad").innerHTML = "velocidad 3x"
        musicaa.rate(3)
    }
    }
    
}
function reproducir(){
    musicaa.play()
    musicaa.setVolume(0.4)
    musicaa.rate(1)
}
function end(){
    musicaa.stop()
}
