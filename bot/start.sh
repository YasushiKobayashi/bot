#!/bin/sh
token=`cat ../env/slack.json | jq -r .bot`
export HUBOT_SLACK_TOKEN=$token
forever stop -c coffee node_modules/hubot/bin/hubot
yarn
forever start -c coffee node_modules/hubot/bin/hubot --adapter slack
