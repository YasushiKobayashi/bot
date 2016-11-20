#!/bin/sh
token=`node slack.js`
export HUBOT_SLACK_TOKEN=$token
npm install
forever start -c coffee node_modules/hubot/bin/hubot --adapter slack
