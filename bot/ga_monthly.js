var google = require('googleapis');
var key = require('../env/google_api.json');
var env_key = require('../env/slack.json');
var jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/analytics'], null);
var analytics = google.analytics('v3');
var viewId = env_key.blog_view_id;

function authTask() {
  return new Promise((resolve, reject) => {
    jwtClient.authorize((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function gaTask(token, viewId) {
  return new Promise((resolve, reject) => {
    analytics.data.ga.get({
      'ids': 'ga:' + viewId,
      'start-date': '30daysAgo',
      'end-date': 'today',
      'metrics': 'ga:pageviews,ga:avgTimeOnPage',
      'dimensions': 'ga:pagePath,ga:pageTitle',
      'filters': 'ga:pagePath=~/',
      'max-results': 15,
      'sort': '-ga:pageviews',
      'access_token': token
    }, (err, result) => {
      if (err) {
        reject(err);
      } else if (result) {
        resolve(result);
      }
    });
  });
}

authTask().then(result => {
  return gaTask(result.access_token, viewId);
})
.then(result => {
  console.log(JSON.stringify(result));
})
.catch(err => {
  console.log(err);
});
