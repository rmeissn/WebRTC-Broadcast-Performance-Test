# WebRTC-Broadcast-Performance-Test #
This repository contains the code for several performance tests and measurements for a WebRTC based broadcast solution. The different tests are instantiated as branches.
See the eval folder of each branch for a description of the test.

## Setup ##

We're expecting that each machine is running Linux (we've tested with Ubuntu 16:04 and Fedora 27). You might probably also able to execute these tests on a mac.

Install:
1. latest **NodeJS v8** and corresponding **npm**
2. **sysstat** (`sar` and `sadf` are used as programs to measure and analyze system load)
3. **zsh** (needed to execute a script from the eval folder)
4. **q-text-as-data** (used in scripts of the eval folder)
5. **util-linux** (for command `column`, used in scripts of the eval folder)
6. **coreutils** (for command `cut`, used in scripts of the eval folder)
7. **gawk** (used in scripts of the eval folder)
8. **sed** (used in scripts of the eval folder)
9. **GnuPlot** (used to plot graphics, used in scripts of the eval folder)

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
3. define a presenter machine, a second machine that measures the setup and a machine that spawns peers/creates load
4. start to measure system load by executing `measure_system.sh` inside folder eval on the presenter machine
5. open up a room on the presenter machine by going to `http://localhost:3000/presentationbroadcast?room=webrtctesting&presentation=/Presentation/386-1/` and finish the modals (keep the tab focused!)
6. open up the same URL on the second machine and have a look at the developers console. The setup will start to measure the default delay (keep the tab focused!)
7. execute script `webrtcTest_spawner1.sh` on the third machine to create some load/spawn peers for the presenter machine
8. test is running....
9. abort the test by stopping the spawner script and click on the stop test button at the presenter machine
10. collect test results from the second machine (file to download)

In order to analyze the collected data:
1. copy collected test results from the measuring machine (the downloaded json file) to the presenter machines eval folder
2. make sure that a file called "test_XYZ.bin" is also located inside this folder (created by step 4 from above)
3. execute the script "eval.sh" as described by the script
4. Tune your plot by editing the file "plot.gp"
