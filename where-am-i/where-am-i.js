/* Where am I?
   A simple stateful service showing 
   where I am and where I have been
   M Hughes */

var fs = require('fs');
var http = require('http');

var stateFile = process.env.STATEFILE;
if (typeof stateFile == 'undefined') {
    stateFile = '/data/whereami.json';
}

var loopTimeout = process.env.POLLINTERVAL;
if (typeof loopTimeout == 'undefined') {
    var loopTimeout = 5000;
}

// Check if state file exists

if (fs.existsSync(stateFile)) {
	// Synchronously load state data file
	console.log('State file exists, loading object');
    var obj = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
} else {
	console.log('State file doesnt exist');
    var obj = {};
}


// Function to determine current IP
function currentIP () {
    var options = {
      host: 'ip-api.com',
      port: 80,
      path: '/json'
    };

    // Make HTTP query to fetch IP data
    console.log('Making HTTP API call to check IP');

    http.get(options, function(response){
        var body = '';

        response.on('data', function(chunk){
        	// Append chunk response
            body += chunk;
        });

        response.on('end', function() {
        	// Parse returned JSON
            var parsed = JSON.parse(body);

            // Update latest IP
            console.log('IP API claims the public IP is ' + parsed.query);
            writeIP(parsed.query);
        });
    });
}


// Function to update IP
function writeIP (ipAddress, loop) {
	// Copy object into a working version so that last entry is shown
	// on HTTP requests (between pop() and push())
    var localObj = obj;
    var time = Math.floor(new Date() / 1000);

    if (typeof localObj['latest'] !== 'undefined' &&
	    localObj['latest'].ip == ipAddress) {
    	// The latest inserted IP is the same, remove entry
    	var latestTime = localObj['latest'].time;
        delete localObj[latestTime]
    }

    localObj['latest'] = {time: time, ip: ipAddress};
    localObj[time] = localObj['latest'];
    
    // Write updated object to state file
    console.log('Writing updated state file');
    fs.writeFileSync(stateFile, JSON.stringify(localObj), 'utf8');

    // Overwrite object with local one
    obj = localObj;

	// If loop is true, query IP in loopTimeout milliseconds
	loop = typeof loop !== 'undefined' ? loop : true;

    if (loop) {
    	setTimeout(currentIP, loopTimeout);
    }
}


// Function to convert timestamps to readable dates
function toDate (timestamp) {
    var date = new Date(timestamp * 1000);
    var formattedDate = ('0' + date.getDate()).slice(-2) +
        '/' + ('0' + (date.getMonth() + 1)).slice(-2) + 
        '/' + date.getFullYear() + 
        ' ' + ('0' + date.getHours()).slice(-2) + 
        ':' + ('0' + date.getMinutes()).slice(-2);

    return formattedDate;
}



// Start loop of IP check
currentIP();


// Run HTTP server
var http = require("http");

function onRequest(request, response) {
	if (request.url == '/') {
		console.log('HTTP request from ' + request.connection.remoteAddress);

	    var lastip = obj['latest'];

	    // Beginning writing HTTP output
	    response.writeHead(200, {"Content-Type": "text/html"});

	    response.write('<h1>Currently running at ' + lastip.ip + '</h1>');
	    response.write('<b>Last check:</b> ' + toDate(lastip.time));
	    response.write('<hr/>');
	    response.write('<h3>Location History</h3>');

	    // Loop over every object except 'latest'
	    for (var key in obj) {
	        if (key !== 'latest' && key != obj['latest'].time) {
	    	        response.write('Running at <b>' + 
	        		obj[key].ip + 
	    	    	'</b> until ' + 
	    		    toDate(obj[key].time) + 
	    		    '<br>');
	        }
	    }

	    // Done!
	    response.end();
	}
	else {
		// Request for something other than / - 404
		response.writeHead(404);
		response.end();
	}
}

http.createServer(onRequest).listen(8888);
