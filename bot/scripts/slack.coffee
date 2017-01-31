module.exports = (robot) ->
  robot.respond /deploy/, (msg) ->
    @exec = require('child_process').exec
    command = "cd ~/shell/blog_deploy.sh"
    msg.send "Command: #{command}"
    @exec command, (error, stdout, stderr) ->
      msg.send error if error?
      msg.send stderr if stderr?
      msg.send stdout if stdout?


module.exports = (robot) ->
  robot.respond /deploy_server/, (msg) ->
    @exec = require('child_process').exec
    command = "cd ~/shell/blog_server.sh"
    msg.send "Command: #{command}"
    @exec command, (error, stdout, stderr) ->
      msg.send error if error?
      msg.send stderr if stderr?
      msg.send stdout if stdout?


module.exports = (robot) ->
  robot.respond /deploy_bot/, (msg) ->
    @exec = require('child_process').exec
    command = "sh ~/shell/deploy_bot.sh"
    msg.send "Command: #{command}"
    @exec command, (error, stdout, stderr) ->
      msg.send error if error?
      msg.send stderr if stderr?
      msg.send stdout if stdout?

module.exports = (robot) ->
  robot.respond /deploy_bot_server/, (msg) ->
    @exec = require('child_process').exec
    command = "cd ~/ansible && ./blog_master.yml"
    msg.send "Command: #{command}"
    @exec command, (error, stdout, stderr) ->
      msg.send error if error?
      msg.send stderr if stderr?
      msg.send stdout if stdout?
