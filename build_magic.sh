if [ "$1" == "-C" ]
then
	echo "Cleaning..."
	./clean_magic.sh
fi
echo "Building..."
tsc --p "source/"
echo "Done."
