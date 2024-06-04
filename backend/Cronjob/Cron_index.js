const restartJob = require('./restartJob'); 

const CronIndex = {
  startAllJobs: function() {
    console.log("Starting all CronJobs!")
    restartJob.start();
  }
};

module.exports = CronIndex;
