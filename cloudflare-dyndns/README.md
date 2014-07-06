CloudFlare DynDNS
=================

This Dockerfile will keep your Docker containers public IP address up to date with a CloudFlare DNS A record (Dynamic DNS).

Usage
-----

To use, run the Docker container with your CloudFlare API credentials found on your [CloudFlare account page][1]

    docker run -e 'CF_EMAIL=hello@msh100.uk' \
               -e 'CF_HOST=home.entirely.pro' \
               -e 'CF_API=a1b2c3d4e5' \
               msh100/cloudflare-dyndns

To run in the background, add the -d switch to `docker run`.

  [1]: https://www.cloudflare.com/my-account
