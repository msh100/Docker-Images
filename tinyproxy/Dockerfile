# TinyProxy
#
# VERSION           0.1

FROM    phusion/baseimage
MAINTAINER Marcus Hughes <hello@msh100.uk>

# Update and fetch packages
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get -y upgrade
RUN apt-get -y install tinyproxy

RUN mkdir -m 777 /var/run/tinyproxy/

ADD start.sh /
RUN chmod +x /start.sh

EXPOSE 8888
CMD ["/start.sh"]