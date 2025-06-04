const CharacterType = require('CharacterType')

cc.Class({
    extends: cc.Component,

    properties: {
        Dog: {
            default: null,
            type: cc.SpriteFrame,
        },
        InfernoDog: {
            default: null,
            type: cc.SpriteFrame,
        },
        Dragon: {
            default: null,
            type: cc.SpriteFrame,
        },
  
    },
    getSpriteFrame(type) {
        switch (type) {
            case CharacterType.DOG.type:
                return this.Dog;
            case CharacterType.INFERNO_DOG.type:
                return this.InfernoDog;
            case CharacterType.DRAGON.type:
                return this.Dragon;
        }
    }
});
