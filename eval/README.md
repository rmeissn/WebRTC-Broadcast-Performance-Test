# Test description #
The test for the maximum number of allowed peers reverses the order in which messages are sent to peers, so that the first connected peer will always be handled last. This test executes the exact same test in order of peer arrivel, instead of in reverse order. This is used to determine if this has an effect on the delay.

Execute the test like described in the root folders README.md. Depending on your aimed results, you might need more than one machine that spawns peers, as opening a lot of tabs in a browser allocates a lot of RAM.
