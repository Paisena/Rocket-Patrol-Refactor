class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {

        // two player mode
        this.whosPlaying = false;

        //30 second speed up variables
        this.shipSpeedBoost = 0;
        this.bulletSpeedBoost = 0;

        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        // add spaceships (x3)

        this.ship01Dir = Math.round(Math.random() * 1)
        this.ship02Dir = Math.round(Math.random() * 1)
        this.ship03Dir = Math.round(Math.random() * 1)
        this.ship04Dir = Math.round(Math.random() * 1)

        this.ship01 = new Spaceship(this, game.config.width * this.ship01Dir + borderUISize*6 , borderUISize*4, 'spaceship', 0, 30, this.ship01Dir).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width * this.ship02Dir + borderUISize*3 , borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, this.ship02Dir).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width * this.ship03Dir, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, this.ship03Dir).setOrigin(0, 0)
        this.ship04 = new Spaceship2(this, game.config.width * this.ship04Dir, borderUISize*6 + borderPadding*4 + 60, 'spaceship2', 0, 50, this.ship04Dir).setOrigin(0.20)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // initialize score
        this.p1Score = 0
        this.timeTxt = game.settings.gameTimer / 1000

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        this.fireUI = this.add.text(game.config.width / 2 - 50 , borderUISize + borderPadding*2, "FIRE", fireConfig)
        this.timerUI = this.add.text(game.config.width / 2 + 50 , borderUISize + borderPadding*2, this.timeTxt, timeConfig)
        

        
        // GAME OVER flag
        this.gameOver = false

        // 60-second play clock
        scoreConfig.fixedWidth = 0
        
        this.speedClock = this.time.delayedCall(30000, () => {
            this.ship01.speedUp()
            this.ship02.speedUp()
            this.ship03.speedUp()
            this.ship04.speedUp()
            this.p1Rocket.speedUp()
        })

        
        this.musicConfig = {
            mute: false,
            volume: 0.05,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        
            // source of the spatial sound
            source: {
                x: 0,
                y: 0,
                z: 0,
                panningModel: 'equalpower',
                distanceModel: 'inverse',
                orientationX: 0,
                orientationY: 0,
                orientationZ: -1,
                refDistance: 1,
                maxDistance: 10000,
                rolloffFactor: 1,
                coneInnerAngle: 360,
                coneOuterAngle: 0,
                coneOuterGain: 0,
                follow: undefined
            }
        }
        this.music = this.sound.add('music')
        this.music.play(this.musicConfig)
        


        
        

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to switch teams <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
            
        }, null, this)

        this.startTime = new Date()

        
    }

    update() {

        var currentTime = new Date();
        var timeDifference = this.startTime.getTime() - currentTime.getTime();

        if(this.timeTxt > 0)
        {
            this.timeElapsed = Math.abs(timeDifference / 1000);
        }
        if (this.timeElapsed >= 1) {
            console.log("hi")
            this.startTime = new Date()
            this.timeTxt -= 1;
            this.timerUI.text = this.timeTxt
            this.timeElapsed = 0;
        }
        

        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.music.stop()
            this.scene.restart()

        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene")
        }

        this.starfield.tilePositionX -= 4
        if(!this.gameOver){
            this.p1Rocket.update()
            this.ship01.update()    //update spaceship (x3)
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()
        }
        

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship04)
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
          }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking 
        if( rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height && 
            rocket.height + rocket.y > ship.y) {
            return true
        } else {
            return false
        }
    }

    shipExplode(ship) {
        
        
        
        
        // temporarily hide ship 
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        this.whichExp = Math.floor(Math.random() * 4)
        boom.anims.play('explode')  // play explode animation 
        boom.on('animationcomplete', () => {    //callback after anim completes
            ship.reset()    // reset ship position
            ship.alpha = 1  // make ship visible again
            boom.destroy()  // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        if (this.whichExp == 0) {
            this.sfx1 = this.sound.add('sfx-explosion01', {volume: 0.1});
            this.sfx1.play()
        }
        if (this.whichExp == 1) {
            this.sfx2 = this.sound.add('sfx-explosion02', {volume: 0.1});
            this.sfx2.play()
        }
        if (this.whichExp == 2) {
            this.sfx3 = this.sound.add('sfx-explosion03', {volume: 0.1});
            this.sfx3.play()
        }
        if (this.whichExp == 3) {
            this.sfx4 = this.sound.add('sfx-explosion04', {volume: 0.1});
            this.sfx4.play()
        }
    }
}