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

        if (!creep.memory.roading) {
            if (!creep.memory.south) {
                var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >0
                })
                if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Container);
                }
            }
            else {
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
        }
        if (creep.memory.roading) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
            if (targets.length == 0) {
                var repairroad = creep.room.find(FIND_STRUCTURES, { 
                    filter: (structure) => { 
                        return (structure.structureType == STRUCTURE_ROAD && structure.hits < 1600 && structure.hits > 0)
                    }
                });
                if ((repairroad.length > 0) && (creep.carry.energy > 0)) {
                    //var rndRepairRoad = Math.floor(Math.random() * repairroad.length);
                    if (creep.repair(repairroad[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairroad[0]);
                    }
                }
            }
            else if (!creep.memory.south) {
                creep.moveTo(Game.flags.Rally2);
            }
            else {
                creep.moveTo(Game.flags.Rally1);
            }
        }
    }
}

module.exports = roleRoadman;
