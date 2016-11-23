/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
/*var roleWallman = {
    run: function(creep) {
        if(creep.memory.walling && creep.carry.energy == 0) {
            creep.memory.walling = false;
            creep.say('Fueling');
        }
        if(!creep.memory.walling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.walling = true;
            creep.say('Walling');
        }

        if (!creep.memory.walling) {
            var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >0
            })
            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container);
            }
        }
        if (creep.memory.walling) {
            var repairwall = creep.room.find(FIND_STRUCTURES, { 
                filter: (structure) => { 
                    return (structure.structureType == STRUCTURE_RAMPART && structure.hits < 1000 && structure.hits > 0 || structure.hits < 1000 && structure.hits > 0 && structure.structureType == STRUCTURE_WALL)
                }
            });
            if ((repairwall.length > 0) && (creep.carry.energy > 0)) {
                var rndRepairWall = Math.floor(Math.random() * repairwall.length);
                if (creep.repair(repairwall[rndRepairWall]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairwall[rndRepairWall]);
                }
            }
        }
    }
}*/
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.gathering && creep.carry.energy == 0) {
            creep.memory.gathering = true;
            creep.say('Gathering');
        }
        if(!creep.memory.gathering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.gathering = false;
            creep.say('Delivering');
        }
        if(creep.memory.gathering) {
            var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >0
            })
            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            } 
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;
