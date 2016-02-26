#!/bin/bash

# Replace variables and generate logstash.conf
sed -e s*S3_BUCKET*${S3_BUCKET}*g /config/logstash.template > /config/logstash.conf
sed -i -e s*S3_REGION*${S3_REGION}*g /config/logstash.conf
sed -i -e s*S3_LOGPREFIX*${S3_LOGPREFIX}*g /config/logstash.conf
sed -i -e s*ES_HOST*${ES_HOST}*g /config/logstash.conf

# Run Logstash
exec logstash --debug -f /config/logstash.conf
