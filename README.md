># 👑취준생을 위한 시간 관리 플랫폼, 랭플👑

<img width="100%" src="https://user-images.githubusercontent.com/95389265/193836979-d0885d4e-1f0d-4796-972c-181fee784fb8.png" >

랭플은 열심히 미래를 준비하고 있음에도 불구하고, **항상 불안해하는 취준생**들을 대상으로

**불안감을 해소시키고, 동기 부여를 해줄 목적**으로 만들어진 서비스입니다. 

이러한 문제들을 아래의 solution으로 해결하고자 했습니다.

1. 공부 시간을 체크할 수 있는 **타이머**
2. 다른 사람들은 얼마나 공부하는지 확인하며 경쟁할 수 있는 **랭킹 시스템**
3. 성취감과 자신을 돌이켜 볼 수 있는 **스터디로그**

<br/>

>서비스 링크 👉: https://ranking-planner.com
>
>팀 노션 👉: https://c11.kr/161cx

<br/>


>## 🖥️기능

- **메인 페이지**
    - 타임 타이머 
    - 스톱워치
    - 랜덤 명언
    - 설정 디데이
    - todo 리스트
    - 현재 공부 중인 사람 수
- **마이 페이지**
    - 프로필 수정
    - 디데이 설정
    - 스터디로그 그래프 (월별, 주별)
    - 날짜별 todo 리스트
- **랭킹 페이지**
    - 전체, 20대, 30대 랭킹
    - 일간, 주간, 월간 랭킹

<br/><br/><br/>



>### 메인페이지

<div align="center">
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459516-9644d202-3cbb-4292-b51c-8e7727eac006.png" title="Green"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459581-ca4fd92e-a3fd-4e74-8ead-5d8ce6a91b57.png" title="Blue"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459584-4cdf119d-6c63-4e1d-8c4f-48f68ce0a15a.png" title="Red"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193460731-a4a2a4ea-da32-45ef-9a0f-f3ba89f59b80.png" title="Todo"/>
</div>

-  **타임 타이머( or Circle Timer )**  <br/>
   공부 시작 Green 휴식 시작 Blue 목표 시간 달성 Red, 시간은 매일 밤 **12시** 초기화<br/>
    - 공부 시작 : 오늘 날짜 공부 데이터가 없을 때 데이터를 생성하고 있을 경우 공부 시작 시각을 업데이트
    - 휴식 시작 : 공부 시간을 누적하고 휴식 시작
    - 휴식 종료 : 휴식 시간을 누적하고 공부 시작
    - 그만 하기 : 휴식 중일 땐 휴식 시간을 누적, 공부 중일 땐 공부 시간을 누적


- **투두 리스트**
    - Todo Get : 받아온 날짜로 Todo Document에 검색하여 todoArr를 반환
    - Todo Post : 오늘의 Todo 데이터가 없을 때 data를 생성하고 todoArr에 todo를 기록, 데이터가 있을 경우 오늘자 데이터 todoArr Push
    - Todo Put : 오늘의 Todo 데이터에서 todoArr에 받아온 index값과 동일한 todo를 변경
    - Todo Delete : 오늘의 Todo 데이터에서 todoArr에 받아온 index값과 동일한 todo를 삭제
   
- **현재 공부 중인 인원 수**
    - Studying Get : 공부 시작 버튼을 눌를 시 Studying Document에 유저정보 등록
    - Studying Delete : 그만 하기 버튼을 눌를 시 Studying Document에 유저정보 제거


<br/><br/>

>### 랭킹페이지

<div align="center">
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193480912-39f60e18-22bf-498f-bc87-0425edd14415.png" title="ranking"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193480952-e8574ba4-a40b-42ad-a10f-2611f78ee88c.png" title="bottom sheet"/>
</div>


- **랭킹**
	- 일간, 주간, 월간 랭킹 확인 가능 (Time Document 날짜 검색 범위 설정 User Document별 공부 시간 통합)
	- 유저의 연령대 별 랭킹 확인 가능 (위 절차 진행 후 연령대별 필터링)
	- 각각 유저의 랭킹에서 유저의 직종 및 현재 접속 여부 확인 가능 (Studying Document의 유저 정보 Join)


<br/><br/>


>### 마이페이지
	 
