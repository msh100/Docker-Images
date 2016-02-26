# Logstash send S3 Access Logs to Elasticsearch

> **Note:** This container is made to run on AWS.
> A role is required so that the instance running this container can access the S3 bucket containing the access logs.

This Docker image is useful if you have S3 access logs which you want to place within Elasticsearch. 


## Environment Variables

The following configuration options must be defined:

**S3_BUCKET**: The bucket in which the S3 access logs are stored, and a role to access is granted.
**S3_REGION**: The region in which the above bucket is located.
**S3_LOGPREFIX**: The prefix of the logfiles, for example `s3/logs/`
**ES_HOST**: The Elasticsearch host with SSL port.


## Runtime Example

```
    docker run -d -e "S3_BUCKET=clusterhq-logs" \
        -e "S3_REGION=us-east-1" \
        -e "S3_LOGPREFIX=archive.clusterhq.com/s3/" \
        -e "ES_HOST=elasticsearch-afewoifhwefwi.us-east-1.es.amazonaws.com:443" \
        msh100/s3-access-logstash
````


## Notes

You may use this container outside of AWS, however you will need to expand on it to add your S3 credentials.
