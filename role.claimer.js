var roleClaimer = {

    run: function(creep) {
            var southRoom = 'E29N63';
            if(creep.room.name != southRoom) {
                creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(southRoom)));
            }
        }
    }
};

module.exports = roleClaimer