<div align="center">
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193481340-bd2aada6-9e0d-4159-9a73-b9a6b8b23390.png" title="Green"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193481380-8c1a9dfd-0e36-427b-bd11-3aa0e177872b.png" title="Blue"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193481379-6cdc9cb9-eac8-43a7-8c0f-151b703e02a3.png" title="Blue"/>
</div>

- **오늘 공부한 시간과 어플을 사용하면서 공부한 총 시간 확인 가능**
    - 유저 월간 공부 기록 : Time Document에서 날짜(월간) 범위 및 유저 정보를 기준으로 검색
    - 유저 주간 공부 기록 : Time Document에서 날짜(주간) 범위 및 유저 정보를 기준으로 검색

- **프로필 수정**
    - 유저 정보 Get : 토큰으로 받은 유저 index, User Document 검색
    - 유저 정보 Put : 닉네임, 연령대, 분야 바꾸기 가능
    - nickname의 중복체크 : 자신의 nickname을 제외한 다른 유저의 닉네임 검색

- **디데이 설정**
    - D-day Get : User Document의 D-day Array 컬럼의 서브 D-day Documents 날짜 역순으로 출력
    - D-day Post : User Document의 D-day Array 컬럼의 서브 D-day Documents 입력
    - D-day Put : 서브 D-day Documents에서 D-day index 검색 후 일치하는 D-day 수정
    - D-day Delete : 서브 D-day Documents에서 D-day index 검색 후 일치하는 D-day 삭제

- **날짜 별 투두 리스트**
	- 다른 날짜의 투두 리스트를 확인 가능(Todo Get)
	- **Done 수정 불가**

<br/>

>### Web push(알람 기능)

<div align="center">
<img src ="https://user-images.githubusercontent.com/82853790/194051121-b8500b8b-3bca-4736-bf1c-264a30a7d588.png" />
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459584-4cdf119d-6c63-4e1d-8c4f-48f68ce0a15a.png" title="Red"/>
</div>

- **목표 시간 달성 시 알람 기능**
    - 목표시간 달성 시 Web Push(FCM) 기능을 이용하여 유저에게 알람 발송
    - 유저가 웹에서 알람 허용 시 가능(로그인 시 fcm 토큰 발송)

- **목표 시간 설정 시 알람 기능 초기화**
    - 목표 시간을 달성 후 알람을 계속 받고 싶으면, 목표 시간 설정으로 알람 초기화
    
- **Firebase Cloud Messaging API(Web-push)**
    - 알림을 허용한 회원들 한에서 notification 토큰을 받은뒤 DB에 저장
    - 매 5분마다 node schedule이 목표 시간에 도달한 회원들에게 구글 firebase 서버키를 사용하여 크롭 웹 알림
<br/>


>### admin Page

<div align="center">
<img src ="https://user-images.githubusercontent.com/82853790/194051121-b8500b8b-3bca-4736-bf1c-264a30a7d588.png" />
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459584-4cdf119d-6c63-4e1d-8c4f-48f68ce0a15a.png" title="Red"/>
</div>

- **목표 시간 달성 시 알람 기능**
    - 목표시간 달성 시 Web Push(FCM) 기능을 이용하여 유저에게 알람 발송
    - 유저가 웹에서 알람 허용 시 가능(로그인 시 fcm 토큰 발송)

- **목표 시간 설정 시 알람 기능 초기화**
    - 목표 시간을 달성 후 알람을 계속 받고 싶으면, 목표 시간 설정으로 알람 초기화
    
- **Firebase Cloud Messaging API(Web-push)**
    - 알림을 허용한 회원들 한에서 notification 토큰을 받은뒤 DB에 저장
    - 매 5분마다 node schedule이 목표 시간에 도달한 회원들에게 구글 firebase 서버키를 사용하여 크롭 웹 알림
<br/>

>## 🛠️사용 기술 스택

<br/>

<div align="center">
<img height="40px" src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white"/>

