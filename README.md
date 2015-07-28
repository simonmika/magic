#magic

Very, very early alpha stage.
* The lexer must be improved and streamlined.
* A parse tree is yet to be implemented.
* The analyzer must work with a proper parse tree instead of a list of tokens, which will allow for more complete checks.

#requirements
Known to work on Linux, status on other platforms unknown.
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
The target directory will be processed recursively.

# credits
