const { log } = require("console");
const Frames = require("./Frame/Frame_index");
const { sharedEmitter } = require("./SerialPorts/SerialPortConnection");
const fs = require('fs');
const path = require('path');

class Game {
  static State = {
    Mode: null,

    Sport: null,

    Display: null,

    Period: null,

    Set: null,

    TieBreak: null,

    Timer: {
      Value: null,
      Display: null,
      Status: null,
      LED: null,
      Horn: null,
    },

    Timer24s: {
      Value: null,
      Display: null,
      Status: null,
      LED: null,
      Horn24s: null,
    },

    Clock: {
      Display: null,
    },

    Guest: {
      Player: {
        Name: new Array(16),
        Number: new Array(16),
      },
      PlayersInPlay: null,
      TeamName: null,
      Points: null,
      TotalPoints: null,
      GameInSet: null,
      PointsInSets: null,
      SetsWon: null,
      Service: null,
      Fouls: {
        Individual: new Array(16),
        Team: null,
        RS: null,
      },
      Timeout: {
        Count: null,
        Time: null,
      },
      PenaltiesInProgress: null,
      Exclusion: {
        Timer: null,
        ShirtNumber: null,
      },
      Possession: null,
      Warnings: null,
    },
    Home: {
      Player: {
        Name: new Array(16),
        Number: new Array(16),
      },
      PlayersInPlay: null,
      TeamName: null,
      Points: null,
      TotalPoints: null,
      GameInSet: null,
      PointsInSets: null,
      SetsWon: null,
      Service: null,
      Fouls: {
        Individual: new Array(16),
        Team: null,
        RS: null,
      },
      Timeout: {
        Count: null,
        Time: null,
      },
      PenaltiesInProgress: null,

      Exclusion: {
        Timer: null,
        ShirtNumber: null,
      },
      Possession: null,
      Warnings: null,
    },
  };

  static update = (_message) => {
    this.select(_message);
    // TODO: Check if the frame is valid
    // if (this.isValid(_message)) {
    //     // console.log('Valid frame');
    //
    // } else
    //     console.log(_message)
    //     console.log('Invalid frame');
    // return null;
  };

  static isValid(_message) {
    // console.log("Frame length: ", _message.length);
    // console.log("First : ", _message[0]);
    // console.log("Last : ", _message[_message.length - 1]);
    return _message[0] === 248;
  }

  static select = (_message) => {
    //console.log("select method was called with _message: ", _message);
    let toInsert = null;

    switch (_message[1]) {
      case 0x3a:
        toInsert = Frames._0x3A.build(_message);
        break;
      case 0x3c:
        toInsert = Frames._0x3C.build(_message);
        break;
      case 0x6c:
        toInsert = Frames._0x6C.build(_message);
        break;
      case 0x9a:
        toInsert = Frames._0x9A.build(_message);
        break;
      case 0x33:
        toInsert = Frames._0x33.build(_message);
        // console.log("gamejs toinsert:", toInsert);
        break;
      case 0x35:
        toInsert = Frames._0x35.build(_message);
        // console.log("gamejs toinsert:", toInsert);
        break;
      case 0x36:
        toInsert = Frames._0x36.build(_message);
        // console.log("gamejs toinsert:", toInsert);
        break;
      case 0x37:
        toInsert = Frames._0x37.build(_message);
        break;
      case 0x38:
        toInsert = Frames._0x38.build(_message);
        break;
      case 0x39:
        toInsert = Frames._0x39.build(_message);
        // console.log("gamejs toinsert:", toInsert);

        break;
      case 0x62:
        if (
          _message[3] === 0x20 &&
          _message[4] === 0x20 &&
          _message[5] === 0x20
        )
          toInsert = Frames._0x62_TeamNames.build(_message);
        else toInsert = Frames._0x62_PlayerNames.build(_message);
        break;
      case 0x74:
        toInsert = Frames._0x74.build(_message);
        break;
      case 0x77:
        if (
          _message[3] === 0x20 &&
          _message[4] === 0x20 &&
          _message[5] === 0x20
        )
          toInsert = Frames._0x77_TeamNames.build(_message);
        else toInsert = Frames._0x77_PlayerNames.build(_message);
        break;
      case 0x93:
        toInsert = Frames._0x93.build(_message);
        break;
      case 0x94:
        toInsert = Frames._0x94.build(_message);
        // console.log("gamejs toinsert:", toInsert);
        break;
      case 0xa9:
        toInsert = Frames._0xA9.build(_message);
        break;
      case 0xac:
        toInsert = Frames._0xAC.build(_message);
        break;
      case 0xcc:
        toInsert = Frames._0xCC.build(_message);
        // console.log(toInsert)
        break;
      case 0x9f:
        break;
      default:
        console.log("Unknown Frame: " + _message[1]);
        break;
    }

    if (toInsert != null) {
      // console.log("toInsert: ", toInsert);
      // console.log("Home Exclusion Timer: ", toInsert?.Home?.Exclusion?.Timer);
      // console.log("Guest Exclusion Timer: ", toInsert?.Guest?.Exclusion?.Timer);
      // console.log(_message[1] + " Frame");
      this.updateState(toInsert);
      
    }
    this.Send();     
  };

  static getState() {
    return this.State;
  }

  static updateState(toInsert) {
    // Define the path for the JSON storage file
    const storagePath = './storage.json';

    // Function to read the current storage state
    const readStorage = () => {
      try {
        const data = fs.readFileSync(storagePath, 'utf8');
        return JSON.parse(data);
      } catch (err) {
        console.error('Error reading from storage:', err);
        return {};
      }
    };

    // Function to write to the storage
    const writeStorage = (data) => {
      try {
        fs.writeFileSync(storagePath, JSON.stringify(data, null, 2), 'utf8');
      } catch (err) {
        console.error('Error writing to storage:', err);
      }
    };

    // Handle TeamName updates or retrievals before recursive update
    const storage = readStorage();
    ['Guest', 'Home'].forEach(side => {
      const teamPath = `${side}.TeamName`;
      if (toInsert[side] && toInsert[side].TeamName) {
        // If TeamName is provided, update storage
        storage[teamPath] = toInsert[side].TeamName;
        writeStorage(storage);
      } else if (!toInsert[side] || !toInsert[side].TeamName) {
        // If TeamName is not provided, try to retrieve it from storage
        if (storage[teamPath]) {
          if (!toInsert[side]) toInsert[side] = {}; // Ensure side object exists
          toInsert[side].TeamName = storage[teamPath];
        }
      }
    });

    // Now perform the recursive update
    const recursiveUpdate = (mainObject, updateObject) => {
      for (let key in updateObject) {
        if (typeof updateObject[key] === "object" && updateObject[key] !== null) {
          if (!mainObject[key]) mainObject[key] = {};
          recursiveUpdate(mainObject[key], updateObject[key]);
        } else {
          mainObject[key] = updateObject[key];
        }
      }
    };

    recursiveUpdate(this.State, toInsert);
  }


  static Send() {
    // console.log("Send method was called");
    //TODO: save in db
    console.log('received mode:', this.State.Mode);
    sharedEmitter.emit("scoring", this.State);
  }
}

module.exports = Game;
