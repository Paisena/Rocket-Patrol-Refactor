// Name: Jonathan Ng
// Rocket Patrol: The ReLoadening
// Approximate Time : 8 HR
// Mods: Implement the speed increase that happens after 30 seconds in the original game (1),
//  Implement the 'FIRE' UI text from the original game (1), 
//  Randomize each spaceship's movement direction at the start of each play (1),
//  Create a new scrolling tile sprite for the background (1),
//  Create 4 new explosion sound effects and randomize which one plays on impact (3)
//  Display the time remaining (in seconds) on the screen (3)
//  Create a new title screen (e.g., new artwork, typography, layout) (3)
//  Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
//  Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)



//Ciataion :timer from :https://www.joshmorony.com/how-to-create-an-accurate-timer-for-phaser-games/
// Change volume from :https://stackoverflow.com/questions/51601926/how-to-set-volume-in-phaser-3

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

let keyFIRE, keyRESET, keyLEFT, keyRIGHT

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

