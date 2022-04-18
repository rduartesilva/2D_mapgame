var CenaInicial = new Phaser.Class ({

    Extends : Phaser.Scene,

    initialize  : 

    function CenaInicial(){
        Phaser.Scene.call(this, { key   : 'CenaInicial' });
    },

    preload : function() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('play', 'assets/play1.png');
        this.load.image('instrucao', 'assets/instrucao.png');
        this.load.image('spider', 'assets/spider.png');
    },   

    create  : function(){
        console.log("olaInicial");

        this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, 'background').setDepth(0).setScale(1.7);

        let playButton = this.add.image(this.game.renderer.width /2 , this.game.renderer.height / 2 + 150, 'play').setDepth(1).setScale(0.2);

        this.add.text(this.game.renderer.width /2 -85, this.game.renderer.height / 4 - 50, "Instructions", {fontSize: 28});
        this.add.text(this.game.renderer.width /2 - 225, this.game.renderer.height / 2 - 100 , "Hurry! We need the key in order to save the planet.", {fontSize: 15});
        this.add.text(this.game.renderer.width /2 - 120, this.game.renderer.height / 2 - 75, "The world is counting on you!", {fontSize: 15});
        this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2 + 40, 'instrucao').setDepth(1).setScale(0.4);
        
        playButton.setInteractive();

        playButton.on('pointerdown', () => this.scene.start('CenaMundo') );
    }

});