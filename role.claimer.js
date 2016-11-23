var roleClaimer = {
    run: function(creep) {
        var southRoom = 'E29N63';
        if(creep.room.name != southRoom) {
            creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(southRoom)));
        }
        if(creep.room.name == southRoom) {
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleClaimer;
