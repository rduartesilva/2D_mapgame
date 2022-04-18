var keyCount = 0;
var acabado = false;
var acabado1 = false;

var CenaMundo = new Phaser.Class ({

    Extends : Phaser.Scene,

    initialize  :

    function CenaMundo() {
        
        Phaser.Scene.call(this, { key : 'CenaMundo'});

    },

    preload : function() {
        // -- load de conteúdos/assets
        // -- tiles que vão ser usados no mapa
        this.load.image('tiles', 'assets/map/Overworld.png');
        this.load.image('inimigo', 'assets/inimigo1.png');
        this.load.image('treasure', 'assets/treasure.png');
        this.load.image('key', 'assets/key1.png');
        this.load.audio('som', 'assets/audio/fundo.mp3');
        this.load.audio('auch', 'assets/audio/ouch.wav');
        
        // -- Mapa em formato JSON
        this.load.tilemapTiledJSON('map', 'assets/map/novomapa2.json');

        // -- ficheiro com 4 personagens ( vamos usar uma delas )
        this.load.spritesheet('player', 'assets/character.png',
                            {
                                frameWidth : 16, 
                                frameHeight: 32,
                            });
    },

    create  : function() {
        this.som = this.sound.add('som', { loop: true });
        this.auch = this.sound.add('auch', { loop: false });
        this.som.play();
        // -- criar o "mundo" do jogo
        var mapa = this.make.tilemap ({ key : 'map' });

        // -- obter o nome de um tileset 
        // -- chamado "spritesheet"
        // -- disponivel no ficheiro JSON
        var tiles = mapa.addTilesetImage('spritesheet', 'tiles', 16, 16);

        // -- obter a layer "Relva" e adicionar ao mapa
        var relva = mapa.createStaticLayer('Relva', tiles, 0, 0 );

        // -- obter a layer "Obstaculos" e adicionar ao mapa
        var obstaculos = mapa.createStaticLayer('Obstaculos', tiles, 0, 0);

        // -- adição do tesouro
        this.treasure = this.physics.add.sprite(450, this.sys.game.config.height / 2, 'treasure');
        this.treasure.setScale(0.6);

        // -- adição do tesouro
        this.key = this.add.sprite(Phaser.Math.RND.between(350, 410),Phaser.Math.RND.between(0, 450) , 'key');
        this.key.setScale(0.6);

        // -- obstaculos estarão disponíveis para colisão
        obstaculos.setCollisionByExclusion( [-1] );

        // -- adição do player (frame 6)
        this.player = this.physics.add.sprite(50, 100, 'player', 0);

        // -- limit o movimento do player à área de jogo
        this.physics.world.bounds.width = mapa.widthInPixels;
        this.physics.world.bounds.height = mapa.heightInPixels;
        this.player.setCollideWorldBounds(true);
        

        // -- input - interação com as 4 setas de direção
        this.cursors = this.input.keyboard.createCursorKeys();

        // -- colocar a camera a seguir o player
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);

        this.cameras.main.startFollow(this.player);

        // -- adição de colisão do player com os obstáculos
        this.physics.add.collider(this.player, obstaculos);

        // -- adicao de colisao do player com a chave
        this.physics.add.collider(this.player, this.key);
        

        // -- animação do player 
        this.anims.create({
            key: 'esquerdadireita', 
            frames: this.anims.generateFrameNumbers('player', { frames: [18, 19, 20, 21] } ),
            frameRate: 10,
            repear: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {frames: [36, 37, 38, 39]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {frames: [0, 1, 2, 3]}),
            frameRate: 10,
            repeat: -1
        });


        // group of enemies
        this.enemies = this.physics.add.group({
            key: 'inimigo',
            repeat: 2,
            flipY: -1,
            setXY: {
                x: 310,
                y: 50,
                stepX: -20,
                stepY: 130,
            }
        });

        this.physics.add.collider(obstaculos, this.enemies);

        //scale enemies 
        Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

        // set speeds
        Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
            enemy.speed = 2 + Math.random() * 1.5;
        }, this);
        
        
    },

    update  : function() {
        
        this.player.body.setVelocity(0);
        // -- movimento horizontal e vertical  do player
        if(this.cursors.left.isDown){
            this.player.body.setVelocityX(-80);
        } else if(this.cursors.right.isDown){
            this.player.body.setVelocityX(80);
        } else if(this.cursors.up.isDown){
            this.player.body.setVelocityY(-80);
        } else if(this.cursors.down.isDown){
            this.player.body.setVelocityY(80);
        }


        // -- animaçoes do player
        if(this.cursors.left.isDown){
            this.player.anims.play('esquerdadireita', true);
            this.player.flipX = true;
        }else if(this.cursors.right.isDown) {
            this.player.anims.play('esquerdadireita', true);
            this.player.flipX = false;
        }else if(this.cursors.up.isDown){
            this.player.anims.play('up', true);
        }else if(this.cursors.down.isDown){
            this.player.anims.play('down', true);
        }else {
            this.player.anims.stop();
        }

        //enemy movement
        let enemies = this.enemies.getChildren();
        let numEnemies = enemies.length;

        for(let i=0; i < numEnemies; i++){

            //move enemies
            enemies[i].y += enemies[i].speed;
    
            // reverse movement if reached the edges
            if(enemies[i].y >= 462 && enemies[i].speed > 0){
                enemies[i].speed *= -1;
            }else if(enemies[i].y <= 16 && enemies[i].speed < 0){
                enemies[i].speed *= -1;
            }   

            // inverter as direções dos inimigos ao colidir com os obstaculos
            if(enemies[0].y >= 0 && enemies[0].y < 102){
                enemies[0].speed *= 1;
            }else{
                enemies[0].speed *= -1;
            }
            if(enemies[1].y >= 140 && enemies[1].y < 245){
                enemies[1].speed *= 1;
            }else{
                enemies[1].speed *= -1;
            }
            if(enemies[2].y >= 283 && enemies[2].y < 470){
                enemies[2].speed *= 1;
            }else{
                enemies[2].speed *= -1;
            }
    
        }

        //colisao com a chave
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.key.getBounds()) && keyCount <= 1){
            this.key.destroy();
            keyCount = 1;
            console.log(keyCount);
        }

        // colisao do player com o tesouro
        this.physics.add.overlap(this.player, this.treasure, this.colisaoTesouro);

        //colisao do player com os inimigos
        this.physics.add.overlap(this.player, this.enemies, this.gameOver);

        // verifica se o jogo terminou 
        if(acabado == true){
            this.auch.play();
            acabado = false;
            this.som.stop();
            this.scene.start('CenaOverLost');
        };
        if(acabado1 == true){
            acabado1 = false;
            this.som.stop();
            this.scene.start('CenaOver');
        };
        
        
    },

    // colisao do tesouro
    colisaoTesouro: function(player, tesouro){
        if(keyCount == 1){
            acabado1 = true;
        }else if(keyCount == 0){
            console.log("key missing");
        }
    },

    // gameOver 
    gameOver : function(){
        acabado = true;
    },
});
