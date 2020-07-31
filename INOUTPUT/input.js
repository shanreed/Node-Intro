#!/usr/bin/env node 
"use strict";
// IN
process.stdin.read()

// OUT
process.stdout.write("Hello World");// no trailing new line
process.stdout.write("Hello World\n");//trailing new line
console.log("Hello World")//throws on a trailing new line

// ERROR
process.stderr.write("Oops");
console.error("Oops")
