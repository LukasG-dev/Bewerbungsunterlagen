const app = new PIXI.Application({
    width: 1300,
    height: 850,
});
const ufoList = [];
document.body.appendChild(app.view);

const rocket = PIXI.Sprite.from('assets/rocket.png');
rocket.x = 600;
rocket.y= 650;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);

const emoji = "😨"+"\uD83D\uDE80"+"💥"+"😨";


function showGameOverMessage() {
    const message = new PIXI.Text("Game Over! \n" + emoji, {
        fontFamily: "Arial",
        fontSize: 72,
        fill: 0xff0000,
        algin: "Center",
    });
    message.x = app.view.width / 2 - message.width / 2;
    message.y = app.view.height / 2 - message.height / 2;
    app.stage.addChild(message);
}

gameInterval(function() {
    const ufo1 = PIXI.Sprite.from('assets/ufo2.png');
    ufo1.x = random(0, 1275);
    ufo1.y= -25;
    ufo1.scale.x = 0.1;
    ufo1.scale.y = 0.1;
    app.stage.addChild(ufo1);
    flyDown(ufo1, 2);

    waitForCollision(ufo1, rocket).then(function(){
        app.stage.removeChild(rocket);
        stopGame();
        showGameOverMessage();
    });
}, 2000);

gameInterval(function() {
    const ufo = PIXI.Sprite.from('assets/ufo1.png');
    ufo.x = random(0, 1275);
    ufo.y= -25;
    ufo.scale.x = 0.1;
    ufo.scale.y = 0.1;
    app.stage.addChild(ufo);
    flyDown(ufo, 1);

    ufoList.push(ufo)

    waitForCollision(ufo, rocket).then(function(){
        app.stage.removeChild(rocket);
        stopGame();
        showGameOverMessage();
    });
}, 1000);

function leftKeyPressed(){
    if (rocket.x > 0){
        rocket.x = rocket.x - 5;
    }
}
function rightKeyPressed(){
    if (rocket.x < 1300){
        rocket.x = rocket.x + 5;
    }
    
}

function spaceKeyPressed() {
    const bullet = PIXI.Sprite.from('assets/bullet.png');
    bullet.x = rocket.x + 15;
    bullet.y = rocket.y;
    bullet.scale.x = 0.04;
    bullet.scale.y = 0.04;
    flyUp(bullet);
    app.stage.addChild(bullet);
    

    
    let collision = waitForCollision(bullet, ufoList).then(function([bullet, ufo]) {
        app.stage.removeChild(bullet); 
        app.stage.removeChild(ufo);
    });
}




