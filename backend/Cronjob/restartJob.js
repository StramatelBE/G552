// restartJob.js

const cron = require('node-cron');
const exec = require('child_process').exec;
const Veille = require('../Models/veilleModel'); // Ajustez le chemin selon votre structure de dossiers
const { log } = require('console');

const veille = new Veille();

const restartJob = {
  scheduleReboot: function(rebootHour, rebootMinute) {
    cron.schedule(`${rebootMinute} ${rebootHour} * * *`, () => {
      exec('sudo reboot', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing reboot command: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Error output from reboot command: ${stderr}`);
          return;
        }
        console.log(`Scheduled reboot executed at ${rebootHour}:${rebootMinute}`);
      });
    }, {
      scheduled: true,
      timezone: "Europe/Paris" // Changez selon votre fuseau horaire
    });
  },
  start: function() {
    veille.getAll().then(results => {
        console.log(results)
      if (results && results.length > 0) {
        const firstResult = results[0];
        console.log(results);
        console.log(firstResult);
        const restartTime = firstResult.restart_at; // Format "hh:mm"
        console.log(restartTime);
        const [rebootHour, rebootMinute] = restartTime.split(':').map(String);
        this.scheduleReboot(rebootHour, rebootMinute);
      } else {
        console.error('No restart time found.');
      }
    }).catch(error => {
      console.error('Error retrieving restart time:', error);
    });
  }
};

module.exports = restartJob;
