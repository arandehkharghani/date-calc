#! /usr/bin/env node
/// <reference path="./typings/tsd.d.ts" />
'use strict'

import calculation = require('./app/date.calculator');
let obj = new calculation();

const args = process.argv;
args.splice(0, 2);
const firstArg = args[0];
const secondArg = args[1];

var test = async () => {
    try {
        let result = await obj.calc(firstArg, secondArg);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
}

test();

