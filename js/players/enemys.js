let nomes = ["170 questão de algebra", "P4 de C2", "GECTI e facil", "tcc", "Algebra linear","falta 1h para entregar e nem comecei","tou com dois 0 da para passar?", "abri o multiprova e tem 3 lista","me da nota" ]
var spawn = true
class Enemys extends Player {
    constructor({
        collisionlimitsBlock = [],
        position,
        velocity,
        scale,
        sprites,
        offset,
        size,
        lifeTotal,
        attackDamange,
        exist,
        name,
        map,
    }) {
        super({
            collisionlimitsBlock,
            position,
            velocity,
            scale,
            sprites,
            offset,
            lifeTotal,
            attackDamange,
            exist,
            name,
            map,
        })
        this.position = position
        this.size = size
        this.exist = exist
        this.map = map
        this.velocity = {
            x:0,
            y:0,
        }
        this.base= {
            velocity: 1,
            jump: 1,
        }

        this.attackBox={
            position: this.position,
            size: this.attackBox.size
        }
        this.hitting = false

        this.sprites
        this.name = name
        this.lifeTotal = lifeTotal

        this.isAttacking = false
        this.attackCooldown = 5000
        this.onAttackCooldown
        this.attackDamange = attackDamange

    }

    chase(){
        if(((mainPlayer.position.y+1.5*mainPlayer.size.height)>(this.position.y))&&(mainPlayer.position.y<(this.position.y+2*this.size.height))){
        if((this.position.x < mainPlayer.position.x)&&((mainPlayer.position.y+mainPlayer.size.height)>this.position.y)&&!this.isAttacking){
            this.velocity.x = this.base.velocity;
            this.facing = 'right'
            this.setSprite("running")
        }else if((this.position.x > mainPlayer.position.x)&&((mainPlayer.position.y+mainPlayer.size.height)>this.position.y)&&!this.isAttacking){
            this.velocity.x = -this.base.velocity;
            this.facing = 'left'
            this.setSprite("running")
        }}
        else if(!this.isAttacking){this.velocity.x = 0
            this.setSprite("idle")}
        
        
        if(((Math.abs((this.position.x+this.size.width/2)-(mainPlayer.position.x+mainPlayer.size.width/2)))<(this.attackBox.size.width+this.size.width/2))&&(Math.abs((mainPlayer.position.y+mainPlayer.size.height)-(this.position.y+this.size.height))<100)&&!paused){
            this.velocity.x = 0  
            this.AttackcheckHit(this,mainPlayer)
            this.attack()
            
        }
    }
    live(){
    this.animate() 
    

    if(this.name == "Professor Misterioso"&& this.atualLife== "dead"){
        win = true
    }    
    
    if(this.name == "Professor Misterioso"&& this.atualLife<this.lifeTotal/2&&spawn){
        let count = 0
        
        
        for(i=0;i<3;i++){
            spawnEnemy(Zombie,this.position.x+(Math.random()*1000),this.position.y,this.map,70)
            enemy[enemy.length-1].name = "monitor"
            console.log("spawn")
            if(count = 3){
                spawn = false
            }
        }
        
        
    }

    if(this.atualLife > 0){
        this.chase()
    
    }else{
        if(this.atualLife != 'dead'){
            itemDrop(Math.ceil(Math.random()*10),this.position.x,this.position.y)
        }
        
        this.velocity.x = 0;
        this.setSprite("dead")
        
    }

    }
}


class Zombie extends Enemys {
    constructor({
        collisionlimitsBlock = [],
        position,
        lifeTotal,
        attackDamange,
        exist,
        name,
        map,
    }) {
        super({
            collisionlimitsBlock,
            position,
            lifeTotal,
            attackDamange,
            exist,
            name,
            map,
        })
        this.position = position
        this.size = {
            width:60,
            height:130
        }

        this.velocity = {
            x:0,
            y:0,
        }

        this.base= {
            velocity: 1,
            jump: 1,
        }

        this.attackBox={
            position: this.position,
            size:{
                width:50,
                height:100
            }
        }
        this.debugColor ='rgba(255,0,255,0.5)'
        this.scale = 1.8
        this.map = map
        this.sprites = {
            idle: {
                src: "./data/npc/zombie/Idle.png",
                totalSpriteFrames: 8,
                framesPerSpriteFrame: 10
            },
            running: {
                src: "./data/npc/zombie/Run.png",
                totalSpriteFrames: 7,
                framesPerSpriteFrame: 12
            },
            jumping: {
                src: "./data/player/jump.png",
                totalSpriteFrames: 19,
                framesPerSpriteFrame: 8
            },
            attacking: {
                src: "./data/npc/zombie/Attack_1.png",
                totalSpriteFrames: 5,
                framesPerSpriteFrame: 30
            },
            dead:{
                src: "./data/npc/zombie/Dead.png",
                totalSpriteFrames: 5,
                framesPerSpriteFrame: 3 
            }
        }

        this.offset={
            left: -115,
            right: -55,
            y: 23
        }    

        this.lifeTotal = 100
        this.atualLife = lifeTotal
        this.isAttacking
        this.attackCooldown = 500
        this.onAttackCooldown
        this.attackDamange = attackDamange

    }
}

function spawnEnemy(type,PositionX,PositionY,mapa,life){
    
    enemy[enemy.length] = new type({
        collisionlimitsBlock,
        position:{
            x:PositionX,
            y:PositionY,
        },
        facing: 'left',
        lifeTotal: life,
        attackDamange:5,
        name: nomes[Math.floor(Math.random()*nomes.length)],
        map: mapa
        
    })
    
    }


    class Boss extends Enemys {
        constructor({
            collisionlimitsBlock = [],
            position,
            lifeTotal,
            attackDamange,
            exist,
            name,
            map,
            
        }) {
            super({
                collisionlimitsBlock,
                position,
                lifeTotal,
                attackDamange,
                exist,
                name,
                map,
                
            })
            this.position = position
            this.size = {
                width:200,
                height:330
            }
    
            this.velocity = {
                x:0,
                y:0,
            }
    
            this.base= {
                velocity: 1,
                jump: 1,
            }
    
            this.attackBox={
                position: this.position,
                size:{
                    width:100,
                    height:300
                }
            }
            this.debugColor ='rgba(255,0,255,0.5)'
            this.scale = 0.7
            this.map = map
            this.name = "Professor Misterioso"
            this.sprites = {
                idle: {
                    src: "./data/npc/boss/idle.png",
                    totalSpriteFrames: 1,
                    framesPerSpriteFrame: 100
                },
                running: {
                    src: "./data/npc/boss/idle.png",
                    totalSpriteFrames: 1,
                    framesPerSpriteFrame: 100
                },
                attacking: {
                    src: "./data/npc/boss/attack.png",
                    totalSpriteFrames: 1,
                    framesPerSpriteFrame: 100
                },
                dead:{
                    src: "",
                    totalSpriteFrames: 1,
                    framesPerSpriteFrame: 100
                }
            }
    
            this.offset={
                left: -190,
                right: 25,
                y: 23
            }    
    
            this.lifeTotal = 200
            this.atualLife = lifeTotal
    
            this.isAttacking
            this.attackCooldown = 500
            this.onAttackCooldown
            this.attackDamange = 10
    
        }

    }