</div>
<div align="center">
<img height="40px" src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
<img height="40px" src="https://camo.githubusercontent.com/fd012c7b175308b8b419e62110e7b964e351130ae6e10eb9b7b296d5fde03d60/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4157532532304543322d2532334646393930302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d616d617a6f6e2d656332266c6f676f436f6c6f723d626c61636b" alt="AWS EC2" data-canonical-src="https://img.shields.io/badge/AWS%20EC2-%23FF9900.svg?style=for-the-badge&amp;logo=amazon-ec2&amp;logoColor=black" style="max-width: 100%;">
<img height="40px" src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white"/>
<img height="40px" src="https://camo.githubusercontent.com/18deb1d9701530bd13a8f64c45eec55eec952345c2577bae39d8b94feeaa2eae/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e67696e782d3030393633392e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d4e67696e78266c6f676f436f6c6f723d7768697465" alt="Nginx" data-canonical-src="https://img.shields.io/badge/Nginx-009639.svg?style=for-the-badge&amp;logo=Nginx&amp;logoColor=white" style="max-width: 100%;">
<img height="40px" src="https://camo.githubusercontent.com/ddab8aa8df1faefb7c1355ac6379d70a62e938b68f30bc4eb6e4e5219b78fae6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f504d322d3242303337413f7374796c653d666f722d7468652d6261646765266c6f676f3d706d32266c6f676f436f6c6f723d7768697465" alt="PM2" data-canonical-src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&amp;logo=pm2&amp;logoColor=white" style="max-width: 100%;">
<img height="40px" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
<img height="40px" src="https://camo.githubusercontent.com/b47580b7e8e0b4ce9bb718070140318f72d316a0c88e0dd53a5ac4b0bdfc755e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e504d2d2532333030303030302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6e706d266c6f676f436f6c6f723d7768697465" alt="NPM" data-canonical-src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&amp;logo=npm&amp;logoColor=white" style="max-width: 100%;">
<img height="40px" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
<img height="40px" src="https://camo.githubusercontent.com/b8acfc09e5704246de1de0733d3d21384a43602705f8c62ce4e331d30e9cb800/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64656d6f6e2d2532333736443034422e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64656d6f6e266c6f676f436f6c6f723d7768697465" alt="Nodemon" data-canonical-src="https://img.shields.io/badge/Nodemon-%2376D04B.svg?style=for-the-badge&amp;logo=nodemon&amp;logoColor=white" style="max-width: 100%;">
<img height="40px" src="https://camo.githubusercontent.com/6c3b1a768a6ecac1366abd7d4930fdea1e567d5dc70ea1df0e3a05df97c1ec45/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617373706f72742d3334453237413f7374796c653d666f722d7468652d6261646765266c6f676f3d50617373706f7274266c6f676f436f6c6f723d7768697465" alt="Passport" data-canonical-src="https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&amp;logo=Passport&amp;logoColor=white" style="max-width: 100%;">
<img height="40px" src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"/>
<img height="40px" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white"/>
<img height="40px" src="http://ForTheBadge.com/images/badges/built-with-love.svg"/>

<img height="40px" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg"/>
<img height="40px" src="https://camo.githubusercontent.com/deb35fe4749fc9b312bc25c34cb8d971fc7b919d1bfa8f15b44e01d1fb4ffd8b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f476974687562253230416374696f6e732d3230383846463f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562616374696f6e73266c6f676f436f6c6f723d7768697465" alt="Github Actions" data-canonical-src="https://img.shields.io/badge/Github%20Actions-2088FF?style=for-the-badge&amp;logo=githubactions&amp;logoColor=white" style="max-width: 100%;">


</div>


<br/>


>## 📖라이브러리

<details>
<summary> Library used </summary>
 
| 이름   | 설명                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| mongoose | mongoDB 데이터를 모델링할 수 있는 간단한 스키마 기반 solution을 제공하여, 검증, 쿼리, 작성 비즈니스 로직 등이 포함되어 적용 |
| bcryptjs | bcryptjs는 순수 자바스크립트로 구현된 라이브러리오 C++로 구현된 bcrypt라이브러리를 코드의 변화 없이 대체 가능.|
| passport-local | 세션을 기반으로 한 인증- 관리자 페이지 로그인, 로그아웃을 관리용. 백엔드의 세션과 함께 브라우저 쿠키를 사용|
| passport-kakao | 카카오 소셜로그인을 필요로 한 미들웨어 라이브러리.|
| nodemailer | 인증번호를 위한 이메일 라이브러리. node.js SMTP gmail을 사용하여 이메일 전송. |
| node-schedule | 매일 00시00분 기준으로 공부시간을 DB에 저장하기 및 유저의 목표시간 달성 알람을 위해 사용.|
| joi | 가독성 및 유지보수 기능이 뛰어나므로 프로필 요효성 검사를 위해 joi를 사용. |
| http-status-codes | HTTP 상태를 알려주는 라이브러리. 정확한 오류 번호를 보내기 위해 유용하여 사용.|
| luxon | 표준시간인 DB에 한국 시간 0~24시 내에 DB가 생성되고 년월일 검색을 하기 위해 사용.|
| ejs | node.js 템플릿엔진관리자 페이지에서 데이터를 html에 사용. |
| eslint | 코드를 분석하여 오류를 찾고 인관된 코드 스타일을 유지 . prettier 코드 컨밴션을 적용|
| morgan | HTTP메서드, HTTP 상태 코드, 응답속도, 응답바이트, 요청과 응답을 한눈에 볼 수 있어 적용|
| body-parser | 요청의 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어여서 적용|
| winston | 서버의 요청, 응답, 오류를 커스텀 로깅하기 위해 적용. |
|winston-daily-rotate-file| 날짜별로 로그 파일을 관리하기 위해 사용. |

