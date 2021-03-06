**Table of Contents**

- [0.1.6-alpha](#016-alpha)
- [0.1.5-alpha](#015-alpha)
- [0.1.4-alpha](#014-alpha)
- [0.1.3-alpha](#013-alpha)
- [0.1.2-alpha](#012-alpha)

# 0.1.7-alpha
* Same as 0.1.6-alpha

# 0.1.6-alpha
* No change - only release mode changes

# 0.1.5-alpha
* Fixed EmptyLines rule to check for an empty line in the beginning of a file
* Fixed KeywordSpacing rule so it does not trigger a violation when a keyword is immediately followed by the ```?``` operator.
* Added ```:``` to the SeparatorSpacing rule.
* get/set are no longer considered by the KeywordSpacing rule

# 0.1.4-alpha
* fixed a bug in ThisUsage rule where it would stop analyzing the file if it came across ```cover from```
* improved EmptyLines rule to detect unnecessary empty line(s) before EOF, before closing curly and after opening curly.
* Command-line handling was improved. You can now target a specific file, a list of files or a directory,
and also use wildcards, if your shell support wildcard expansion.

# 0.1.3-alpha
* Implemented Semicolon rule, which says that no line can end with a semicolon.
Example:
```
x = 1; y = 2; z = 3 // Allowed
x = 1; y = 2; z = 3; // Not allowed
```
* fixed a bug in ThisUsage

# 0.1.2-alpha
* a lot of bug fixes
* fixed so .ooc~ files are ignored
* improved rules for checking for excessive whitespace
* the range operator ```..``` is now required to be surrounded by spaces
* new rule: ThisUsage, which says to use ```This``` instead of the class name
* varargs is now handled properly
* keywords ```extern, unmangled, get and set``` are now required to be surrounded by spaces
* covers are now targeted by the ThisUsage rule