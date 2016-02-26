#!/bin/bash

# Replace variables and generate logstash.conf
sed -e s*S3_BUCKET*${S3_BUCKET}*g logstash.template > logstash.conf
sed -i -e s*S3_REGION*${S3_REGION}*g logstash.conf
sed -i -e s*S3_LOGPREFIX*${S3_LOGPREFIX}*g logstash.conf
sed -i -e s*ES_HOST*${ES_HOST}*g logstash.conf

# Run Logstash
exec logstash --debug -f /config/logstash.conf
