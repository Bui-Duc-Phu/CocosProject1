const mEmitter = require('mEmitter');
const EventDriver = require('EventDriver');

cc.Class({
    extends: require('./PopupItem'),
    properties: {

        tableController: require('TableController'),
    },

    fetchData(){
        this.playerData = [
            { name: "Faker", Champion: "Leblanc", rank: "Thách Đấu" },
            { name: "ShowMaker", Champion: "Sylas", rank: "Cao Thủ" },
            { name: "Chovy", Champion: "Viktor", rank: "Cao Thủ" },
            { name: "Keria", Champion: "Thresh", rank: "Cao Thủ" },
            { name: "Gumayusi", Champion: "Jinx", rank: "Cao Thủ" }
        ];
        return this.playerData
    },

    show(){
        this._super()
        this.tableController.show(this.fetchData())
    },

   
});
