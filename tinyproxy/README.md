TinyProxy
=========

This Dockerfile will run a TinyProxy (lightweight HTTP proxy) service.

Usage
-----

To use, run the Docker container with the public IP which will be accessing the proxy. This is to prevent unwanted access. You can use [online services][1] to find your IP address.

    docker run -p 8888:8888 -e "PROXY_IP=XXX.XXX.XXX.XXX" msh100/tinyproxy
    
To run in the background, add the -d switch to `docker run`.

  [1]: http://www.whatsmyip.org/