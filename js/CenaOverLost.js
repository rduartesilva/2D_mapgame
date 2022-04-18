var CenaOverLost = new Phaser.Class ({

    Extends : Phaser.Scene,

    initialize  : 

    function CenaOverLost(){
        Phaser.Scene.call(this, { key   : 'CenaOverLost' });
    },

    preload : function() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('play', 'assets/play1.png');
        this.load.image('instrucao', 'assets/instrucao.png');
    },   

    create  : function(){

        this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, 'background').setDepth(0).setScale(1.7);

        let playButton = this.add.image(this.game.renderer.width /2 , this.game.renderer.height / 2 + 100, 'play').setDepth(1).setScale(0.2);

        this.add.text(this.game.renderer.width /2 - 70, this.game.renderer.height / 4 - 50, "You Lost!", {fontSize: 28});
        this.add.text(this.game.renderer.width /2 - 80, this.game.renderer.height / 2 - 100 , "The planet is gone.", {fontSize: 15});
        this.add.text(this.game.renderer.width /2 - 90, this.game.renderer.height / 2 + 50, "Click the button to try again", {fontSize: 10});
        
        playButton.setInteractive();

        playButton.on('pointerdown', () => this.scene.start('CenaInicial') );

    }

});