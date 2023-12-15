//load arrays
const arraylenght= 100;
const platCode = 50;
const tileSize = 64 ;
let i;


function parse(mapa){
    const subArray = []
    let array = mapa.collision
    for(i = 0; i<array.length;){
        subArray.push(array.slice(i , (i+=currentMap.length)))
    }
    
    return subArray
}


function createMap(mapa){
    
    
    const collisionObject =[]
    mapa.forEach((subArray, y) => {
        subArray.forEach((symbol, x) => {
            if(symbol > 0){
                collisionObject.push(new LimitsBlocks({
                    position:{
                        x: x * tileSize,
                        y: y * tileSize,
                    }
                }
                
                ))
            }
        })
    })
    return collisionObject
}


class LimitsBlocks {
    constructor({ position }){ this.position = position
        this.width = tileSize
        this.height = tileSize
    }

    draw(){
        
        context.fillStyle = 'rgba(25,25,25,0.4)'
        context.fillRect(this.position.x,this.position.y,60,60)
        context.restore();
        
    }
}


function ChangeMap(mapa){
     
let actualMap = currentMap
currentMap = mapa
console.log((currentMap.name))
if(actualMap.name != currentMap.name){


    let pears = parse(mapa)

    collisionlimitsBlock = createMap(pears)

    background1.image.src = currentMap.background
    mainPlayer.position.x = currentMap.starterPosition.x
    mainPlayer.position.y = currentMap.starterPosition.y
    mainPlayer.collisionlimitsBlock = collisionlimitsBlock
    mainPlayer.map = currentMap.name


    for(let i = 0; i<enemy.length; i++){
        enemy[i].collisionlimitsBlock = collisionlimitsBlock
    }
    
    for(i = 0; i<itens.length; i++){
        itens[i].collisionlimitsBlock = collisionlimitsBlock
    }
}
    

}
//draw map