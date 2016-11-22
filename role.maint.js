/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.maint');
 * mod.thing == 'a thing'; // true
 */

var roleMaint = {
	run: function(creep) {
		
		if(creep.carry.energy < creep.carryCapacity) {
		    var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
            filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
            if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropenergy);
            }
            else {
            }
		}
        else {
            var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < 2000
            })
            if(creep.transfer(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            }
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

module.exports = roleMaint;