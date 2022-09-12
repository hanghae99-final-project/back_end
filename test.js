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

// const now = new Date();
// const now1 = Date();
// const nowMS = now.getTime();
//const nowMS1 = now1.getTime();
// console.log(now);
// console.log(now1);
// console.log(nowMS);
//console.log(nowMS1);

// const convert = new Date();

// const moment = require("moment");
// const today = moment().startOf("day");
// console.log(today)
// console.log(today.toDate())
// console.log(moment(today).endOf("day").toDate())

// today.add(2,"hours");
// console.log(today)
// console.log(today.toDate())
// console.log(moment(today).endOf("day").add(2,"hours").toDate())





// const todayStart = moment().startOf("day").add(2,"hours");
// const todayEnd = moment().endOf("day").add(2,"hours");
// console.log(todayStart)
// console.log(todayStart.toDate())
// console.log(todayEnd)
// console.log(todayEnd.toDate())

// const yesterdayStart = moment(todayStart).subtract(1, "day");
// const yesterdayEnd = moment(yesterdayStart).endOf("day").add(2,"hours");
// console.log(yesterdayStart)
// console.log(yesterdayEnd)

const timeoutId = setTimeout(()=> console.log("2초 후에 실행됨"),2000);
console.log("aaaa");
console.log(timeoutId)
console.log(new Date())
console.log(new Date().getTime())
console.log(843184/(1000*60))
console.log(new Date());
