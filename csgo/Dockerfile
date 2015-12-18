FROM ubuntu:14.04
MAINTAINER Marcus Hughes <hello@msh100.uk>

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y php5-cli lib32gcc1 wget
RUN echo 'variables_order = "EGPCS"' >> /etc/php5/cli/php.ini

RUN useradd -ms /bin/bash game
USER game
WORKDIR /home/game

RUN wget https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
RUN tar -xvf steamcmd_linux.tar.gz && rm -rf steamcmd_linux.tar.gz
RUN ./steamcmd.sh +login Anonymous +force_install_dir /home/game/csgo/ +app_update 740 +quit

EXPOSE 27015/UDP

#CMD php start
