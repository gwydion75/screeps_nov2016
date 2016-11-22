/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairman');
 * mod.thing == 'a thing'; // true
 */

var roleRepairman = {
    run: function(creep) {
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('Fueling');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('Repairing');
        }

        if (!creep.memory.repairing) {
            var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >0
            })
            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container);
            }
        }
        if (creep.memory.repairing) {
            var repairrepair = creep.room.find(FIND_STRUCTURES, { 
                filter: (structure) => { 
                    return (structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_ROAD && structure.hits < structure.hitsMax && structure.hits > 0)
                }
            });
            if ((repairrepair.length > 0) && (creep.carry.energy > 0)) {
                var rndRepair = Math.floor(Math.random() * repairrepair.length);
                if (creep.repair(repairrepair[rndRepair]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairrepair[rndRepair]);
                }
            }
        }
    }
}

module.exports = roleRepairman;