</details>



<br/>






>## 🛍️파일 구조
<details>
<summary> File structure</summary>
 
```
BackEnd
├─ app.js
├─ config
│  ├─ connect.js
│  ├─ logger.js
│  ├─ notification.js
│  └─ scheduler.js
├─ controllers
│  ├─ adminDataFunction
│  │  ├─ admin.controller.js
│  │  ├─ adminPage.controller.js
│  │  └─ login.controller.js
│  ├─ myPage.controller.js
│  ├─ profile.controller.js
│  ├─ quote.controller.js
│  ├─ rank.controller.js
│  ├─ studying.controller.js
│  ├─ time.controller.js
│  ├─ todo.controller.js
│  └─ user.controller.js
├─ errors
│  ├─ badRequestError.js
│  ├─ conflictError.js
│  ├─ customApiError.js
│  ├─ index.js
│  ├─ notFoundError.js
│  └─ unauthentiocated.js
├─ middleware
│  ├─ async.js
│  ├─ auth.js
│  ├─ errorHandler.js
│  └─ userAuth.js
├─ models
│  ├─ admin
│  │  ├─ admin.model.js
│  │  ├─ adminLogin.model.js
│  │  └─ mail.model.js
│  ├─ login.model.js
│  ├─ myPage.model.js
│  ├─ profile.model.js
│  ├─ quote.model.js
│  ├─ rank.model.js
│  ├─ search.model.js
│  ├─ studying.model.js
│  ├─ time.model.js
│  ├─ todo.model.js
│  └─ userValidation.model.js
├─ passport
│  ├─ index.js
│  ├─ kakaoLogin.js
│  └─ local.js
├─ routes
│  ├─ admin
│  │  └─ index.route.js
│  ├─ index.route.js
│  ├─ myPage.route.js
│  ├─ profile.route.js
│  ├─ quote.route.js
│  ├─ rank.route.js
│  ├─ studying.route.js
│  ├─ time.route.js
│  ├─ todo.route.js
│  └─ user.route.js
├─ schemas
│  ├─ admin.js
│  ├─ confirmNumber.js
│  ├─ quote.js
│  ├─ studying.js
│  ├─ time.js
│  ├─ todo.js
│  └─ user.js
├─ service
│  ├─ adminService
│  │  ├─ admin.service.js
│  │  └─ adminLogin.service.js
│  ├─ myPage.service.js
│  ├─ profile.service.js
│  ├─ rank.service.js
│  ├─ studying.service.js
│  ├─ time.service.js
│  ├─ todo.service.js
│  └─ user.service.js
├─ test // test code folder
├─ views // admin page ejs
└─ public // admin page css&js
```
</details>

<br/>

>## 🦾팀원

이창현(Github Link) : https://github.com/changhyeonlee-0703 <br/>
박원균(Github Link) : https://github.com/CalvinParkNov
|이름|깃허브 주소|
|--|--|
|이창현(부리더)| https://github.com/changhyeonlee-0703|
|박원균(팀원)| https://github.com/CalvinParkNov|

<br/>

>## 📝기술적 의사 결정
<details>
<summary> Trouble: Dayjs / Luxon Date Library</summary>

### 🤯 JavaScript Date의 성능 이슈.
- 날짜/시간에 대한 처리를 개발자가 직접 구현해야하는 불편함 존재.  i.e. 윤년, 9월 31
- 타 library에 비해 무겁고 속도 측면에서 느림.
- MongoDB에서 저장하는 timestamp는 UTC 기준.
- Date lib의 대안으로 가장 많이 사용하는 Moment lib을 채택했으나, legacy로 인하여 더 이상의 업데이트가 중지되었고, 추후 확장성을 위해 moment에서 추천하는 Date lib을 사용.
<p align="center"><img src="https://user-images.githubusercontent.com/82853790/193856920-b36a584d-99bf-4dc5-88e6-e65d630d5ef0.png" width="600" height="300" /></p>

