var game = new Phaser.Game(640, 480, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var toybox;
var settings = {
    gravity: 980,
    demoMode: true,
    plugins: ["alien", "platform", "chest", "slime", "button", "backdrop", "crate"]
};

//VARIABLES
var screen = "mainMenu";
var levelNumber = 1;


function preload() {
    toybox = new Toybox(game, settings);
    toybox.preload();
}

//Main Menu Array
var objectsToBeKilled = []

mainMenu = function () {
        //Player
            player = toybox.add.alien({
                startingX: 10,
                startingY: 350,
                color: "blue",
                scale: 2,
                speed: 200,
                jumpForce: 400,
            });
            
        //Health Display
            healthDisplay = toybox.add.text(20, 10, "Player Health: " + player.health, {fill: "#ffffff", fontSize: 20});
            
        //Platform
            floorPlatform = toybox.add.platform({
                startingX: 0,
                startingY: 445,
                width: 640,
                height: 75,
                type: 0,
            });
            
        //Backdrop
            backdrop = toybox.add.backdrop({
                preset: "fall",
            });
            
        //STICK
        createStick(game.world.centerX - 10, game.world.centerY + 100)
            
        //Text
            //Main Menu
            MainMenuText = toybox.add.text(200, 10, "Main Menu", {fill: "#ffffff", fontSize: 40});
            objectsToBeKilled.push(MainMenuText);
            
            //Grab stick to start
            MainMenuStartByText = toybox.add.text(200, 200, "Grab stick to get started!", {fontSize: 20});
            objectsToBeKilled.push(MainMenuStartByText);
            
    };//End Function

  
//Level functions  
level1 = function () {
    
        healthDisplay.kill();
            
        //"stick"
            stick = toybox.add.chest({
                startingX: 450,
                startingY: 300,
                color: "gold",
                killTime: 0,
                scale: 2,
                collideWorld: "false",
                onOpen:clearLoadedLevel,
            });
            objectsToBeKilled.push(stick);
            
        //Monsteeeer
            monster = toybox.add.slime({
                startingX: 100,
                startingY: 300,
                scale: 2,
                color: "green",
                facing: "left",
            });
            objectsToBeKilled.push(monster);
            
        //Crates Trapping Monster
            crate1 = toybox.add.crate({
                startingX: 160,
                startingY: 400,
                scale: 2,
                immovable: true,
                allowGravity: false,
            });
            objectsToBeKilled.push(crate1);
            crate2 = toybox.add.crate({
                startingX: 70,
                startingY: 400,
                scale: 2,
                immovable: true,
                allowGravity: false,
            });
            objectsToBeKilled.push(crate2);
            
        //Help Text
            text = toybox.add.text(20, 10, "Grab the Stick to move on to the next level, watch out for", {fill: "#ffffff", fontSize: 20});
            objectsToBeKilled.push(text);
            
            text2 = toybox.add.text(20, 35, "monsters! Use Up Arrow to jump on and kill them.", {fill: "#ffffff", fontSize: 20});
            objectsToBeKilled.push(text2);
        
    };//End Function
    
level2 = function () {
        
        //Health
            healthDisplay = toybox.add.text(20, 10, "Player Health: " + player.health, {fill: "#ffffff", fontSize: 20});
        
        //Text
            helpText = toybox.add.text(20, 35, "You start out with 3 health, but jump on that powerup over there", {fill: "#ffffff", fontSize: 20});
            objectsToBeKilled.push(helpText);
        
        //Health PowerUp
            healthPowerUp = toybox.add.button({
                startingX: game.world.centerX - 10,
                startingY: 300,
                color: "red",
                scale: 2,
                onPress: level2HealthPowerUpTextDisplay,
            });
            objectsToBeKilled.push(healthPowerUp);
         
        //After FIRST, ONLY FIRST, Health Button Press in THIS LEVEL
            function level2HealthPowerUpTextDisplay() {
            healthUpButtonPressed();
            
            helpText.text = "BOOM! + 1 Health!";
            
            createStick(450, 300);
        };
        
};//End Function

level3 = function () {
    
    //Level Display
    levelDisplay = toybox.add.text(20, 30, "Level: " + levelNumber, {fill: "#ffffff", fontSize: 20});
    objectsToBeKilled.push(levelDisplay);
    
    //Bottom Platform
    createPlatform(320, 350, 200);
    
    //Mid Left Platform
    createPlatform(100, 270, 200);
    
    //Mid Right Platform
    createPlatform(550, 270, 200);
    
    //Top Mid Platform
    createPlatform(320, 190, 200);
    
    createStick(320, 250);
    
    createHealthPowerUp(320, 100);
    
    createSlime(250, 100);
    
    createSlime(450, 100);
    
};//End Function

level4 = function () {

    //Level Number Display
        levelDisplay = toybox.add.text(20, 30, "Level: " + levelNumber, {fill: "#ffffff", fontSize: 20});
        objectsToBeKilled.push(levelDisplay);
        
    //Stick
        createStick(game.world.centerX, 90);
        
    //Jump Boost Power Up
    createJumpBoostPowerUp(game.world.centerX, 350);
    
    //Help Text
    text = toybox.add.text(200, 10, "Ooooh! A Jump Boost! ༼ʘ̚ل͜ʘ̚༽", {fill: "#ffffff", fontSize: 20});
    objectsToBeKilled.push(text);
    
    //Platform
    createPlatform(game.world.centerX, game.world.centerY + 50, 200);

};//End Function

level5 = function () {

    //Level Number Display
        levelDisplay = toybox.add.text(20, 30, "Level: " + levelNumber, {fill: "#ffffff", fontSize: 20});
        objectsToBeKilled.push(levelDisplay);
        
    //Middle platform
    createPlatform(game.world.centerX, game.world.centerY + 50, 200);
    
    //Left platform
    createPlatform(game.world.centerX - 450, game.world.centerY - 100, 200);
    
    //Right platform
    createPlatform(game.world.centerX + 450, game.world.centerY - 100, 200);
    
    //Powerups
    createHealthPowerUp(game.world.centerX + 200, 350);
    createJumpBoostPowerUp(game.world.centerX - 200, 350);
    
    //Divider
    createPlatform(game.world.centerX, game.world.centerY, 75, 100);
    

};//End Function


//Slime Create Function
function createSlime(X, Y) {
    monster = toybox.add.slime({
                startingX: X,
                startingY: Y,
                scale: 2,
                color: "green",
                onKill: level4,
            });
            objectsToBeKilled.push(monster);
};

//Health Power Up Functions    
function createHealthPowerUp(X, Y) {
    healthPowerUp = toybox.add.button({
                startingX: X,
                startingY: Y,
                color: "red",
                scale: 2,
                onPress: healthUpButtonPressed,
            });
            objectsToBeKilled.push(healthPowerUp);
};//End Function

function healthUpButtonPressed() {
    player.health++;
    healthPowerUp.kill();
};//End Function

//Jump Boost Up Functions    
function createJumpBoostPowerUp(X, Y) {
    JumpBoostPowerUp = toybox.add.button({
                startingX: X,
                startingY: Y,
                color: "blue",
                scale: 2,
                onPress: JumpBoostButtonPressed,
            });
            objectsToBeKilled.push(JumpBoostPowerUp);
};//End Function

function JumpBoostButtonPressed() {
    player.jumpForce = 600;
    JumpBoostPowerUp.kill();
};//End Function


//STICK
function createStick(X, Y) {
    stick = toybox.add.chest({
        startingX: X,
        startingY: Y,
        color: "gold",
        killTime: 0,
        scale: 2,
        allowGravity: false,
        onOpen:clearLoadedLevel,
});
    objectsToBeKilled.push(stick);
};//End Function

//Platform
function createPlatform(X, Y, W, H) {
    platform = toybox.add.platform({
        startingX: X,
        startingY: Y,
        width: W,
        height: H || W/6,
        type: 0,
    });
    objectsToBeKilled.push(platform);
};//End Function



function clearLoadedLevel() {
        for (i = 0; i < objectsToBeKilled.length; i++) { 
            objectsToBeKilled[i].kill();
        }
        
        window["level" + levelNumber]()
        levelNumber++;
        
        player.jumpForce = 400;
        
        player.x = 10;
        player.y = 350;
        
    };//End Function


function create() {
    toybox.create();
    
    if (screen == "mainMenu") {
        mainMenu();
    }
 
}//End Function


function update() {
    toybox.update();
    
    healthDisplay.text = "Player Health: " + player.health;
    
}//End Function