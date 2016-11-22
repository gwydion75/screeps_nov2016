/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
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
                //First, we're going to check for damaged ramparts. We're using ramparts as the first line of defense
			    //and we want them nicely maintained. This is especially important when under attack. The builder will
			    //repair the most damaged ramparts first
			    var structures = creep.room.find(Game.STRUCTURES);
			    var damagedRamparts = [ ];

		    	for(var index in structures)
			    {
		    		var structure = structures[index];
		    		if(structure.structureType == 'rampart' && structure.hits < (structure.hitsMax - 50))
    					damagedRamparts.push(structure);
    			}

    			damagedRamparts.sort(function(a, b)
    			{
    				return(a.hits - b.hits);
    			});
    
    			if(damagedRamparts.length)
    			{
    				creep.moveTo(damagedRamparts[0]);
    				creep.repair(damagedRamparts[0]);
    
    				return;
    			}
    
    			//Next we're going to look for general buildings that have less than 50% health, and we'll go to repair those.
    			//We set it at 50%, because we don't want builders abandoning their duty every time a road gets walked on
    			var halfBroken = creep.room.find(Game.STRUCTURES);
    			var toRepair = [ ];
    			for(var index in halfBroken)
    				if((halfBroken[index].hits / halfBroken[index].hitsMax) < 0.5)
    					toRepair.push(halfBroken[index]);
    
    			if(toRepair.length)
    			{
    				var structure = toRepair[0];
    				creep.say('repairing');
    				creep.moveTo(structure);
    				creep.repair(structure);
    
    				return;
    			}
            }
        }
        else {
            var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >0
            })
            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            } 
        }
    }
};

module.exports = roleBuilder;