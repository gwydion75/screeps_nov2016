var southRoom = 'E29N63';
var northRoom = 'E29N64';

var roleRoadman = {
    run: function(creep) {
        if(creep.memory.roading && creep.carry.energy == 0) {
            creep.memory.roading = false;
            creep.say('Fueling');
        }
        if(!creep.memory.roading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.roading = true;
            creep.say('Roading');
        }

        if (!creep.memory.roading && !creep.memory.south) {
           var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
           filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >0
           })
           if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.moveTo(Container);
           }
        }
        else if (!creep.memory.roading && creep.memory.south) {
           if(creep.room.name != southRoom) {
               creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(southRoom)));
           }
           else if(creep.room.name == southRoom) {
               if(creep.carry.energy < creep.carryCapacity) {
                   var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                   filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
                   if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                       creep.moveTo(dropenergy);
                   }
               }
           }
        }
        else if (creep.memory.roading && creep.memory.south) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
            if (targets.length == 0) {
                var repairSouthRoad = creep.room.find(FIND_STRUCTURES, { 
                    filter: (structure) => { 
                        return (structure.structureType == STRUCTURE_ROAD && structure.hits < 1600 && structure.hits > 0)
                    }
                });
                if ((repairSouthRoad.length > 0) && (creep.carry.energy > 0)) {
                    if (creep.repair(repairSouthRoad[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairSouthRoad[0]);
                    }
                }
                else if (creep.memory.south && repairSouthRoad.length == 0) {
                    creep.moveTo(Game.flags.Rally1);
                }
            }
        }
        else if (creep.memory.roading && !creep.memory.south) {
            var repairNorthRoad = creep.room.find(FIND_STRUCTURES, { 
            filter: (structure) => { 
                return (structure.structureType == STRUCTURE_ROAD && structure.hits < 1600 && structure.hits > 0)
                }
            });
            if ((repairNorthRoad.length > 0) && (creep.carry.energy > 0)) {
                if (creep.repair(repairNorthRoad[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairNorthRoad[0]);
                }
                else if (repairNorthRoad.length == 0) {
                creep.moveTo(Game.flags.Rally2);
                }
            }
        }
    }
}

module.exports = roleRoadman;
