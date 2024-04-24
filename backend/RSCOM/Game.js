const { log } = require("console");
const Frames = require("./Frame");
const { sharedEmitter } = require("./SerialPorts/SerialPortConnection");
const fs = require('fs');
const path = require('path');

class Game {
  static State = {
    Language: null,
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
    console.log("Frame length: ", _message.length);
    console.log("First : ", _message[0]);
    console.log("Last : ", _message[_message.length - 1]);
    return _message[0] === 248;
  }

  static select = (_message) => {
    //console.log("select method was called with _message: ", _message);
    let toInsert = null;

    switch (_message[1]) {
        case 0x10:
            toInsert = Frames.Volleyball.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x20:
            toInsert = Frames.Handball.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x21:
            toInsert = Frames.Floorball.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x22:
            toInsert = Frames.IceHockey.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x23:
            toInsert = Frames.RinkHockey.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x24:
            toInsert = Frames.RollerInlineHockey.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x25:
            toInsert = Frames.Futsal.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x26:
            toInsert = Frames.Netball.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x27:
            toInsert = Frames.Boxe.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x30:
            toInsert = Frames.Basketball.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x40:
            toInsert = Frames.Tennis.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x41:
            toInsert = Frames.Badminton.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x42:
            toInsert = Frames.TableTennis.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x50:
            toInsert = Frames.Chrono.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x51:
            toInsert = Frames.Training.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x52:
            toInsert = Frames.FreeSport.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x90:
            toInsert = Frames.TeamNames.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x91:
            toInsert = Frames.ClearTeamNames.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x92:
            toInsert = Frames.FullClear.build(_message);
            console.log("toInsert: ", toInsert);
            break;
        case 0x93:
            toInsert = Frames.Test.build(_message);
            break;
        case 0x99:
            toInsert = Frames.ClockSetup.build(_message);
            break;
        default:
            console.log("Unknown Frame: " + _message[1]);
            break;
    }

    if (toInsert != null) {
      console.log("toInsert: ", toInsert);
      if (toInsert?.Guest?.Exclusion?.Timer) {
        for (let i = 0; i < toInsert.Guest.Exclusion.Timer.length; i++) {
          console.log("Exclusion Timer: ", toInsert.Guest.Exclusion.Timer[i]);
        }
      }
      if (toInsert?.Home?.Exclusion?.Timer) {
        for (let i = 0; i < toInsert.Home.Exclusion.Timer.length; i++) {
            console.log("Exclusion Timer: ", toInsert.Home.Exclusion.Timer[i]);
        }
        }
        
      console.log(_message[1] + " Frame");
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
