import 'babel-polyfill';
import google from 'googleapis';

import key from '../env/google_api.json';

const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics'], null);
const analyticsApi = google.analytics('v3');

const authTask = () => {
  return new Promise((resolve, reject) => {
    jwtClient.authorize((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const gaTask = (token, viewId, type) => {
  return new Promise((resolve, reject) => {
    analyticsApi.data.ga.get({
      ids: `ga:${viewId}`,
      'start-date': type.startDate,
      'end-date': 'today',
      metrics: 'ga:pageviews,ga:avgTimeOnPage',
      dimensions: 'ga:pagePath,ga:pageTitle',
      filters: 'ga:pagePath=~/',
      'max-results': 15,
      sort: '-ga:pageviews',
      access_token: token,
    }, (error, result) => {
      if (error) {
        reject(error);
      } else if (result) {
        resolve(result);
      }
    });
  });
};

const gaMessage = (type, obj, url) => {
  const object = obj.rows;
  let message = `${type.time} の人気記事ランキング！`;
  Object.keys(object).forEach((key) => {
    const time = Math.floor(object[key][3]);
    const m = Math.floor(time / 60);
    const s = time - (m * 60);
    const avg = `${m}分${s}秒`;
    message += `
    ${parseInt(key, 10) + 1} 位
    ${object[key][1]}
    ${object[key][2]} PV ・ 滞在時間： ${avg}
    ${url}${object[key][0]}`;
  });
  return message;
};

const analytics = (type, media, viewId) => {
  return new Promise((resolve, reject) => {
    authTask().then((result) => {
      return gaTask(result.access_token, viewId, type);
    })
   .then((result) => {
     return gaMessage(type, result, media.url);
   })
   .then((result) => {
     resolve(result);
   })
   .catch((error) => {
     console.log('error');
     reject(error);
   });
  });
};
// const today = {
//   startDate: '1daysAgo',
//   time: '昨日',
// };
// const media = {
//   type: 'blog',
//   url: 'https://yasushikobayashi.info',
// };
// console.log(analytics(today, media, '79127044'));
module.exports = analytics;