### 🌠 해결.
Date Libaray : **luxon,** dayjs, date-fns (성능 테스트 : 1 - 5000번 반복하여 100번의 평균 속도를 측정)

 - 속도 : luxon ≤ date-fns < dayjs
 - 사이즈 :  date-fns> moment > luxon >>> dayjs
 - 결론 : 속도 측면에서 luxon, 사이즈 측면에서 dayjs 이나 서버 상에서 크기보단 속도가 우선이라 판단하여 가장 빠르고 비교적 사이즈가 작은 **luxon**을 채택

<div align="center">
    <img src="https://user-images.githubusercontent.com/82853790/193856772-b38c3fab-2df0-4beb-9824-036d25e1fcd3.png" width="700" height="400"/>
    <img src="https://user-images.githubusercontent.com/82853790/193856834-b7d065cc-3fed-46e3-b248-e76a8625587f.png" width="700" height="400"/>
</div>
</details>
<br/>

<details>
<summary> Technical Debate:  DB Select</summary>

### 🤯 NoSQL vs RDBMS 
- Database를 설정 시 MySQL과 MongoDB가 존재함.
- 서비스의 특성 상 최종적으로 RDBMS MySQL보다 NoSQL인 Mongo를 선택.

### ⭐ MongoDB를 선택한 이유.
- 서비스에 필요로 하는 형식으로 데이터가 저장되어 빠르게 입,출력할 수 있다는 장점 존재.<br/>
- 또한 다른 Documents의 구조를 넣을 수 있고 제작, 기획, 구현하는 시점에서 서비스의 비즈니스 구조가 크게 바뀔 수 있음을 감안하여 **수평적 확장에 용이한 MongoDB** 선택.<br/>
- ex). 
  - time db - 알람기능을 위한 isGoal, tempSavedStudyTime 컬럼 추가
  - user db - dday 컬럼을 dday docs컬럼으로 수정
  - user db - todo docs 컬럼을 외부의 todo db로 생성
</details>
<br/>

<details>
<summary> Technical Debate: 스케줄 업무 자동화</summary>

### 🤯 Linux Cron tab vs Node Scheduler
- 정시 기준으로 순위 및 **오늘의 공부 시간을 저장하고 초기화**해주는 예약 기능이 필요. <br/>
- Linux Cron tab, Node Scheduler 중 Node Scheduler 채택.

### ⭐ node-scheduelr를 선택한 이유
- 노드 프로세스를 실행 중일시 node-scheduler의 관리가 따로 필요가 없음.<br/>
- 그러나 프로세스가 꺼지면 node-scheduler의 기능도 같이 꺼짐.<br/>
- 프로세스의 돌발적인 정지를 방지하는 **pm2 프로세스 관리 도구**로 예상치 못한 기능 꺼짐을 방지하여 node-scheduler의 단점을 극복하고 장점을 살릴 수 있다 판단.<br/>
</details>
<br/>

<details>
<summary> Technical Debate: 자동화 업무(CI/CD)</summary>

### 🤯 FTP - vscode 연동 vs Git actions vs Jenkis
- 로컬환경에서 코드의 수정 후 Filezilla or git bash를 사용하여 main server, test server에 올려줘야하는 불편함 발생.  <br/>
- FTP - vscode 연동 vs Git actions vs Jenkis 중 **Git actions 채택.**

### ⭐ Git actions을 선택한 이유
- FTP - vscode 연동을 통해 수정된 코드 업데이트 가능. 그러나 서버 환경으로 업데이트된 추가 기능 또는 버그 수정 코드를 테스트하는 자체적인 기능이 없음.<br/>
- Jenkis는 서버를 오픈하여 빌드 시 test script로 test 코드를 진행함.<br/>
- 테스트 코드를 위한 서버 오픈과 발표 및 출시가 몇 일 안 남은 시점에서 Jenkis보단 **Git actions**을 채택.<br/>
- Github에서 push, pull request 시 CI/CD를 가능하게 하는 서버를 빌려줌. 또한 Github Event와 동시에 서버에 CI/CD를 가능하게 하므로 다른 두 기술보다 상대적으로 적용과 이용이 쉬움.<br/>
- 또한 dev branch를 두어 test server에 이상이 없을 시 main branch로 전환해야 하므로 git Event시 적용되는 Git actions을 선택함.
</details>
<br/>

