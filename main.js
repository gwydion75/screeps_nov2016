//require('screeps-perf')();


var roleHarvester = require('role.harvester');
//var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleMiner = require('role.miner');
//var roleMaint = require('role.maint');
var roleWallman = require('role.wallman');
var roleRoadman = require('role.roadman');
var roleRepairman = require('role.repairman');
var roleClaimer = require('role.claimer');
var roleTransporter = require('role.transporter');
var roleTrashman = require('role.trashman');
var roleArcher = require('role.archer');
var roleGuard = require('role.guard');
var roleCleric = require('role.cleric');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'miner') {
                roleMiner.run(creep);
            }
            /*if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }*/

            /*if(creep.memory.role == 'maint') {
                roleMaint.run(creep);
            }*/
            if(creep.memory.role == 'wallman') {
                roleWallman.run(creep);
            }
            if(creep.memory.role == 'cleric') {
                roleCleric.run(creep);
            }
            if(creep.memory.role == 'roadman') {
                roleRoadman.run(creep);
            }
            if(creep.memory.role == 'repairman') {
                roleRepairman.run(creep);
            }
            if(creep.memory.role == 'claimer') {
                roleClaimer.run(creep);
            }
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'transporter') {
                roleTransporter.run(creep);
            }
            if(creep.memory.role == 'trashman') {
                roleTrashman.run(creep);
            }
            if(creep.memory.role == 'archer') {
                roleArcher.run(creep);
            }
            if(creep.memory.role == 'guard') {
                roleGuard.run(creep);
            }           
 
        }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    //var maints = _.filter(Game.creeps, (creep) => creep.memory.role == 'maint');
    var wallmans = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallman');
    var roadmans = _.filter(Game.creeps, (creep) => creep.memory.role == 'roadman');
    var repairmans = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairman');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
    var trashmans = _.filter(Game.creeps, (creep) => creep.memory.role == 'trashman');
    var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
    var archers = _.filter(Game.creeps, (creep) => creep.memory.role == 'archer');
    var clerics = _.filter(Game.creeps, (creep) => creep.memory.role == 'cleric');

    if (!Game.spawns['Spawn1'].spawning) {
        if(miners.length < 4) {
            var minersLeft = _.filter(Game.creeps, (creep) => creep.memory.mineside == 'left');
            var minersRight = _.filter(Game.creeps, (creep) => creep.memory.mineside == 'right');
            var minersSouth = _.filter(Game.creeps, (creep) => creep.memory.mineside == 'south');
            if(minersLeft.length <1) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner', mineside: 'left'});
                console.log('Spawning new LEFT miner: ' + newName);
            }
            if(minersRight.length <1) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner', mineside: 'right'});
                console.log('Spawning new RIGHT miner: ' + newName);
            }
            if(minersSouth.length <2) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,MOVE,MOVE], undefined, {role: 'miner', mineside: 'south'});
                console.log('Spawning new SOUTH miner: ' + newName);
            }
        }
        else {
            if(archers.length < 2) {
                var newName = Game.spawns['Spawn1'].createCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,TOUGH,MOVE,MOVE], undefined, {role: 'archer'});
                console.log('Spawning new archer: ' + newName);
            }
            if(clerics.length < 2) {
                var newName = Game.spawns['Spawn1'].createCreep([MOVE,MOVE,HEAL,HEAL,TOUGH,TOUGH], undefined, {role: 'cleric'});
                console.log('Spawning new cleric: ' + newName);
            }
            if(guards.length < 2) {
                var newName = Game.spawns['Spawn1'].createCreep([ATTACK,ATTACK,ATTACK,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE], undefined, {role: 'guard'});
                console.log('Spawning new guard: ' + newName);
            }
            if(harvesters.length < 2) {
                var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester'});
                console.log('Spawning new harvester: ' + newName);
            }
            if(transporters.length < 6) {
                var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'transporter'});
                console.log('Spawning new transporter: ' + newName);
            }
            /*if(builders.length < 1) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'builder'});
                console.log('Spawning new builder: ' + newName);
            }*/
            if(upgraders.length < 5) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
                console.log('Spawning new upgrader: ' + newName);
            }
            /*if(maints.length < 0) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'maint'});
                console.log('Spawning new maint: ' + newName);
            }*/
            if(wallmans.length < 2) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'wallman', walling: 'false'});
                console.log('Spawning new wallman: ' + newName);
            }
            if(roadmans.length < 2) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'roadman', roading: 'false'});
                console.log('Spawning new roadman: ' + newName);
            }
            if(roadmans.length < 4 && roadmans.length > 1) {   
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'roadman', roading: 'false', south: 'true'});
                console.log('Spawning new roadman: ' + newName);
            }
            if(repairmans.length < 2) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairman', repairing: 'false'});
                console.log('Spawning new repairman: ' + newName);
            }
            if(claimers.length < 2) {
                var newName = Game.spawns['Spawn1'].createCreep([CLAIM,MOVE], undefined, {role: 'claimer'});
                console.log('Spawning new claimer: ' + newName);
            }
            if(trashmans.length < 1) {
                var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,MOVE], undefined, {role: 'trashman'});
                console.log('Spawning new trashman: ' + newName);
            }
        }
    }
}
