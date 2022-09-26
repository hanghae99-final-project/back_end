const process = require('process');
const { DateTime } = require("luxon");
const logDir = `${process.cwd()}/ogs`;

console.log(logDir);

const startOfWeek = new Date(DateTime.fromISO("2022-09-26").plus({ hours: 2 }));
console.log(startOfWeek.toISOString())

const a =new Date()
console.log(a)

const day = DateTime.fromISO(a.toISOString());
console.log(day.toISODate())