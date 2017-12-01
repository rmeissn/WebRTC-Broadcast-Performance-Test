#!/bin/bash

if [ "$#" != "2" ]; then
  echo "Too few/much arguments! Use like ./extract_relevant_data.sh INPUT_FILE_NAME IFACE_NAME"
  echo "e.g. './extract_relevant_data.sh test_1.bin eth0'"
  exit 1
fi

sadf -d $1 -- -u > cpu.csv
sadf -d $1 -- -n DEV | grep "$2\|# " > network.csv
sadf -d $1 -- -r > memory.csv

#filter columns
#filter for timestamp and idle
cut --delimiter=";" -f 3,10 cpu.csv > cpu_filtered.csv
#filter for timestamp, rxkB/s and txkB/s
cut --delimiter=";" -f 3,7,8 network.csv > network_filtered.csv
#filter for timestamp, kbmemfree and kbmemused
cut --delimiter=";" -f 3,4,6 memory.csv > memory_filtered.csv

#join files
join --header -t\; cpu_filtered.csv network_filtered.csv | join --header -t\; - memory_filtered.csv > combined.csv
