const { log } = require("console");
const Frames = require("./Frame/Frame_index");
const { sharedEmitter } = require("./SerialPorts/SerialPortConnection");
const fs = require('fs');
const path = require('path');

class Game {
  static State = {
    Mode: null,

    Sport: null,

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
    // console.log("select method was called with _message: ", _message);
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
        break;
      case 0x35:
        toInsert = Frames._0x35.build(_message);
        break;
      case 0x36:
        toInsert = Frames._0x36.build(_message);
        break;
      case 0x37:
        toInsert = Frames._0x37.build(_message);
        break;
      case 0x38:
        toInsert = Frames._0x38.build(_message);
        break;
      case 0x39:
        toInsert = Frames._0x39.build(_message);
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
        toInsert = "Unknown Frame: " + _message[1];
        console.log("Unknown Frame: " + _message[1]);
        break;
    }
    this.updateState(toInsert);
    this.Send();
  };

  static getState() {
    return this.State;
  }

  static updateState(toInsert) {
    // Recursive function to compare and update the game state
    function recursiveUpdate(mainObject, updateObject, path = "") {
      const storagePath = './storage.json'; // Path to your JSON storage file

      // Function to read the current storage state
      function readStorage() {
        try {
          const data = fs.readFileSync(storagePath, 'utf8');
          return JSON.parse(data);
        } catch (err) {
          console.error('Error reading from storage:', err);
          return {};
        }
      }

      // Function to write to the storage
      function writeStorage(data) {
        try {
          fs.writeFileSync(storagePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (err) {
          console.error('Error writing to storage:', err);
        }
      }

      for (let key in updateObject) {
        const currentPath = path ? `${path}.${key}` : key;
        if (typeof updateObject[key] === "object" && updateObject[key] !== null) {
          if (!mainObject[key]) {
            mainObject[key] = {};
          }
          recursiveUpdate(mainObject[key], updateObject[key], currentPath);
        } else {
          // Handling TeamName specifically
          if (currentPath.endsWith(".TeamName")) {
            console.log("reading storage");
            const storage = readStorage();
            console.log(storage);
            console.log(updateObject[key.trim()])
            if (updateObject[key].trim() !== "") {
              // Save to "localStorage"
              storage[currentPath] = updateObject[key];
              writeStorage(storage);
              console.log("saved to storage");
            } else {
              // Retrieve from "localStorage" if exists
              if (storage[currentPath]) {
                console.log("teamname updatedupdated");
                updateObject[key] = storage[currentPath];
              }
            }
          }
          mainObject[key] = updateObject[key];
        }
      }
    }

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
