var config = {
    type    : Phaser.CANVAS,
    parent  : 'conteudo',
    width   : 480,
    height  : 420,
    zoom    : 2,
    pixelArt: true,

    physics : {
        default :'arcade',
        arcade  : {
            gravity : { y:0 },
            debug   : false
        }
    },

    scene   : [
        CenaLoad, CenaInicial, CenaMundo, CenaOver, CenaOverLost
    ]
};

var game = new Phaser.Game(config);