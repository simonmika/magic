# 0.1.4-alpha
* fixed a bug in ThisUsage rule where it would stop analyzing the file if it came across ```cover from```
* improved EmptyLines rule to detect unnecessary empty line(s) before EOF and before closing curly
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