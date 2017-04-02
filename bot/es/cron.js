const CronJob = require('cron').CronJob;
const analytics = require('../../js/analytics');

const media = {
  type: 'blog',
  url: 'https://yasushikobayashi.info',
};

module.exports = (robot) => {
  const sendMessage = (channel, message) => {
    console.log('hoge');
    console.log(message);
    robot.send({
      room: channel,
    }, message);
  };

  const analyticsCron = (timing, type) => {
    new CronJob(timing, () => {
      return new Promise((resolve, reject) => {
        sendMessage('#analytics', analytics(type, media), (err, result) => {
          if (err) {
            reject(err);
          } else if (result) {
            resolve(result);
          }
        });
      });
      // sendMessage('#analytics', analytics(type, media));
    }).start();
  };

  const today = {
    startDate: '1daysAgo',
    time: '昨日',
  };
  const week = {
    startDate: '7daysAgo',
    time: '今週',
  };
  const month = {
    startDate: '30daysAgo',
    time: '今月',
  };

  analyticsCron('* * * * * *', today);
  analyticsCron('0 35 11 * * *', week);
  analyticsCron('0 55 11 * * *', month);
};
