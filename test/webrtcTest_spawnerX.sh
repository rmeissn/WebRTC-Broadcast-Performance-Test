#!/bin/bash

#this script is used to spawn peers on additonal machines that shall create peers for load reasons

sleepSeconds=60
url=http://localhost:3000/presentationbroadcast\?room\=webrtctesting\&presentation\=/Presentation/386-1/

echo "Starting first group of tabs"

while :
do
  for i in `seq 1 10`;
  do
    google-chrome $url &
    sleep 1
  done

  echo "sleep $sleepSeconds seconds"
  sleep $sleepSeconds
  echo "Starting next group of tabs"
done
