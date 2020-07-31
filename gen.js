#!/usr/bin/env node 
"use strict"
console.log(process.argv)// prints arguments passed to program
console.log(process.argv.slice(2))// slices of first two arguments 
printHelp();



function printHelp() {
    console.log("ex1 usage")
    console.log(" ex1.js --file={FILENAME}")
    console.log(" ")
    console.log("--help                            print this help")
    console.log("--file={FILENAME}                 process the file")
    console.log(" ")

}