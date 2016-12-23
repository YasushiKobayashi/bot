module.exports = (robot) ->
  robot.respond /deploy_master/, (msg) ->
    @exec = require('child_process').exec
    command = "sh ~/bot/bot/shell/deploy.sh"
    msg.send "Command: #{command}"
    @exec command, (error, stdout, stderr) ->
      msg.send error if error?
      msg.send stderr if stderr?
      if stdout?
        stdout = JSON.parse(stdout)+'\n'
        stdout += 'https://ap-northeast-1.console.aws.amazon.com/codedeploy/home
        ?region=ap-northeast-1#/deployments/'+stdout['deploymentId']
        msg.send stdout

  # サーバーの増築
  # deploy用のエンドポイント
