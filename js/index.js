//----------------variables and const's----------------------//
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
var win = false
var currentMap = 0



var enemy = []
var object = []
const canvasWidth = window.innerWidth*0.8
const canvasHeight = window.innerHeight*0.8

var collisionlimitsBlock = []

var paused = true;
var inventoryOpen = false;

const camera = {
    position:{
        x:0,
        y:0
    },
}


//starters mobs and player



const mainPlayer = new Player({
    collisionlimitsBlock,
    position:{
        x:100,
        y:1200,
    },
    size: {
        width: 100,
        height: 110,           
    },
    debugColor:'rgba(0,125,255,0.5)',
    lifeTotal:100,
    scale: 3,
    sprites: {
        idle: {
            src: "./data/player/idle.png",
            totalSpriteFrames: 18,
            framesPerSpriteFrame: 10
        },
        running: {
            src: "./data/player/run.png",
            totalSpriteFrames: 24,
            framesPerSpriteFrame: 3
        },
        jumping: {
            src: "./data/player/jump.png",
            totalSpriteFrames: 19,
            framesPerSpriteFrame: 8
        },
        attacking: {
            src: "./data/player/attack.png",
            totalSpriteFrames: 26,
            framesPerSpriteFrame: 5
        }
    },
    offset: {
        left: -130,
        right: -30,
        y: 22
    },  
    sound: {
        idle: {
            src: "./data/player/sound/idle.mp3", 
        },
        running: {
            src: "./data/player/sound/running.mp3",
        },
        jumping: {
            src: "./data/player/sound/jump.mp3",
        },
        attacking: {
            src: "./data/player/sound/attack.mp3"
        }
    },
    attackDamange: 25 
})





//-----------------------------------------------------------//
//resize canvas to windon lenght and height ratio
function resizeCanvas(){
canvas.width = window.innerWidth*0.8
canvas.height = window.innerHeight*0.8
mainPlayer.camerabox.size.width = window.innerWidth*0.8
mainPlayer.camerabox.size.height = window.innerHeight*0.8
}
//resize event
window.addEventListener('resize', resizeCanvas)

ChangeMap(map1)



//spawn Enemys on fase 1 
spawnEnemy(Zombie,2000,1600,currentMap.name,100)
spawnEnemy(Zombie,2210,1600,currentMap.name,100)
spawnEnemy(Zombie,2600,1600,currentMap.name,100)
spawnEnemy(Zombie,3010,1600,currentMap.name,100)
spawnEnemy(Zombie,600,1200,currentMap.name,100)
spawnEnemy(Zombie,1210,800,currentMap.name,100)

spawnEnemy(Zombie,3000,1600,currentMap.name,100)
spawnEnemy(Zombie,3210,1600,currentMap.name,100)
spawnEnemy(Zombie,36000,1600,currentMap.name,100)
spawnEnemy(Zombie,4010,1600,currentMap.name,100)
spawnEnemy(Boss,700,1200,"map2",200)
//starter



animate()



//-------------------------------------------------------------// 
function animate() {

    resizeCanvas()

    

    cameraTranslade()
    if(mainPlayer.atualLife == "dead"){
        paused = true
        inventoryOpen = false
        pausedText("REPOVADO")
    }else if(win){
        paused = true
        
        pausedText("PASSOU")
    
    }else{
        if(mainPlayer.atualLife<mainPlayer.lifeTotal&& mainPlayer.atualLife > 10 ){
            setTimeout(() => {
                
                   mainPlayer.atualLife+=0.01 
               
                 
            }, 10)
            
        }
    
    pausedAction() 
    }
    animateNPC()
    
    debug()
    
    mainPlayer.animate() 
    
    
    
    handleControls()
   
    window.requestAnimationFrame(animate); 
    
    if(Math.abs(mainPlayer.position.x-511)<32&& Math.abs(mainPlayer.position.y-1234)<32&&mainPlayer.map == map1.name){
        ChangeMap(map2)
        
    }
}
//-------------------------------------------------------------//







function animateNPC(){
    for(let i = 0; i<enemy.length; i++){
        if(enemy[i].map == currentMap.name){
           enemy[i].live() 
        }
        
    }
    
    for(i = 0; i<itens.length; i++){
        if(itens[i].map == currentMap.name){
            itens[i].animate()
        }
    }
}




function cameraTranslade(){
    
    context.save()
    context.fillStyle = "#122636";
    context.fillRect(0,0,canvas.width, canvas.height);
    context.restore()
    context.translate(camera.position.x,camera.position.y)
    background1.draw()

}




function pausedAction(){
    
    if(paused){
    pausedText("PAUSED")
    }
    if(inventoryOpen){
     inventoryDraw() 
    }
    }





function debug(){
    debugMode("mainPlayer.position.x",mainPlayer.position.x,1)
    debugMode("mainPlayer.position.y",mainPlayer.position.y,2)
    debugMode("mainPlayer.currentSprite",mainPlayer.currentSprite.src,3)
    
}








