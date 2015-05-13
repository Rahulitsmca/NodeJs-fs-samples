var fs = require('fs');
var zip = require('./zipmodule');
var traverse = require('./traverse');
var mergedData = '';
var file1 = './data/data1.txt';
var file2 = './data/data2.txt';
var mergedFile = './data/merged.txt';
var mergedFileNewPath = './data/zipped-data/merged.txt';
var folderPath = './data/zipped-data';
var zippedFieName = './data/zipped-data/merged.txt.gz';


fs.readFile(file1, ReadSecondFile);

function ReadSecondFile(err, data) {
    if (err) {
        console.log("There are some error in ReadSecondFile");
        throw err;
    }
    console.log('first file loaded');
    mergedData = data;
    fs.readFile(file2, Task2);
}

function Task2(err, data) {
    mergedData += data;
    if (err) {
        console.log("There are some error  in Task2");
        throw err;
    }
    console.log('second file loaded');
    fs.writeFile(mergedFile, mergedData, Task3);
}

function Task3(err) {
    if (err) {
        console.log("There are some error in Task3");
        throw err;
    }
    console.log('merged file saved!');
    if (!fs.existsSync(folderPath))
        fs.mkdir(folderPath, Task4);
    else
        Task4();
}

function Task4(err) {
    if (err) {
        console.log("There are some error in Task4");
        throw err;
    }
    console.log('dir created !');
    fs.rename(mergedFile, mergedFileNewPath, ZipMergedFile);
}

function ZipMergedFile(err) {
    if (err) {
        console.log("There are some error in ZipMergedFile");
        throw err;
    }
    console.log('merged file moved !');
    zip(mergedFileNewPath, zippedFieName, Task5);
}


function Task5(err) {
    if (err) {
        console.log("There are some error in Task5");
        throw err;
    }
    console.log('Zip file created!');
    fs.unlink(mergedFileNewPath, Task6);
}

function Task6(err) {
    if (err) {
        console.log("There are some error in Task6");
        throw err;
    }
    console.log('merged file deleted!');
    traverse(".");
    console.log('all files and dir printed');
}




