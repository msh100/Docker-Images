ETPro Match server
==================

This Docker image will download the required ET maps as specified in the `MAPS` environment variable (from `REDIRECTURL`) and then spawn an ETPro server with configuration as defined in the environment variables or their defaults (refer below).

All logs are written to STDOUT so can be viewed from `docker logs` or run without the `-d` Docker run switch.

A server with this image will run 2.60b with ETTV support (password `3ttv`).

Example
-------

```
docker run -d \
  -p "10.0.0.1:27960:27960/udp" \
  -e "MAPS=adlernest:supply:braundorf_b4" \
  -e "PASSWORD=war" \
  -e "REFEREEPASSWORD=pass123" \
  msh100/etpro
```

Configuration Options
---------------------

Environment Variable | Description                    | Defaults
-------------------- | ------------------------------ | ----------------------------------------------
MAPS                 | List of maps seperated by ':'. | Default 6 maps
PASSWORD             | Server password.               | No password.
RCONPASSWORD         | RCON password.                 | No password (disabled).
REFEREEPASSWORD      | Referee password.              | No password (disabled).
SCPASSWORD           | Shoutcaster password.          | No password (disabled).
HOSTNAME             | Server hostname.               | Docker hostname.
STARTMAP             | Map server starts on.          | "radar".
REDIRECTURL          | URL of HTTP downloads          | http://www.gamestv.org/download/repository/et/
