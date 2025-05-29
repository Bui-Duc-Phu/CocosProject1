cc.Class({
    extends: cc.Component,

    properties: {
        charPrefabs: {
            default: [],
            type: [cc.Prefab], 
        },
    },
    onLoad(){
        this.colisionManager()
    },

    colisionManager(){
        let manager = cc.director.getCollisionManager();
        manager.enabled = true
     
    },
    start() {
        this._spawnInterval = this._getRandomInterval();
        this._spawnTimer = 0;
    },
    update(dt) {
        this._spawnTimer += dt;
        if (this._spawnTimer >= this._spawnInterval) {
            this._createChar();                    
            this._spawnTimer = 0;
            this._spawnInterval = this._getRandomInterval(); 
        }
    },
    _createChar(){
        let posison = this._randomPosition()
        let charPrefab = this._randomChar()
        let char = cc.instantiate(charPrefab)
        let charComponent = char.getComponent(charPrefab.data._name)
        this.node.addChild(char);
        char.setPosition(posison);
        charComponent.onMove();
    },
    _getCanvasSize(){
        const canvas = cc.find('Canvas');
        const canvasSize = canvas.getContentSize();
        return {width: canvasSize.width, height: canvasSize.height}
    },
    _randomChar(){
        let rand = Math.floor(Math.random()*this.charPrefabs.length)
        return this.charPrefabs[rand]
    },
    _randomPosition(){
        let canvasSize = this._getCanvasSize();
        let randY = [0.2,0.5,0.8]
        let x = canvasSize.width/2
        let y = canvasSize.height*randY[Math.floor(Math.random()*randY.length)]
        return cc.v2(x, y);
    },
    _getRandomInterval() {
        return Math.random() * 2 + 1;
    },
    
})
