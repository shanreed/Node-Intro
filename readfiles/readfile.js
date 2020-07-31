#!/usr/bin/env node 
"use strict"

var fs = require("fs")
var path = require("path"); //built into node
var args = require('minimist')(process.argv.slice(2), {
    boolean: [ "help" ],// any parameter called help in it assume it is a boolean
    string: [ "file"]
})
console.log(args)

// if (args.help) {
//     printHelp()
// } else if (args.file) { 
//     let filepath = path.resolve(args.file)

//     console.log(__dirname)//current directory of the current file
//     console.log(filepath)
// } else {
//     error("Incorrect Usage", true)
// }


if (args.help) {
    printHelp()
} else if (args.file) { 
    processFile(path.resolve(args.file))
} else {
    error("Incorrect Usage", true)
}


function error(msg, includeHelp = false) {
    console.error(msg);
    if(includeHelp) {
        console.log('');
        printHelp();
    }
}


// *********************************************
function processFile(filepath) {
    var contents = fs.readFileSync(filepath);
    process.stdout.write(contents)
}





function printHelp() {
    console.log("ex1 usage")
    console.log(" ex1.js --file={FILENAME}")
    console.log(" ")
    console.log("--help                            print this help")
    console.log("--file={FILENAME}                 process the file")
    console.log(" ")

}