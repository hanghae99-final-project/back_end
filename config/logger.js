const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const process = require("process");
 
const { combine, timestamp, label, printf } = winston.format;
 
//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir = `${process.cwd()}/logs`;
 
//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
   return `${timestamp} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});

 /*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
   format: combine(
     timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
     label({ label: "rangple" }),
     logFormat
     //? format: combine() 에서 정의한 timestamp와 label 형식값이 logFormat에 들어가서 정의되게 된다. level이나 message는 콘솔에서 자동 정의
   ),
 
   transports: [
     //* info 레벨 로그를 저장할 파일 설정 (info: 2 보다 높은 error: 0 와 warn: 1 로그들도 자동 포함해서 저장)
     new winstonDaily({
       level: "info",
       datePattern: "YYYY-MM-DD",
       dirname: logDir,
       filename: `%DATE%.log`,
       maxFiles: 30,
       zippedArchive: false, // 압축할지 안할지
     }),
 
     //* error 레벨 로그를 저장할 파일 설정 (info에 자동 포함되지만 일부러 따로 빼서 설정)
     new winstonDaily({
       level: "error",
       datePattern: "YYYY-MM-DD",
       dirname: logDir + "/error",
       filename: `%DATE%.error.log`,
       maxFiles: 30,
       zippedArchive: false,
     }),
   ],
 
   //* uncaughtException 발생시 파일 설정
   exceptionHandlers: [
     new winstonDaily({
       leve: "error",
       datePattern: "YYYY-MM-DD",
       dirname: logDir,
       filename: `%DATE%.exception.log`,
       maxFiles: 30,
       zippedArchive: false,
     }),
   ],
 });
 
 /* 
  * Production 환경이 아닌, 개발 환경일 경우 파일 들어가서 일일히 로그 확인하기 번거로우니까
  * 화면에서 바로 찍게 설정 (로그 파일은 여전히 생성됨)
  */
//  if (process.env.NODE_ENV !== "production") {
//    logger.add(
//      new winston.transports.Console({
//        format: winston.format.combine(
//          winston.format.colorize(),
//          winston.format.simple()
//        ),
//      })
//    );
//  }
 
 module.exports = logger;
 