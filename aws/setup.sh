#!/bin/sh
sudo yum -y update
sudo yum -y install git
sudo yum -y install gcc make glibc-headers openssl-devel readline libyaml-devel readline-devel sqlite-devel wget expect zip unzip

node=`node -v`
if echo $node | grep -q '6.7.0'; then
  echo 'node installed'
else
  echo 'install node'
  git clone git://github.com/creationix/nvm.git ~/.nvm
  echo 'source ~/.nvm/nvm.sh' >> ~/.bash_profile
  source ~/.nvm/nvm.sh
  nvm install v6.7.0
  nvm --version
  node -v
  echo 'install hubot'
  npm install -g hubot yo generator-hubot coffee-script forever

  echo 'install redis'
  sudo rpm -ivh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
  sudo yum --enablerepo=epel -y install redis
  sudo service redis start
  sudo chkconfig redis on
fi

echo 'install awscli'
