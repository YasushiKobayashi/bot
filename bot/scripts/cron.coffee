# 定期処理をするオブジェクトを宣言
exec = require('child_process').exec
cronJob = require('cron').CronJob
request = require('request')


module.exports = (robot) ->
  # 特定のチャンネルへ送信するメソッド(定期実行時に呼ばれる)　
  send = (channel, msg) ->
    robot.send {room: channel}, msg

  new cronJob('0 20 11 * * *', () ->
    command = "node ~/bot/bot/ga_daily.js"
    send '#analytics-bot', "Command: #{command}"
    exec command, (error, stdout, stderr) ->
      send '#analytics-bot', error if error?
      if stdout
        ga_message("本日", stdout)
      send '#analytics-bot', stderr if stderr?
  ).start()

  new cronJob('0 40 11 * * *', () ->
    command = "node ~/bot/bot/ga_weakly.js"
    send '#analytics-bot', "Command: #{command}"
    exec command, (error, stdout, stderr) ->
      send '#analytics-bot', error if error?
      if stdout?
        ga_message("今週", stdout)
      send '#analytics-bot', stderr if stderr?
  ).start()

  new cronJob('0 0 12 * * *', () ->
    command = "node ~/bot/bot/ga_monthly.js"
    send '#analytics-bot', "Command: #{command}"
    exec command, (error, stdout, stderr) ->
      send '#analytics-bot', error if error?
      if stdout?
        ga_message("今月", stdout)
      send '#analytics-bot', stderr if stderr?
  ).start()

  ga_message = (time, obj) ->
    #json形式の文字列をjsonにパースする
    json = JSON.parse(obj)
    url = "http://bigissue-online.jp/"
    message = "#{time} のアクセス解析の結果です。\n\n"
    # message += "合計　#{obj.totalsForAllResults.ga\\:pageviews} PV \n"
    number = 0
    for content, index in json.rows
      number++
      time = Math.floor(content[3])
      m = Math.floor(time/60)
      s = time-(m*60)
      avg = "#{m}分 #{s}秒"
      message += "#{number}位　#{content[1]}　\n
        #{content[2]} PV ・ 滞在時間： #{avg} \n　
        #{url}#{content[0]}\n"
    send '#analytics-bot', message
