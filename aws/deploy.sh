#!/bin/sh
cd ~/bot
git --git-dir=.git pull origin master
sh ~/bot/bot/restart.sh
