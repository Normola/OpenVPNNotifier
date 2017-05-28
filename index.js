var chokidar = require('chokidar');
var fs = require('fs');
var vpnLogFile = '/etc/openvpn/openvpn-status.log';

var watcher = chokidar.watch(vpnLogFile, {
    ignored: /[\/\\]\./
});

var log = console.bind.log(console);

watcher
    .on('change', function() { change(); })
    .on('error', function(error) { watchError(error); })
    .on('ready', function() { change(); });


function change() {

    // Parse log file
    fs.readFile(vpnLogFile, 'utf8', parse);

}

function watchError(error) {
    log("There was an error. ", error);
}

function parse(err, data) {
    if (err) {
        return console.log(err);
    }

    console.log(data);
}