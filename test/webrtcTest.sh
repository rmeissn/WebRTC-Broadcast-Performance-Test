#!/bin/bash

sleepSeconds=40
url=http://localhost:3000/presentationbroadcast\?room\=webrtctesting\&presentation\=/Presentation/386-1/

echo "Starting tabs for WebRTC testing"

google-chrome $url

read  -n 1 -p "First tab is opened. Press any key if the tab is ready:" dummyinput

echo "Now starting first tab"

google-chrome $url

sleep 12

echo "Now starting tabs in groups"

google-chrome $url &
google-chrome $url &
google-chrome $url &
google-chrome $url &

echo "sleep $sleepSeconds seconds"
sleep $sleepSeconds

while :
do
  google-chrome $url &
  google-chrome $url &
  google-chrome $url &
  google-chrome $url &
  google-chrome $url &

  echo "sleep $sleepSeconds seconds"
  sleep $sleepSeconds
done
