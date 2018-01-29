#!/bin/bash

if [ "$#" != "2" ]; then
  echo "Too few/much arguments! Use like ./extract_relevant_system_data.sh INPUT_FILE_NAME IFACE_NAME"
  echo "e.g. './extract_relevant_system_data.sh test_1.bin eth0'"
  exit 1
fi

#sadf -d $1 -- -u > cpu.csv
#sadf -d $1 -- -n DEV | grep "$2\|# " > network.csv
#sadf -d $1 -- -r > memory.csv

#filter columns
#filter for timestamp and idle
cut --delimiter=";" -f 3,10 cpu.csv > cpu_filtered.csv
#filter for timestamp, rxkB/s and txkB/s
cut --delimiter=";" -f 3,7,8 network.csv > network_filtered.csv
#filter for timestamp, kbmemfree and kbmemused
cut --delimiter=";" -f 3,4,6 memory.csv > memory_filtered.csv

#join files
join --header -t\; cpu_filtered.csv network_filtered.csv | join --header -t\; - memory_filtered.csv > combined.csv

#convert timestamps
awk -f time_conversion.awk combined.csv > combined_converted.csv
#exchange commas for dots
sed -i -e 's/,/\./g' combined_converted.csv

#rm combined.csv cpu.csv network.csv memory.csv cpu_filtered.csv network_filtered.csv memory_filtered.csv

#cpu idle vs user+system+nice+iowait
#sadf -d test_1.bin -- -u | sed -e 's/,/\./g' | sed -e 's/# //g' | q-text-as-data --delimiter=";" -H "select \"%user\" + \"%nice\" + \"%system\" + \"%iowait\" as notidle,\"%idle\" from -" | q-text-as-data --delimiter=";" "select c1,c2,c1+c2 from -" | q-text-as-data --delimiter=";" "select * from - where c3 < 100" | column -s";" -t
