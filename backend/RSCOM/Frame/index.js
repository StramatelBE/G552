const { Volleyball, Handball, Floorball, IceHockey, RinkHockey, Futsal, Netball, Basketball, Tennis, Badminton, TableTennis, Training, FreeSport } = require('../Utils/Enums/eSport');


// 0x1x frames
// Using Volleyball display
const Frame_0x10 = require('./Frame_0x10'); // Volleyball

// 0x2x frames
// Using Handball display
const Frame_0x20 = require('./Frame_0x20'); // Handball
const Frame_0x21 = require('./Frame_0x21'); // Floorball
const Frame_0x22 = require('./Frame_0x22'); // IceHockey
const Frame_0x23 = require('./Frame_0x23'); // RinkHockey
const Frame_0x24 = require('./Frame_0x24'); // RollerInlineHockey
const Frame_0x25 = require('./Frame_0x25'); // Futsal
const Frame_0x26 = require('./Frame_0x26'); // Netball
const Frame_0x27 = require('./Frame_0x27'); // Boxe

// 0x3x frames
// Using Basketball display
const Frame_0x30 = require('./Frame_0x30'); // Basketball

// 0x4x frames
// Using Tennis display
const Frame_0x40 = require('./Frame_0x40'); // Tennis
const Frame_0x41 = require('./Frame_0x41'); // Badminton
const Frame_0x42 = require('./Frame_0x42'); // TableTennis

// 0x5x frames
// Using Handball display (TODO: make a Standard display)
const Frame_0x50 = require('./Frame_0x50'); // Chrono
const Frame_0x51 = require('./Frame_0x51'); // Training
const Frame_0x52 = require('./Frame_0x52'); // FreeSport

// 0x9x frames
// Utilitary frames
const Frame_0x90 = require('./Frame_0x90'); // TeamNames
const Frame_0x91 = require('./Frame_0x91'); // Clear TeamNames
const Frame_0x92 = require('./Frame_0x92'); // Full Clear
const Frame_0x93 = require('./Frame_0x93'); // Test Mode
const Frame_0x99 = require('./Frame_0x99'); // Reserved for Clock Setup
const Chrono = require('../Utils/Frame_Tools/4_7_Chrono');
const TeamName = require('../Utils/Frame_Tools/6_48_TeamName');

module.exports = Frames = {
    // 0x1x frames
    Volleyball: Frame_0x10, // Volleyball

    // 0x2x frames
    Handball: Frame_0x20, // Handball
    Floorball: Frame_0x21, // Floorball
    IceHockey: Frame_0x22, // IceHockey
    RinkHockey: Frame_0x23, // RinkHockey
    RollerInlineHockey: Frame_0x24, // RollerInlineHockey
    Futsal: Frame_0x25, // Futsal
    Netball: Frame_0x26, // Netball
    Boxe: Frame_0x27, // Boxe

    // 0x3x frames
    Basketball: Frame_0x30, // Basketball

    // 0x4x frames
    Tennis: Frame_0x40, // Tennis
    Badminton: Frame_0x41, // Badminton
    TableTennis: Frame_0x42, // TableTennis

    // 0x5x frames
    Chrono: Frame_0x50, // Chrono
    Training: Frame_0x51, // Training
    FreeSport: Frame_0x52, // FreeSport

    // 0x9x frames
    TeamNames: Frame_0x90, // TeamNames
    ClearTeamNames: Frame_0x91, // Clear TeamNames
    FullClear: Frame_0x92, // Full Clear
    Test: Frame_0x93, // Test Mode
    ClockSetup: Frame_0x99, // Reserved for Clock Setup
}
