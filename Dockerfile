FROM ubuntu:16.04

RUN apt-get -y update && apt-get -y upgrade
RUN apt-get install -y less nano vim git sudo supervisor lsof
RUN apt-get install -y npm nodejs nginx curl

RUN apt-get update
RUN apt-get install -y mysql-server
RUN service mysql start
RUN mysql_secure_installation

RUN npm install -g nodemon babel-cli babel-preset-es2015 babel-preset-stage-2
RUN ln -s "$(which nodejs)" /usr/bin/node

RUN mkdir -p /var/log/supervisor && mkdir -p /var/log/babel

ENV PORT=8080

COPY env/nginx/nginx.conf /etc/nginx/nginx.conf
COPY env/nginx/nginx.default /etc/nginx/sites-enabled/default
COPY env/supervisord.conf /etc/supervisor/conf.d/supervisoetrd.conf

ENV TERM=xterm
EXPOSE 3000 80 443 22 999 666
CMD ["supervisord"]