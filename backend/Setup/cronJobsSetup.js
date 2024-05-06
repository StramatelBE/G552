const cronJobs = require('../Cronjob/Cron_index');

const setupCronJobs = () => {
    cronJobs.startAllJobs();
};

module.exports = setupCronJobs;
