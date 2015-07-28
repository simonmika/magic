#magic

Code analyzer for [ooc](http://ooc-lang.org)

#very much readme
Very, very early alpha stage.
* The lexer must be improved and streamlined.
* A parse tree is yet to be implemented.
* The analyzer will work with a proper parse tree, once implemented.
This will enable more complex checks. Right now, a limited set of checks has been hacked together using the
token list generated from each file.
* Certain parts of the code need refactoring.
* Command line arguments are not implemented.

#requirements
Known to work on Linux, status on other platforms is unknown.
* [node.js](http://nodejs.org/)
* [Typescript compiler](http://www.typescriptlang.org/)

#shell scripts
* __build_magic.sh__ builds magic and stuffs the output in ./build
* __clean_magic.sh__ removes the compiled files
* __magic.sh__ magic app entry point

#usage
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

# credits
