# WebRTC-Broadcast-Performance-Test #
This repository contains the code for several performance tests and measurements for a WebRTC based broadcast solution. The different tests are instantiated as branches.

## Setup ##

We're expecting that each machine is running Linux (we've tested with Ubuntu 16:04 and Fedora 27).

Install latest [NodeJS v8](https://nodejs.org/), [npm](https://github.com/npm/npm) and sysstat (`sar` and `sadf` are used as programs to measure and analyze system load).

Clone the repository recursively to make sure you clone the submodules as well: `git clone  --recursive https://github.com/rmeissn/WebRTC-Broadcast-Performance-Test.git`
Run:

```
git submodule init
git submodule update
npm install
cp ./configs/microservices.sample.js ./configs/microservices.js
```

The microservices config file from above points by default to an external development environment that might change in the future. We cannot guarantee that this environment will be compatible to this code over time. If you want to make sure that you don't run into any problems, you need to setup the WebRTC Signaling Service (located in folder `WebRTC-Signaling-Service`) yourself at some domain that is secured by HTTPS and exchange the appropriate line in `microservices.js` from above.

Now you're ready to start the program in production mode by running
`npm run build`
If you want to modify this source code, start the program in dev mode by runnng:
`npm run dev`

The application is started by default at `http://localhost:3000` and we're using only a part of application, that is reachable at `http://localhost:3000/presentationbroadcast?room=webrtctesting&presentation=/Presentation/386-1/` - room and presentation parameters may be freely chosen for any tests but are configured to these values in any mentioned scripts.

## Run tests/measurements ##

We've created some scripts in folder `test` to ease the execution of any tests. These are all prefixed by `webrtcTest`.

In order to replicate our tests/measurements
1. setup at least three computers in a local network that is suiteable for WebRTC
2. open up a recent webbrowser on each of these machines (preferably chrome or firefox)
3. define a presenter machine, a second machine that measures the setup and a machine that spawns peers/created load
4. open up a room on the presenter machine by going to `http://localhost:3000/presentationbroadcast?room=webrtctesting&presentation=/Presentation/386-1/` and finish the modals (keep the tab focused!)
5. open up the same URL on the second machine and have a look at the developers console. The setup will start to measure the default delay (keep the tab focused!)
6. execute script `webrtcTest_spawner1.sh` on the third machine to create some load/spawn peers for the presenter machine
7. test is running....
8. abort the test by stopping the script and click on the stop test button at the presenter machine
9. collect test results from the second machine (see developers console)

If you want to also measure system load of the presenter machine, open up a console and execute `sar -o test_X.bin 1`. This will collect relevant system information every second and save them to the mentioned file. You may filter the recorded data by using the program `sadf`. We've provided a script in the folder `eval` that extracts relevant data from this binary file and saves them to a .csv file.

We've imported these CSV files to LibreOffice Calc, as well as the json results from the browsers developers console. We've payd attention to CPU utalization, memory usage and network upload and generated graphs from all these values.