<details>
<summary> Trouble: Error Handler</summary>

### 🤯 에러 핸들링에 대한 고찰
- 예외처리 로직 상에서 직접적으로 return 구현은 쉬우나, 에러를 잡고 기록하는 과정(logging)에서 불편함이 발생.
- 에러 처리는 되나, 각 로직 상에서 발생하는 에러들을 관리할 수 없음.
- try-catch + throw new Error를 이용하여 에러를 하나의 미들웨어에 통합시키고 관리함으로서 로깅, 에러핸들링이 가능하나 모든 에러가 400으로 통일된다는 문제점 발생.

### ⭐ 에러의 커스텀(status code 변경)과 관리 및 기록할 수 있는 방법
 1. hapi/boom (library)
 2. Custom API Error
 
 hapi/boom 라이브러리로 에러 핸들링을 했으나, hapi framework에서 쓰는 library는 express framework로 작성한 서비스에 맞지 않는다 판단. **Custom Error API를 채택.**
Custom API Error를 구현하여 필요한 error class를 생성하고 https-status-codes library를 사용하여 정확한 상태 코드와 정확한 에러 메세지를 커스텀할 수 있음. 서비스에 맞게 구현하여 사용 또한 간편하고 Error library를 사용할 필요가 없어 가벼우면서 간결한 코드가 가능. 
</details>
<br/>

<details>
<summary> Trouble: 공지사항 or 유저에게 보여주는 명언을 코드 단 없이 간결하게 crud하기</summary>
 
### 🤯 명언 CRUD의 불편함
- 서비스 특성 상 클라이언트에게 보여줘야 할 문구(명언)들이 존재.  <br/>
- **유저 공지 메세지를 postman, thunder Client, mongoDB 상에서 일일이 넣어줘야 하는 불편함 발견.**
<div align="center">
    <img src="https://user-images.githubusercontent.com/82853790/194036690-2471bce9-c625-4747-b8ab-a609ab401a21.png" />
</div>

### 🌠 관리자 페이지 생성. 관리자 페이지를 생성을 하면서 가져오는 이득이 무엇인가? 
- 클라이언트에게 보여주는 명언 추가, 수정, 삭제가 가능함.<br/>
- 관리자 페이지로 로그인하면 회원가입한 총 회원 수를 볼 수 있음.<br/>
- 회원을 검색 할 수 있음.<br/>
<br/>
</details>
<br/>

<details>
<summary> Technical Debate: 관리자 페이지 but How?</summary>

### 🤯 시간, 물적, 인적 자원의 고려
- 5주라는 **짧은 시간 관계 상 front 자원은 UI/UX 클라이언트 페이지를 집중**하는 것이 옳은 것이라 판단됨.  <br/>
- 관리자 페이지는 명언의 CRUD나 회원의 정보만 보여주는 간결한 페이지이기에 UI/UX보단 기능 위주의 페이지를 생성.

### 🌠 How?
- 관리자페이지의 URI는 함부로 알려지면 안되므로 백엔드 서버로만 접속이 가능하게 생성.<br/>
- 로그인은 등록되어져 있는 이메일만 가능하고, 이메일로 전송한 인증번호를 입력해야 로그인이 가능하게 하여 보안 상향.<br/>
- 짧은 시간으로 생성을 해야 하므로 ejs template engin과 jquery를 사용하여 **간결하고 깔끔하게 관리자 페이지를 생성**.<br/>
<br/>

<div align="center">
    <img src="https://user-images.githubusercontent.com/82853790/194037899-4cf58adb-e878-4fd8-baf9-431f0d5aecc9.png" width="250" height="150"/>
    <img src="https://user-images.githubusercontent.com/82853790/194038112-b2603abc-2398-44bf-a165-ab525503d45a.png" width="250" height="100"/>
</div>
<br/>
<div align="center">
    <img src="https://user-images.githubusercontent.com/82853790/194038064-72b4812c-c694-4299-ac23-fee30c5cb922.png" width="700" height="350"/> 
</div>
<br/>
기능 위주의 관리자 페이지 구현. 관리자(랭플 관련 팀원)만 관리자 페이지 접근이 가능.

</details>
