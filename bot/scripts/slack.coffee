exec = require('child_process').exec
module.exports = (robot) ->
  robot.respond /deploy_blog/, (msg) ->
    command = "cd ~/shell/deploy_blog.sh"
    msg.send "Command: #{command}"
    exec command, (error, stdout, stderr) ->
      msg.send error if error?
      msg.send stderr if stderr?
      msg.send stdout if stdout?

  robot.respond /deploy_blog_server/, (msg) ->
    command = "cd ~/shell/deploy_blog_server.sh"
    msg.send "Command: #{command}"
    exec command, (error, stdout, stderr) ->
      msg.send error if error?
      msg.send stderr if stderr?
      msg.send stdout if stdout?

  robot.respond /deploy_bot/, (msg) ->
    command = "sh ~/shell/deploy_bot.sh"
    msg.send "Command: #{command}"
    exec command, (error, stdout, stderr) ->
      msg.send error if error?
      msg.send stderr if stderr?
      msg.send stdout if stdout?

  robot.respond /deploy_bot_server/, (msg) ->
    command = "sh ~/shell/deploy_bot_server.sh"
    msg.send "Command: #{command}"
    exec command, (error, stdout, stderr) ->
      msg.send error if error?
      msg.send stderr if stderr?
      msg.send stdout if stdout?

  robot.respond /helpme/, (msg) ->
    message = "deploy_blog \n"
    message += "deploy_blog_server \n"
    message += "deploy_bot \n"
    message += "deploy_bot_server"
    msg.send message
