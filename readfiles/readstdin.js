#!/usr/bin/env node 
"use strict"
console.log(process.argv)// prints arguments passed to program
console.log(process.argv.slice(2))// slices of first two arguments 
printHelp();

var util = require("util")
var fs = require("fs")
var path = require("path"); 


var getStdin = require("get-stdin")




var args = require('minimist')(process.argv.slice(2), {
    boolean: [ "help", " in" ],
    string: [ "file"]
})
console.log(args)

if (args.help) {
    printHelp()
} else if (args.in || args._.includes("-")) { //a single hypen at the end means stdin will provide all the inputs and since the shell does not know that we have to provide it to it 
    getStdin()// getStdin resolves to a promise with all the contents
    .then(processFile)
    .catch(error)
}else if (args.file) { 
    fs.readFile(path.resolve(args.file), function onContents(err, contents) {
        if (err) {
            error(err.toString());
        } else {
            processFile(contents.toString())
        
        }
    })
  
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
function processFile(contents) {
    contents = contents.toUpperCase()
    process.stdout.write(contents)
    
   
}





function printHelp() {
    console.log("ex1 usage")
    console.log(" ex1.js --file={FILENAME}")
    console.log(" ")
    console.log("--help                            print this help")
    console.log("--file={FILENAME}                 process the file")
    console.log("--in, -                           process the stdin")
    console.log(" ")

}