const EventDriver = require('EventDriver')
const mEmitter = require('mEmitter')
const BulletType = require('BulletType')

cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: {
            default: null,
            type: cc.Prefab,
        },
      
    },

    onLoad(){
        this.initBulletSystem()
    },

    onDestroy(){
        this.cleanupBulletSystem()
    },

    // === INITIALIZATION ===
    initBulletSystem(){
        this.initBulletList()
        this.registerEvents()
    },

    initBulletList(){
        this.ListBullet = []
    },

    cleanupBulletSystem(){
        this.removeEvents()
        this.clearAllBullets()
    },

    clearAllBullets(){
        this.ListBullet.forEach(bullet => bullet.clear())
        this.ListBullet = []
    },

    // === EVENT MANAGEMENT ===
    registerEvents(){
        mEmitter.instance.registerEvent(EventDriver.PLAYER.ON_SHOOT, this.onPlayerShoot.bind(this))
        mEmitter.instance.registerEvent(EventDriver.CHARACTER.ON_HIT, this.onCharacterHit.bind(this))
        mEmitter.instance.registerEvent(EventDriver.BULLET.ON_CLEAR, this.onBulletDestroy.bind(this))
    },

    removeEvents(){
        mEmitter.instance.removeEvent(EventDriver.PLAYER.ON_SHOOT, this.onPlayerShoot.bind(this))
        mEmitter.instance.removeEvent(EventDriver.CHARACTER.ON_HIT, this.onCharacterHit.bind(this))
        mEmitter.instance.removeEvent(EventDriver.BULLET.ON_CLEAR, this.onBulletDestroy.bind(this))
    },

    // === EVENT HANDLERS ===
    onPlayerShoot(worldPos){
        this.createBullet(worldPos)
    },

    onCharacterHit(charItem, pos, bullet){
        this.destroyBullet(bullet.id)
    },

    onBulletDestroy(bulletId){
        this.destroyBullet(bulletId)
    },

    // === BULLET CREATION ===
    createBullet(worldPos) {
        const bulletNode = this.instantiateBullet()
        const bulletComponent = this.initializeBullet(bulletNode)
        this.positionBullet(bulletNode, worldPos)
        this.addBulletToScene(bulletNode)
        this.startBulletMovement(bulletComponent)
        this.registerBullet(bulletComponent)
    },

    instantiateBullet(){
        return cc.instantiate(this.bulletPrefab)
    },

    initializeBullet(bulletNode){
        const bulletComponent = bulletNode.getComponent('Bullet')
        const bulletId = this.generateBulletId()
        const bulletType = this.getBulletType()
        bulletComponent.init(bulletId, bulletType)
        return bulletComponent
    },

    generateBulletId(){
        return Date.now()
    },

    getBulletType(){
        return BulletType.NORMAL.type
    },

    positionBullet(bulletNode, worldPos){
        const localPos = this.convertToLocalPosition(worldPos)
        bulletNode.setPosition(localPos)
    },

    convertToLocalPosition(worldPos){
        return this.node.convertToNodeSpaceAR(worldPos)
    },

    addBulletToScene(bulletNode){
        this.node.addChild(bulletNode)
    },

    startBulletMovement(bulletComponent){
        bulletComponent.onMove()
    },

    registerBullet(bulletComponent){
        this.ListBullet.push(bulletComponent)
    },

    // === BULLET DESTRUCTION ===
    destroyBullet(bulletId){
        const bulletIndex = this.findBulletIndex(bulletId)
        if (!this.isValidBulletIndex(bulletIndex)) return

        this.cleanupBullet(bulletIndex)
        this.removeBulletFromList(bulletIndex)
    },

    findBulletIndex(bulletId){
        return this.ListBullet.findIndex(bullet => bullet.id === bulletId)
    },

    isValidBulletIndex(index){
        return index !== -1
    },

    cleanupBullet(bulletIndex){
        const bullet = this.ListBullet[bulletIndex]
        bullet.clear()
    },

    removeBulletFromList(bulletIndex){
        this.ListBullet.splice(bulletIndex, 1)
    }
})