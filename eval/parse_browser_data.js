#!/usr/bin/env node
'use strict';
//

if(process.argv.length !== 3){
    console.log('too few/many arguments, use as "./parse_browser_data.js browser_data.json > browser_data.csv"');
    process.exit(1);
}

let filename = process.argv[2];
let fs = require('fs');
let text = fs.readFileSync(filename).toString();
let obj = JSON.parse(text);

console.log('peers;starttime;endtime;avarage;variance;deviation');
obj.forEach((obj) => {
    // add the fields which you want to extract here:
    let tolog = [
        obj.peers,
        obj.starttime,
        obj.endtime,
        obj.filtered.average,
        obj.filtered.variance,
        obj.filtered.deviation
    ];
    // print the fields, joined by a semicolon (CSV, duh.)
    console.log(tolog.join(';'));
});
