Where am I?
===========

A simple Node.JS application which polls a public IP API to determine the hosts public IP address. When the IP changes, the previous addresses will still be shown and the time they were last hosting this application.


Usage
-----

```
    docker run -d -p 80:8888 -v=/volume/on/host/:/data/ msh100/where-am-i
```

Then visit the container in a browser.


Environment
-----------

`POLLINTERVAL` - The time in milliseconds after finishing an API call until the application should contact the IP API again. Default `5000`.
`STATEFILE` - The path to the JSON file in which to store the application state.
