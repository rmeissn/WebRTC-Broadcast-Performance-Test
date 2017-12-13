#!/bin/bash

#this setup described the test for a one machine setup - this will result in very different measurements as relevant tabs can't be focused at the same time!

sleepSeconds=40
url=http://localhost:3000/presentationbroadcast\?room\=webrtctesting\&presentation\=/Presentation/386-1/

echo "Starting tabs for WebRTC testing"
# starting presenter - please finish the dialogs
google-chrome $url

read  -n 1 -p "First tab is opened. Press any key if the tab is ready:" dummyinput

echo "Now starting first tab"
# starting first peer - this one will measure everything
google-chrome $url

sleep 12

echo "Now starting tabs in groups"
# starting more peers to reach groups modulo 5 or 10 (peers including the first one)
google-chrome $url &
google-chrome $url &
google-chrome $url &
google-chrome $url &
google-chrome $url &
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

  google-chrome $url &
  google-chrome $url &
  google-chrome $url &
  google-chrome $url &
  google-chrome $url &

  echo "sleep $sleepSeconds seconds"
  sleep $sleepSeconds
done
