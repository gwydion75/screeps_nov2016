var roleClaimer = {
    run: function(creep) {
        var southRoom = 'E29N63';
        if(creep.room.name != southRoom) {
            creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(southRoom)));
        }
        else if(creep.room.name == southRoom) {
            var range = creep.pos.getRangeTo(creep.room.controller);
            if (range>1) {
                creep.moveTo(creep.room.controller);
            }
            else {
                creep.reserveController(creep.room.controller);
            }
        }
    }
};

module.exports = roleClaimer;
