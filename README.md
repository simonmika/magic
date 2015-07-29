#magic

Code analyzer for [ooc](http://ooc-lang.org)

#very much readme
Very, very early alpha stage.
* The lexer must be improved and streamlined.
* A parse tree is yet to be implemented.
* The analyzer will work with a proper parse tree, once implemented.
This will enable more complex checks. Right now, a limited set of checks has been hacked together using the
token list generated from each file.
* Command line arguments are not implemented (except for -f)

#requirements
Known to work on Linux, status on other platforms is unknown.
Make sure you have a reasonably new version of the following:
* 1: [node.js](http://nodejs.org/)
* 2: [Typescript compiler](http://www.typescriptlang.org/)

#shell scripts
* ```build_magic.sh``` builds magic and stuffs the output in ./build
* ```clean_magic.sh``` removes the compiled files
* ```magic.sh``` magic app entry point

#usage
Build the project: ```./build_magic.sh```

```
./magic.sh [TARGET DIRECTORY]
```
```
./magic.sh ~/projects/my_awesome_project/source
```
* The target directory is processed recursively.
* The analyzer output (if any) is currently directed to the console. For projects
with a lot of violations, redirecting to a file is recommended.
```
./magic.sh ~/projects/my_awesome_project/source > violations.txt
```
If you want to run the analyzer on a single file, use __-f__
```
./magic.sh -f ~/projects/my_awesome_project/source/math/Quaternion.ooc
```

# credits
