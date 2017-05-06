import { CronJob } from 'cron';
import analytics from '../../js/analytics';
import envKey from '../../env/slack';

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
      console.log('start');
      return new Promise((resolve, reject) => {
        console.log('promise');
        analytics(type, media, viewId)
        .then((result) => {
          console.log(result);
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

  analyticsCron('*/5 * * * * *', today);
  analyticsCron('0 35 11 * * *', week);
  analyticsCron('0 55 11 * * *', month);
};
