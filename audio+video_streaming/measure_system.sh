#!/bin/bash

if [ "$#" != "1" ]; then
  echo "Too few/much arguments! Use like ''./measure_system.sh OUTPUT_FILE_EXTENSION'"
  echo "e.g. './measure_system.sh 1' to get test_1.bin"
  exit 1
fi

2>/dev/null 1>&2 sar -o test_$1.bin 1
