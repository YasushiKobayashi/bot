module.exports = (robot) ->
  send = (channel, msg) ->
    robot.send {room: channel}, msg
  robot.router.post "/git", (req, res) ->
    message(req, res, '#bot')

  message = (req, res, room) ->
    data = req.body
    try
      # コメントのとき
      if data.comment?
        message = data.issue.title
        message += "\r\n\r\n#{data.issue.html_url}"
        message += "\r\n#{data.comment.body}"

      # プルリクのとき
      else if data.pull_request?
        message = data.pull_request.title
        message += "\r\n\r\n#{data.pull_request.body}"
        message += "\r\n#{data.pull_request.html_url}"
        if data.pull_request.assignee?
          if data.pull_request.assignee.login?
            message += "\r\n to #{data.pull_request.assignee.login}"

      # イシューのとき
      else if data.issue?
        message = data.issue.title
        message += "\r\n\r\n#{data.issue.body}"
        message += "\r\n#{data.issue.html_url}"
        if data.issue.assignee?
          if data.issue.assignee.login?
            message += "\r\n to #{data.issue.assignee.login}"

      message += "\r\nfrom #{data.sender.login}"

      if data.action == "closed"
        message += "\r\n は閉じられました。"

      # Slack に投稿
      if message?
        send room, message
        res.end "OK"
      else
        send room, "error"
        res.end "Error"

    catch error
      send room, "error."
      res.end "Error"
