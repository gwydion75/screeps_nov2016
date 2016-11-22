/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var LeftMine = Game.getObjectById('57ef9dfe86f108ae6e60e9f6')
var RightMine = Game.getObjectById('57ef9dfe86f108ae6e60e9f7')

/*var minersLeft = _.filter(Game.creeps, (creep) => creep.memory.mineside == 'left');
var minersRight = _.filter(Game.creeps, (creep) => creep.memory.mineside == 'right');*/

//console.log('# of LeftMiners: ' + minersLeft.length);
//console.log('# of RightMiners: ' + minersRight.length);

var roleMiner = {

    run: function(creep) {
        if (creep.memory.mineside == 'left') {
            if(creep.harvest(LeftMine) == ERR_NOT_IN_RANGE) {
                creep.moveTo(LeftMine)
            }
        }
        else if (creep.memory.mineside == 'right') {
            if(creep.harvest(RightMine) == ERR_NOT_IN_RANGE) {
                creep.moveTo(RightMine);
            }
        }
        /*else {
            if (minersLeft.length<2) {
                creep.memory.mineside = 'left'
            }
            if (minersRight.length<2) {
                creep.memory.mineside = 'right'
            }
        }*/
        /*var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }*/
    }
};

module.exports = roleMiner