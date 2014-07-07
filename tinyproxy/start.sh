#!/bin/bash
echo Allow $PROXY_IP >> /etc/tinyproxy.conf

tinyproxy -d