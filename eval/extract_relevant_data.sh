#!/bin/bash

sadf -d test_X.bin -- -u > cpu.csv
sadf -d test_X.bin -- -n > network.csv
sadf -d test_X.bin -- -r > memory.csv
