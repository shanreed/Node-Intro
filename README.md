# Intro Node
 **run in the terminal by cd into the project folder and running `node filename.js`**


# Shebang/Hashbang comment `#!/usr/bin/env node `
* go find node in my system and use it to interpet the rest of program
* give it a name of an executeable `#!/usr/bin/env (what you want it to find)` ex: `#!/usr/bin/env node ` 
* make it an executable run `ls -ld` in the terminal
* there should be at least a `rwx` flag on the file if there is not then run `chmod u+x filename.js`
* once you have the excutable you can now run it using `./filename.js` instead of `node filename.js`

# INPUT & OUTPUT
*Console Log & Process*
* Node is about modling IO(input/output) in a efficentt way
* JavaScript does not have anything in the spec for IO
* So, how does something like `console.log("Hello World")`, becuse console.log is not in the JS spec
    * POSIX is the way c style program intergrate with liunix style operating systems
    * POSIX - Standared IO SubSystem, which is a set of three streams that model Input and Output to a program
        * we access them through `process`, an object avaliable to every node program
        * 0 - IN Stream `process.stdin.read()`
        * 1 - OUT Stream `process.stdout.write("Hello World");`
        * 2 - second output: ERROR stream `process.stderror.write("Hello World");`




*Its a good idea to have some bsic help out put, however you want it to read*

                function printHelp() {
                    console.log("ex1 usage")
                    console.log(" ex1.js -- help")
                    console.log(" ")
                    console.log("--help                            print this help")
                    console.log(" ")

                }


# Getting Input
### Using command line parameter
* access the arguments that are beomg passed into the program
    * `console.log(process.argv)`
    * run `./filename.js -something` in the terminal to see the arguments
* there are different conventions for how commad line argument get specfied on the command line get
    * `./ex1.js hello bye hello bye --bye - hello`


# MINIMIST (user, built, comes in the node modules folder)
* node does not do any parsing for us, so we can use a package call minimist
* a lot of packages depend on minimist but it has no dependencies
* low level

    * 
    * it is a fuction so we need to tell it what array we want to parse
        * `var args = require('minimist')(process.argv.slice(2)`
    * we can add a second argument (config)

            var args = require('minimist')(process.argv.slice(2), {
                boolean: [ "help" ],// any parameter called help in it assume it is a boolean
                string: [ "file"]
            })
            console.log(args)

# Should be able to receive inputs and use them to make decisions
___

##### [Path (built into node)](https://nodejs.org/api/path.html)
* `path.resolve(arsgs.file)`
* in terminal `./filename.js --file=hello`
    * implies that there is a file name hello in absolute location in the current directory
* in terminal `./filename.js --file=../hello`
    * path will figure out where this goes
* path does not tell you that the file is there it just lets you know oh this must a here

##### [__dirname]()
* tells you the current directory of the current file
* `console.log(__dirname)`
* `./filename.js --file=/tem/hello`, will not default to __dirname

So `path.resolve()` defaults to saying if you do not give me a absolute path, then I will make it relative to current __dirname


# Access File and printing Content (fs)

        function processFile(filepath) {
            var contents = fs.readFileSync(filepath);
            console.log(contents)
        }
### run in terminal `./readfile.js --file=../files/hello.txt`
* by the time the function made it to the shell `console.log(contents)` had already stringfied it into the Binary Buffer
* by default the file system command are not assuming you want to represent things as stings, but binary buffers instead
* using `process.stdout.write(contents)` will allow you to pass the binary buffer to the shell and the shell knows what to do with the bytes

        function processFile(filepath) {
            var contents = fs.readFileSync(filepath);
            process.stdout.write(contents)
        }


* The following will do the same as the above code, `utf8`: encoding
* slightly less sufficent by microseconds because we have given to the shell preprocessed string, rather than binary data

        function processFile(filepath) {
                    var contents = fs.readFileSync(filepath, "utf8");
                    console.log(contents)
                }




### readFile Async
* expects a callback 
* node uses a standard for the callback's first parameter must be error

            function processFile(filepath) {
            fs.readFile(filepath, function onContents(err, contents) {
                if (err) {
                    error(err.toString())
                    // err will be an object so calling toString will 
                    //print something useful
                } else {
                    process.stdout.write(contents)

                }
            });
        
        }



**Receive the file input on the stdin stream instead of trying to get it from the file**

#### [get-stdin](https://www.npmjs.com/package/get-stdin)(user supplied)
    * receive the file input on the stdin stream instead of trying to get it from the file
    * a single hypen at the end means stdin will provide all the inputs
    * `cat ../files/hello.txt | ./ex1.js --in` will process the file through stdin
        * pipe the infomation in files/hello.txt, into ./ex1.js --in
        * turn the output stream and turn into a intput stream and pipe it directly into ex1.js
    * `cat ../files/hello.txt | ./ex1.js -` will also process the file through stdin

#### [ utils ]((https://nodejs.org/api/util.html)) (built into node)


Input using environment variables



