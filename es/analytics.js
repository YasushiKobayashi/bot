require('babel-polyfill');
const google = require('googleapis');
const key = require('../env/google_api.json');
const envKey = require('../env/slack.json');
const co = require('co');

const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics'], null);
const analyticsApi = google.analytics('v3');

const authTask = () => {
  return new Promise((resolve, reject) => {
    jwtClient.authorize((err, result) => {
      if (err) {
        reject(err);
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
    }, (err, result) => {
      if (err) {
        reject(err);
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

const analytics = (type, media) => {
  const viewId = envKey.bigissue_view_id;
  return co(function* () {
    const result = yield authTask();
    const getApi = yield gaTask(result.access_token, viewId, type);
    return yield gaMessage(type, getApi, media.url);
  }).catch((err) => {
    console.log(err);
  });
  // authTask().then((result) => {
  //   return gaTask(result.access_token, viewId, type);
  // })
  // .then((result) => {
  //   return gaMessage(type, result, media.url);
  // })
  // .then((result) => {
  //   return result;
  // })
  // .catch((err) => {
  //   console.log('err');
  //   console.log(err);
  // });
};
// //
//
//
// const analytics = (type, media) => {
//   const viewId = envKey.bigissue_view_id;
//   Promise.resolve().then(() => {
//     return authTask();
//   }).then((result) => {
//     return gaTask(result.access_token, viewId, type);
//   }).then((result) => {
//     return gaMessage(type, result, media.url);
//   });
// };
const today = {
  startDate: '30daysAgo',
  time: '今月',
};
const media = {
  type: 'blog',
  url: 'https://yasushikobayashi.info',
};
console.log(analytics(today, media));
module.exports = analytics;
