const schedule = require("node-schedule");

const rule1 = "20 * * * * *"

// schedule.scheduleJob(rule1, async ()=>{
//     console.log("1분마다 실행합니다,.");
// })

// const rule = new schedule.RecurrenceRule();
// rule.hour=23;
// rule.minute=42;
// console.log(rule);


// schedule.scheduleJob(rule, async ()=>{
//     console.log("rule 실행", Date());
//     console.log(new Date())
// })

const now = new Date();
const now1 = Date();
const nowMS = now.getTime();
//const nowMS1 = now1.getTime();
console.log(now);
console.log(now1);
console.log(nowMS);
//console.log(nowMS1);

const convert = new Date();