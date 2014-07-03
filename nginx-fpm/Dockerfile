# Nginx and PHP-FPM
#
# VERSION           0.1

FROM    phusion/baseimage
MAINTAINER Marcus Hughes <hello@msh100.uk>

# Update and fetch packages
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get -y upgrade
RUN apt-get -y install nginx php5-fpm php5-cli

# Update FPM configuration
RUN sed -i 's/www-data/app/g' /etc/php5/fpm/pool.d/www.conf
RUN adduser --disabled-password --home=/app --gecos "" app

# Update Nginx configuration
RUN sed -i 's/www-data/app/g' /etc/nginx/nginx.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
ADD site /etc/nginx/sites-enabled/default

# Copy start script
ADD start.sh /
RUN chmod +x /start.sh

# Copy dummy index.php
ADD index.php /app/index.php
RUN chown app:app /app/index.php

EXPOSE 80
CMD ["/start.sh"]