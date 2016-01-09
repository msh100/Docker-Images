FROM ubuntu:14.04
MAINTAINER Marcus Hughes <hello@msh100.uk>

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y libc6-i386 wget 

RUN useradd -ms /bin/bash game
WORKDIR /home/game

ADD start /home/game/
RUN chmod +x start
USER game

RUN wget http://msh100.uk/files/et.tar && tar -xvf et.tar && rm -rf et.tar

EXPOSE 27960/UDP

ENTRYPOINT ["/home/game/start"]
