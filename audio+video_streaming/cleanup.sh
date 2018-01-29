#!/bin/bash

rm ./*.csv
echo "Deleted all result data"
echo "Do you want to delete measured data too? [ENTER/ctrl+c]:"
read tmp
rm ./*.bin ./*.json
