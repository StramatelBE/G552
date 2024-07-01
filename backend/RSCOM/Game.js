const Frames = require("./Frame");
const { sharedEmitter } = require("./SerialPorts/SerialPortConnection");
const fs = require('fs');
const nBytesToNumber = require('./Utils/nBytesToNumber');

class Game {
  static State = {
    Code : '',
    Language: '',
    Mode: '',

    Sport: '',

    Display: '',

    Period: '',

    Set: '',

    TieBreak: '',

    Timer: {
      Value: '',
      Display: '',
      Status: '',
      LED: '',
      Horn: '',
    },

    Timer24s: {
      Value: '',
      Display: '',
      Status: '',
      LED: '',
      Horn24s: '',
    },

    Clock: {
      Display: '',
    },

    Guest: {
      Player: {
        Name: new Array(16),
        Number: new Array(16),
      },
      PlayersInPlay: '',
      TeamName: '',
      Points: '',
      TotalPoints: '',
      GameInSet: '',
      PointsInSets: '',
      SetsWon: '',
      Service: '',
      Fouls: {
        Individual: new Array(16),
        Team: '',
        RS: '',
      },
      Timeout: {
        Count: '',
        Time: '',
      },
      PenaltiesInProgress: '',
      Exclusion: {
        Timer: new Array(3),
        ShirtNumber: new Array(3),
      },
      Possession: '',
      Warnings: '',
    },
    Home: {
      Player: {
        Name: new Array(16),
        Number: new Array(16),
      },
      PlayersInPlay: '',
      TeamName: '',
      Points: '',
      TotalPoints: '',
      GameInSet: '',
      PointsInSets: '',
      SetsWon: '',
      Service: '',
      Fouls: {
        Individual: new Array(16),
        Team: '',
        RS: '',
      },
      Timeout: {
        Count: '',
        Time: '',
      },
      PenaltiesInProgress: '',

      Exclusion: {
        Timer: new Array(3),
        ShirtNumber: new Array(3),
      },
      Possession: '',
      Warnings: '',
    },
  };

  static update = (_message) => {
    this.select(_message);
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

        case 0x10:
            toInsert = Frames.Volleyball.build(_message);
            // console.log("Volleyball Frame");
            break;
        case 0x20:
            toInsert = Frames.Handball.build(_message);
            // console.log("Handball Frame");
            break;
        case 0x21:
            toInsert = Frames.Floorball.build(_message);
            // console.log("Floorball Frame");
            break;
        case 0x22:
            toInsert = Frames.IceHockey.build(_message);
            // console.log("IceHockey Frame");
            break;
        case 0x23:
            toInsert = Frames.RinkHockey.build(_message);
            // console.log("RinkHockey Frame");
            break;
        case 0x24:
            toInsert = Frames.RollerInlineHockey.build(_message);
            // console.log("RollerInlineHockey Frame");
            break;
        case 0x25:
            toInsert = Frames.Futsal.build(_message);
            // console.log("Futsal Frame");
            break;
        case 0x26:
            toInsert = Frames.Netball.build(_message);
            // console.log("Netball Frame");
            break;
        case 0x27:
            toInsert = Frames.Boxe.build(_message);
            // console.log("Boxe Frame");
            break;
        case 0x30:
            toInsert = Frames.Basketball.build(_message);
            // console.log("Basketball Frame");
            break;
        case 0x31:
            toInsert = Frames._0x37.build(_message);
            break;
        case 0x32:
            toInsert = Frames._0x38.build(_message);
            break;
        case 0x40:
            toInsert = Frames.Tennis.build(_message);
            // console.log("Tennis Frame");
            break;
        case 0x41:
            toInsert = Frames.Badminton.build(_message);
            // console.log("Badminton Frame");
            break;
        case 0x42:
            toInsert = Frames.TableTennis.build(_message);
            // console.log("TableTennis Frame");
            break;
        case 0x50:
            toInsert = Frames.Chrono.build(_message);
            // console.log("Chrono Frame");
            break;
        case 0x51:
            toInsert = Frames.Training.build(_message);
            // console.log("Training Frame");
            break;
        case 0x52:
            toInsert = Frames.FreeSport.build(_message);
            // console.log("FreeSport Frame");
            break;
        case 0x90:
            toInsert = Frames.TeamNames.build(_message);
            // console.log("TeamNames Frame");
            break;
        case 0x91:
            toInsert = Frames.ClearTeamNames.build(_message);
            // console.log("ClearTeamNames Frame");
            break;
        case 0x92:
            toInsert = Frames.FullClear.build(_message);
            // console.log("FullClear Frame");
            break;
        case 0x93:
            toInsert = Frames.Test.build(_message);
            // console.log("Test Frame");
            break;
        case 0x94:
            toInsert = Frames.QR.build(_message);
            // console.log("QRCode Frame");
            break;
        case 0x99:
            toInsert = Frames.ClockSetup.build(_message);
            // console.log("ClockSetup Frame");
            break;
        default:
            console.log("Unknown Frame: " + _message[1]);
            console.log(_message);
            break;
    }

    if (toInsert != null) {
      toInsert.Code = _message[1];

      // console.log(toInsert);

      // console.log(nBytesToNumber(_message[1]) + " Frame");
      this.updateState(toInsert);
      
    }
    this.Send();     
  };

  static getState() {
    return this.State;
  }

  static updateState(toInsert) {
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
  
    // Load existing storage to handle updates or retrievals
    const storage = readStorage();
  
    ['Guest', 'Home'].forEach(side => {
      const teamPath = `${side}.TeamName`;
      if (!toInsert[side]) {
        toInsert[side] = {}; // Initialize the side object if it doesn't exist
    }
  
      // Check the frame code to determine if we should store or retrieve the team name
      if (toInsert.Code === 0x90) { // Store team name
        
          storage[teamPath] = toInsert[side].TeamName.trim();
        
      } else { // Retrieve team name
        if (storage[teamPath]) {
          if (!toInsert[side]) toInsert[side] = {}; // Ensure side object exists
          toInsert[side].TeamName = storage[teamPath];
        } else if (!toInsert[side]?.TeamName?.trim()) {
          // Default to "Home" or "Guest" if the team name is not in storage and the current is empty
          if (!toInsert[side]?.TeamName) toInsert[side].TeamName = ''; // Ensure side object exists
            
          toInsert[side].TeamName = side === "Home" ? "Home" : "Guest";
          storage[teamPath] = toInsert[side].TeamName;
        }
      }
    });
  
    writeStorage(storage);
  
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
    // console.log('chronometer:', this.State.Timer.Value);
    // console.log('received mode:', this.State.Mode);
    // console.log('language:', this.State.Language);
    sharedEmitter.emit("scoring", this.State);
  }
}

module.exports = Game;
