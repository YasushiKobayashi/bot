const exec = require('child_process').exec;

module.exports = (robot) => {
  const sendMessage = (channel, message) => {
    robot.send({ room: channel }, message);
  };

  const shell = (command, room, env) => {
    return exec(command, (error, stdout, stderr) => {
      const messege = (error) ? error :
        (stderr) ? stderr :
        `${env} デプロイしたよー`;
      sendMessage(room, messege);
    });
  };

  robot.respond(/deploy_blog_application/, (msg) => {
    const command = 'sh ~/shell/deploy_blog.sh';
    msg.send(`Command:  ${command}`);
    shell(command, '#build', 'ブログのアプリケーション');
  });

  robot.respond(/deploy_blog_server/, (msg) => {
    const command = 'sh ~/shell/deploy_blog_server.sh';
    msg.send(`Command:  ${command}`);
    shell(command, '#build', 'ブログのサーバー');
  });

  robot.respond(/deploy_bot_application/, (msg) => {
    const command = 'sh ~/shell/deploy_bot.sh';
    msg.send(`Command:  ${command}`);
    shell(command, '#build', 'ボットのアプリケーション');
  });

  robot.respond(/deploy_bot_server/, (msg) => {
    const command = 'sh ~/shell/deploy_bot_server.sh';
    msg.send(`Command:  ${command}`);
    shell(command, '#build', 'ボットのサーバー');
  });

  robot.respond(/helpme/, (msg) => {
    const message = `deploy_blog_application
    deploy_blog_server
    deploy_bot_application
    deploy_bot_server`;
    msg.send(message);
  });
};
