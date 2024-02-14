// Note 8 :  Hand : Pénalités en cours
//     ="31"-->1ère pénalité     ="32"-->1ère & 2ème pénalités      ="33"-->1ère, 2ème & 3ème pénalités
//     ="34"-->2ème pénalité   ="35" -->3rd pénalité   ="36" --> 2ème & 3ème pénalités   ="37" --> 1ère & 3ème pénalités

function PenaltiesInProgress(_message){
    if (_message === 0x31){
        return [true, false, false];
    } else if (_message === 0x32){
        return [true, true, false];
    } else if (_message === 0x33){
        return [true, true, true];
    } else if (_message === 0x34){
        return [false, true, false];
    } else if (_message === 0x35){
        return [false, false, true];
    } else if (_message === 0x36){
        return [false, true, true];
    } else if (_message === 0x37){
        return [true, false, true];
    } else {
        return [false, false, false];
    }
}

module.exports = PenaltiesInProgress;