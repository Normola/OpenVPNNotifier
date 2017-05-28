var chokidar = require('chokidar');
var fs = require('fs');
var vpnLogFile = '/etc/openvpn/openvpn-status.log';

var watcher = chokidar.watch(vpnLogFile, {
    ignored: /[\/\\]\./
});

watcher
    .on('change', function() { change(); })
    .on('error', function(error) { watchError(error); })
    .on('ready', function() { change(); });


function change() {

    // Parse log file
    fs.readFile(vpnLogFile, 'utf8', parse);

}

function watchError(error) {
    console.log("There was an error. ", error);
}

function parse(err, data) {
    if (err) {
        return console.log(err);
    }

    if (data.indexOf('Common Name' >= 0) && data.indexOf('ROUTING TABLE') >= 0) {
        var csv = data.substring(data.indexOf('Common Name'), data.indexOf('ROUTING TABLE'));
        csv = csv.substring(csv.indexOf('Connected Since'));
        // Check for name UNDEF!
        console.log(csv);
    } else {
        return console.log('Unusual data returned');
    }
}