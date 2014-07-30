# Flocker documentation and Nginx
#
# VERSION           0.1

FROM ubuntu:latest
MAINTAINER Marcus Hughes <marcus.hughes@clusterhq.com>

# Install requirements
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y git python-pip nginx python-dev
RUN pip install tox

# Clone flocker repo
RUN git clone https://github.com/ClusterHQ/flocker.git flocker/

# Build documentation 
RUN cd /flocker/ && tox -e sphinx

# Alter Nginx configuration 
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
ADD site /etc/nginx/sites-enabled/default

EXPOSE 80
CMD ["nginx"]
