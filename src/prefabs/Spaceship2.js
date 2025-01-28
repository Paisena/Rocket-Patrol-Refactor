class Spaceship2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, dir) {
        super(scene, x, y, texture, frame) 
        scene.add.existing(this) // add to existing scene
        this.points = pointValue // store pointValue
        if (dir == 0)
        {
            dir = -1
        }
        this.dir = dir
        this.moveSpeed = (game.settings.spaceshipSpeed + 4) * dir //spaceship speed in pixels/frame
    }

    speedUp() {
        this.moveSpeed *= 2;
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed

        //wrap fram left to right edge
        if(this.x <= 0 - this.width && this.dir == 1) {
            this.x = game.config.width
        }
        else if (this.x >= game.config.width && this.dir == -1) {
            this.x = 0 - this.width
        }
    }

    reset() {
        if(this.dir == 1){
            this.x = game.config.width
        }
        else if (this.dir == -1) {
            this.x = 0 - this.width;
        }
        
    }
}