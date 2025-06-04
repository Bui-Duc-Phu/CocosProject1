const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')
const CharacterType = require('CharacterType')
const BulletType = require('BulletType')

cc.Class({
    extends: cc.Component,

    properties: {
        charItemPrefab:{
            default: null,
            type: cc.Prefab,
        },
        listChar: {
            default: [],
            type: [require('CharItem')],
            visible: false,
        },
        isStartGame: {
            default: false,
            type: cc.Boolean,
            visible: false,
        },
        charAssets: require('CharAssets'),
    },

    onLoad(){
        this.registerEvents()
        this.initSpawnTimer()
    },

    start() {
        this.resetSpawnTimer()
    },

    update(dt) {
        if(!this.isStartGame) return
        this.updateSpawnTimer(dt)
    },

    onDestroy(){
        this.removeEvents()
    },

    // === SPAWN TIMER MANAGEMENT ===
    initSpawnTimer(){
        this._spawnTimer = 0
        this._spawnInterval = 0
    },

    resetSpawnTimer(){
        this._spawnInterval = this.getRandomInterval()
        this._spawnTimer = 0
    },

    updateSpawnTimer(dt){
        this._spawnTimer += dt
        if (this.shouldSpawn()) {
            this.spawnCharacter()
            this.resetSpawnTimer()
        }
    },

    shouldSpawn(){
        return this._spawnTimer >= this._spawnInterval
    },

    getRandomInterval() {
        return Math.random() * 2 + 1
    },

    // === CHARACTER CREATION ===
    spawnCharacter(){
        const typeChar = this.getRandomCharacterType()
        const char = this.createCharacterNode()
        const charComponent = this.initializeCharacter(char, typeChar)
        this.positionCharacter(char)
        this.addCharacterToScene(char)
        this.registerCharacter(charComponent)
    },

    getRandomCharacterType(){
        const rand = Math.floor(Math.random() * Object.keys(CharacterType).length)
        return CharacterType[Object.keys(CharacterType)[rand]]
    },

    createCharacterNode(){
        return cc.instantiate(this.charItemPrefab)
    },

    initializeCharacter(char, typeChar){
        const charComponent = char.getComponent("CharItem")
        const spriteFrame = this.getCharacterSpriteFrame(typeChar)
        const characterData = this.prepareCharacterData(typeChar, spriteFrame)
        charComponent.init(characterData,this.generateCharId())        
        charComponent.onMove()
        return charComponent
    },

    getCharacterSpriteFrame(typeChar){
        return this.charAssets.getSpriteFrame(typeChar.type)
    },

    prepareCharacterData(typeChar, spriteFrame){
        const data = typeChar
        data.spriteFrame = spriteFrame
        return data
    },

    generateCharId(){
        return new Date().getTime()
    },

    positionCharacter(char){
        const position = this.getRandomPosition()
        char.setPosition(position)
    },

    addCharacterToScene(char){
        this.node.addChild(char)
    },

    registerCharacter(charComponent){
        this.listChar.push(charComponent)
    },

    // === POSITION MANAGEMENT ===
    getRandomPosition(){
        const canvasSize = this.getCanvasSize()
        const x = this.getSpawnX(canvasSize)
        const y = this.getSpawnY(canvasSize)
        return cc.v2(x, y)
    },

    getCanvasSize(){
        const canvas = cc.find('Canvas')
        const canvasSize = canvas.getContentSize()
        return {width: canvasSize.width, height: canvasSize.height}
    },

    getSpawnX(canvasSize){
        return canvasSize.width / 2
    },

    getSpawnY(canvasSize){
        const yPositions = [0.2, 0.5, 0.8]
        const randomIndex = Math.floor(Math.random() * yPositions.length)
        return canvasSize.height * yPositions[randomIndex]
    },

    // === EVENT MANAGEMENT ===
    registerEvents(){
        mEmitter.instance.registerEvent(EventDriver.CHARACTER.ON_DIE, this.onCharDie.bind(this))
        mEmitter.instance.registerEvent(EventDriver.CHARACTER.ON_HIT, this.onCharHit.bind(this))
        mEmitter.instance.registerEvent(EventDriver.GAME.ON_START, this.onStartGame.bind(this))
    },
    removeEvents(){
        mEmitter.instance.removeEvent(EventDriver.CHARACTER.ON_DIE, this.onCharDie.bind(this))
        mEmitter.instance.removeEvent(EventDriver.CHARACTER.ON_HIT, this.onCharHit.bind(this))
        mEmitter.instance.removeEvent(EventDriver.GAME.ON_START, this.onStartGame.bind(this))
    },
    onStartGame(){
        console.log('onStartGame')
        this.isStartGame = true
    },
    // === CHARACTER MANAGEMENT ===
    onCharDie(charId){
        const char = this.findCharacterById(charId)
        if (!char) return
        
        this.cleanupCharacter(char)
        this.removeCharacterFromList(charId)
    },

    onCharHit(charItem, pos, bullet){
        const charIndex = this.findCharacterIndex(charItem.id)
        if (charIndex === -1) return

        const char = this.listChar[charIndex]
        const damage = this.getBulletDamage(bullet)
        const newHp = this.calculateNewHp(char, damage)
        
        this.updateCharacterHp(char, charItem, newHp)
        
        if (this.shouldCharacterDie(char, charItem, newHp)) {
            this.handleCharacterDeath(char, charIndex)
        }
    },

    findCharacterById(charId){
        return this.listChar.find(char => char.id === charId)
    },

    findCharacterIndex(charId){
        return this.listChar.findIndex(char => char.id === charId)
    },

    cleanupCharacter(char){
        char.onClear()
    },

    removeCharacterFromList(charId){
        this.listChar = this.listChar.filter(char => char.id !== charId)
    },

    getBulletDamage(bullet){
        return BulletType[bullet.type].damage
    },

    calculateNewHp(char, damage){
        return Math.max(0, char.hp - damage)
    },

    updateCharacterHp(char, charItem, newHp){
        char.hp = newHp
        const hpProgress = this.calculateHpProgress(charItem, newHp)
        char.updateHp(hpProgress)
    },

    calculateHpProgress(charItem, newHp){
        const hpMax = CharacterType[charItem.type].hp
        return newHp / hpMax
    },

    shouldCharacterDie(char, charItem, newHp){
        const hpProgress = this.calculateHpProgress(charItem, newHp)
        return hpProgress <= 0.02
    },

    handleCharacterDeath(char, charIndex){
        char.dieState()
        this.listChar.splice(charIndex, 1)
    }
})