const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database'); // Assuming a database.js file for Sequelize connection
const { Home } = require('../RSCOM/Utils/Enums/eTeam');

class GameModel extends Model {}

GameModel.init({
  Code: DataTypes.STRING,
  Language: DataTypes.STRING,
  Mode: DataTypes.STRING,
  Sport: DataTypes.STRING,
  Display: DataTypes.STRING,
  Period: DataTypes.STRING,
  Set: DataTypes.STRING,
  TieBreak: DataTypes.STRING,
  Timer: DataTypes.TEXT, // JSON stringified
  Timer24s: DataTypes.TEXT, // JSON stringified
  ClockDisplay: DataTypes.STRING, // Renamed to avoid conflict with Clock object
  GuestPlayerNames: DataTypes.TEXT, // JSON stringified array
  GuestPlayerNumbers: DataTypes.TEXT, // JSON stringified array
  GuestPlayersInPlay: DataTypes.STRING,
  GuestTeamName: DataTypes.STRING,
  GuestPoints: DataTypes.STRING,
  GuestTotalPoints: DataTypes.STRING,
  GuestGameInSet: DataTypes.STRING,
  GuestPointsInSets: DataTypes.STRING,
  GuestSetsWon: DataTypes.STRING,
  GuestService: DataTypes.STRING,
  GuestFoulsIndividual: DataTypes.TEXT, // JSON stringified array
  GuestFoulsTeam: DataTypes.STRING,
  GuestFoulsRS: DataTypes.STRING,
  GuestTimeoutCount: DataTypes.STRING,
  GuestTimeoutTime: DataTypes.STRING,
  GuestPenaltiesInProgress: DataTypes.STRING,
  GuestExclusionTimer: DataTypes.TEXT, // JSON stringified array
  GuestExclusionShirtNumber: DataTypes.TEXT, // JSON stringified array
  GuestPossession: DataTypes.STRING,
  GuestWarnings: DataTypes.STRING,
  HomePlayerNames: DataTypes.TEXT, // JSON stringified array
  HomePlayerNumbers: DataTypes.TEXT, // JSON stringified array
  HomePlayersInPlay: DataTypes.STRING,
  HomeTeamName: DataTypes.STRING,
  HomePoints: DataTypes.STRING,
  HomeTotalPoints: DataTypes.STRING,
  HomeGameInSet: DataTypes.STRING,
  HomePointsInSets: DataTypes.STRING,
  HomeSetsWon: DataTypes.STRING,
  HomeService: DataTypes.STRING,
  HomeFoulsIndividual: DataTypes.TEXT, // JSON stringified array
  HomeFoulsTeam: DataTypes.STRING,
  HomeFoulsRS: DataTypes.STRING,
  HomeTimeoutCount: DataTypes.STRING,
  HomeTimeoutTime: DataTypes.STRING,
  HomePenaltiesInProgress: DataTypes.STRING,
  HomeExclusionTimer: DataTypes.TEXT, // JSON stringified array
  HomeExclusionShirtNumber: DataTypes.TEXT, // JSON stringified array
  HomePossession: DataTypes.STRING,
  HomeWarnings: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Game'
});

module.exports = GameModel;