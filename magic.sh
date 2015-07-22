#
# TODO: Must set environment variable to magic directory, otherwise
#		we can't reference stuff in there from within this script (or can we?)
#
if [[ $# -eq 0 || $1 == "-h" ]]; then
	echo "Usage: ./magic.sh [options] [ FILE(S) | DIRECTORY ]"
	echo "    Example: ./magic.sh -A -d ~/projects/awesome_project/source"
	echo ""
	echo "Options:"
	echo "  -A               runs the code analyser on the specified file(s) or directory"
	echo "                       ./magic.sh -A file1 file2 file3..."
	echo "                       ./magic.sh -A target_dir"
	echo "  -d  [DIRECTORY]  target directory"
	echo "  -o  [DIRECTORY]  output directory. If not specified, output will be sent to:"
	echo "                       $PWD/magic_out"
	echo "  -r               process directories recursively (requires -d)"
	echo ""
else
	if [[ ! -d "build/." ]]; then
		./build_magic.sh
	fi
fi
