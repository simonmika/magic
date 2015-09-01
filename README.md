[![Build Status](https://secure.travis-ci.org/cogneco/magic.png?branch=master)](http://travis-ci.org/cogneco/magic)

**Table of Contents**

- [magic](#magic)
- [very much readme](#very-much-readme)
- [requirements](#requirements)
  - [If you don't have node.js and/or the Typescript compiler](#if-you-dont-have-nodejs-andor-the-typescript-compiler)
- [Installation](#installation)
  - [using the install script](#using-the-install-script)
  - [using the release](#using-the-release)
- [build](#build)
- [usage](#usage)
    - [ignore list](#ignore-list)
- [troubleshooting](#troubleshooting)
- [credits](#credits)

#magic

Code analyzer for the [ooc programming language](http://ooc-lang.org).

#requirements
Known to work on Linux (x64), status on other platforms is unknown at this time.

* 1: [node.js](http://nodejs.org/)
* 2: [Typescript compiler](http://www.typescriptlang.org/) (if you want to build it yourself)

##If you don't have node.js and/or the Typescript compiler
The node.js version provided by aptitude is outdated, so do not install via apt-get.
Instead, [download](https://nodejs.org/download/) and unpack node.js into any folder, then follow the steps outlined below.
```
cd NODE_FOLDER
./configure
make
make install
```
You may have to restart the terminal. Now that we've installed node.js, it's time to update
npm (node package manager) and then install the Typescript compiler.
```
sudo npm install -g npm
```
```
sudo npm install -g typescript
```
Now verify that Typescript has been installed:
```
tsc --v
```
It should give you version 1.5.3 or greater.

# Installation
You can install magic in two different ways:

* Using the provided install script
* Using the pre-compiled [release file](https://github.com/cogneco/magic/releases)

## Using the install script
magic's default install location is ```/usr/local/bin```, which requires you to run the installer as root.
```sudo ./install```

If you want to install magic to a different location, you may give the installer that location as an argument.
Depending on the location, you may have to run the installer as root.

```./install ~/apps/bin```

The installer will build the project for you. For ease of use, make sure you have magic's location
in your ```$PATH```.

## using the release
* Download the [latest release](https://github.com/cogneco/magic/releases) and unpack it
* Move the file ```magic``` to a location of your choosing (we recommend ```/usr/local/bin```
or any other standard bin directory)
* That's it.

#build
If you have modified the project, you must obviously re-build the project.
To do so, make sure you're in magic's root folder, then simply run: ```tsc```

#usage
If you don't specify a target directory, your current location will be used.

```
magic [TARGET DIRECTORY]
```
```
magic ~/projects/my_awesome_project/source
```
* The target directory is processed recursively.
* The analyzer output (if any) is currently directed to the console. For projects
with a lot of violations, redirecting to a file is recommended.
```
magic ~/projects/my_awesome_project/source > violations.txt
```
If you want to run the analyzer on a single file, simply specify the filename.
You may also specify a list of files, separated by a space.
```
magic ~/projects/my_awesome_project/source/math/Quaternion.ooc
```
If your shell supports wildcard expansion, you may also specify wildcards to
process files that match a certain pattern, for example, to analyze all files that start with __Matrix__:
```
magic ~/projects/my_awesome_project/source/math/Matrix*.ooc
```

###ignore list
If you want to prevent magic from analyzing certain folders or files in your project directory,
create a file called ```.magicignore``` and put it in the root folder of your project. In this file
you add everything you want to keep from magic, __relative to the project root folder__.

Example:
```
lib/somethirdpartylibrary
source/math/Transform.ooc
```

#troubleshooting
Here are some problems that may occur along the way, and hopefully, solutions to them.
* __I have installed magic, but can't seem to run it?__ Make sure the system knows where to look for it.
Try executing ```command -v magic```. The output should point to where magic is installed, if it is empty,
then you need to add magic's location to your ```$PATH```.

# credits
