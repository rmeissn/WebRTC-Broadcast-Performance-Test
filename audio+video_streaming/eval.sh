#!/bin/bash

# to pretty print: ./eval.sh | column -s";" -t
if [ "$#" != "3" ]; then
  echo "Too few/much arguments! Use like ./eval.sh INPUT_FILE_NAME_SYSTEM_DATA IFACE_NAME INPUT_FILE_NAME_BROWSER_DATA"
  echo "e.g. './eval.sh test.bin eth0 browser_data.json'"
  exit 1
fi

./extract_relevant_system_data.sh $1 $2
./parse_browser_data.js $3 > browser_data.csv
./combine_data.sh combined_converted.csv browser_data.csv > result.csv
cat result.csv | column -s";" -t

echo ""
echo "Creating plot..."
./plot.gp
echo "Plot created as plot.png"
