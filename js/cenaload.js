var CenaLoad = new Phaser.Class ({

    extends : Phaser.Scene,

    initialize  : 

    function CenaLoad(){
        Phaser.Scene.call(this, { key   : 'CenaLoad' });
    },

    preload : function() {
        // -- load de conteúdos/assets
        // -- tiles que vão ser usados no mapa
        this.load.image('tiles', 'assets/map/Overworld.png');
        this.load.image('inimigo', 'assets/inimigo1.png');
        this.load.image('treasure', 'assets/treasure.png');
        this.load.image('key', 'assets/key1.png');
        
        // -- Mapa em formato JSON
        this.load.tilemapTiledJSON('map', 'assets/map/novomapa2.json');

        // -- ficheiro com 4 personagens ( vamos usar uma delas )
        this.load.spritesheet('player', 'assets/character.png',
                            {
                                frameWidth : 16, 
                                frameHeight: 32,
                            });
                             
    },

    create  : function(){
        this.scene.start('CenaInicial'); 
    }

});