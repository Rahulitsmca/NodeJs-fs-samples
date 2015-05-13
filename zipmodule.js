var zlib = require('zlib');
var fs = require('fs');

var zipFile = function (source, destination, callback) {
    var gzip = zlib.createGzip();
    var inp = fs.createReadStream(source);
    var out = fs.createWriteStream(destination);
    inp.pipe(gzip).pipe(out);
    out.on('close', function () {
        callback();
    })
}

module.exports = zipFile;