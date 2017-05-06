import { CronJob } from 'cron';
import analytics from '../../js/analytics';
import envKey from '../../env/slack.json';

const viewId = envKey.blog_view_id;

const media = {
  type: 'blog',
  url: 'https://yasushikobayashi.info',
};

module.exports = (robot) => {
  const sendMessage = (channel, message) => {
    robot.send({
      room: channel,
    }, message);
  };

  const analyticsCron = (timing, type) => {
    new CronJob(timing, () => {
      return new Promise((resolve, reject) => {
        analytics(type, media, viewId)
        .then((result) => {
          resolve(sendMessage('#analytics', result));
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
      });
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

  analyticsCron('0 15 11 * * *', today);
  analyticsCron('0 35 11 * * *', week);
  analyticsCron('0 55 11 * * *', month);
};
