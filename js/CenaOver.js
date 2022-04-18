var CenaOver = new Phaser.Class ({

    Extends : Phaser.Scene,

    initialize  : 

    function CenaOver(){
        Phaser.Scene.call(this, { key   : 'CenaOver' });
    },

    preload : function() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('play', 'assets/play1.png');
        this.load.image('instrucao', 'assets/instrucao.png');
        this.load.image('spider', 'assets/spider.png');
    },   

    create  : function(){
        this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, 'background').setDepth(0).setScale(1.7);

        let playButton = this.add.image(this.game.renderer.width /2 , this.game.renderer.height / 2 + 100, 'play').setDepth(1).setScale(0.2);

        this.add.text(this.game.renderer.width /2 - 50, this.game.renderer.height / 4 - 50, "You Won", {fontSize: 28});
        this.add.text(this.game.renderer.width /2 - 150, this.game.renderer.height / 2 - 100 , "The planet is saved thanks to you!", {fontSize: 15});
        this.add.text(this.game.renderer.width /2 - 90, this.game.renderer.height / 2 + 50, "Click the button to play again", {fontSize: 10});
        
        playButton.setInteractive();

        playButton.on('pointerdown', () => this.scene.start('CenaInicial') );
    }

});