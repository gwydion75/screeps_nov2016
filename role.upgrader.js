/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

        if(!creep.memory.gathering && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.memory.building = false;
            creep.memory.gathering = true;
            creep.say('Gathering');
        }
        if(creep.memory.gathering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.memory.gathering = false;
            creep.memory.upgrading = false;
            creep.say('Building');
        }
        if(creep.memory.building && creep.carry.energy == creep.carryCapacity && !targets.length) {
            creep.memory.upgrading = true;
            creep.memory.gathering = false;
            creep.memory.building = false;
            creep.say('Upgrading');
        }
        if(targets.length && creep.memory.building) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        if(creep.memory.gathering) {
            var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >0
            })
            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            }
        }
    }
};

module.exports = roleUpgrader;
