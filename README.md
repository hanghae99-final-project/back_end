## 목 차
1. [프로젝트 소개](#1.-프로젝트-소개)
2. [팀 구성](#🤸🏻‍♀️-팀-구성)
3. [아키텍쳐](#🧱-아키텍쳐)
4. [사용 기술 스텍](#🛠-기술-스텍)
5. [주요 기능](#⚙-주요-기능)
6. [라이브러리](#📂-라이브러리)
7. [ERD](#📖-ERD)
9. [트러블 슈팅](#🔥-트러블-슈팅)
10. 



># 👑취준생을 위한 시간 관리 플랫폼, 랭플👑

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


### 로그인/회원가입
 - Passport kakao로 유저의 email주소를 받아와 회원가입을 진행한다. 
 - 영문, 숫자, 한글을 이용하여 nickname을 받고, 기존 nickname의 유무를 확인한다.
 - 20대/30대 등 연령대 선택 및 자신이 준비하는 분야를 선택할 수 있다.
 - JWT를 통해 유저의 정보를 받아온다.


### Timer
 - 공부 시작 <br/>
   * 오늘 날짜 공부 data가 없을 때 : data 생성하고 공부 시작 시각을 기록한다.<br/>
   * 오늘 날짜 공부 data가 있을 때 : 공부 시작 시각을 업데이트 한다.
 
 - 휴식 시작 <br/>
   * 공부 종료 시각과 공부 시작 시각으로 공부 누적 시간을 계산하고 휴식 시작 시각을 기록한다.(공부 시작/종료 시각 초기화)

 - 휴식 종료 <br/>
   * 휴식 시작 시각과 휴식 종료 시각으로 휴식 누적 시간을 계산하고 공부 시작 시각을 기록한다.(휴식 시작/종료 시각 초기화)
 
 - 공부 종료 <br/>
   * 휴식 중일 때 : 휴식 시작 시각과 휴식 종료 시각으로 휴식 누적 시간을 계산한다.(휴식 시작/종료 시각 초기화)<br/>
   * 공부 중일 때 : 공부 시작 시각과 공부 종료 시각으로 공부 누적 시간을 계산한다.(공부 시작/종료 시각 초기화)
   
   
### ranking
- 기간 별, 연령대 별 공부 시간 랭킹 보여주기<br/>
   * 기간(오늘, 주간, 월간)을 기준으로 DB의 날짜 검색 범위를 지정한다.<br/>
   * 연령대가 전체일 경우, 지정한 날짜로 검색한 time DB에서 user DB를 병합한다. 유저를 기준으로 공부 누적 시간을 더한 후 내림차순 정렬을 진행한다. <br/>
   * 연령대가 20대, 30대 일 경우, 지정한 날짜로 검색한 time DB에서 user DB를 병합한 후 연령대를 기준으로 검색을 한번 더 진행한다. <br/>
   * 경우의 수 : 
      + 오늘, 전체-주간, 전체-월간, <br/> 
      + 20대-오늘, 20대-주간, 20대-월간, <br/>
      +  30대-오늘, 30대-주간, 30대-월간 으로 총 9가지가 생긴다.
  
  

### admin

- get
  * 로그인 페이지 html ejs 를 불러온다.
- post
  * 이메일과 비밀번호를 설정하여 관리자에 등록을 한다.
- sendCode post (ajax)
   * jquery를 활용해서 이메일을 검사합니다. 그리고 이메일이 맞고 등록되지 않은 이메일이면 alert로 내용을 보여준다.
   * 등록 되어져 있는 이메일일 경우 해당 이메일로 인증코드를 발속합니다. 인증코드는 DB에 저장합니다.
   * 인증이 다 되었으면 로그인이 성공이되고 DB에 있는 인증코드는 삭제가 됩니다.
- login post (ajax)
  * 등록되어져 있는 email으로만 로그인이 가능합니다
  * 등록되어져 있는 email로 node mialer를 사용하여 인증번호를 전송합니다.
- checkCode post
  * 등록되어져 있는 email로 인증을 받고 로그인을 하면 DB에 있는 인증번호를 삭제 합니다.
  * 인증이 되면 로그인이 가능합니다.

- main get
   * 현재 가입되어져 있는 총 회원의 수를 볼 수 있습니다.<br/>
   * 회원들의 정보들을 볼 수 있습니다. <br/>
   * 회원들의 닉네임으로 검색을 할 수 있습니다.<br/>
- user/:userId get
   * 유저의 정보를 가져옵니다.

- insQuote get
   * 현재 등록되어져 있는 명언리스트 페이지를 html ejs로 불러옵니다.
   * 명언을 추가할 수 있는 페이지 html ejs를 불러옵니다.
- insQuote post
   * 명언들을 추가 할 수 있습니다.

- addObject post
   * 명언에 1개 이상이상 추가된 input을 DB에 저장합니다.
- deleteCheckedQuotes delete
   * DB에 들록되어져 있는 명언을 1개 이상 삭제가 가능합니다.
 
  

### Todo

- Todo post
   * 오늘 Todo data가 없을 때 : data를 생성하고 data 내부의 todoArr에 todo(내용, 색상, 완료여부)를 저장한다.<br/>
   * 오늘 Todo data가 있을 때 : data 내부의 todoArr에 todo를 push한다.
 
 - Todo get
   * 받아온 날짜에 Todo data를 DB에서 가져온 후, TodoArr만 보여준다.
   * 받아온 날짜에 Todo data가 없을 경우, 빈 배열을 반환한다.
 
 - Todo put 
   * 오늘 날짜 Todo data를 DB에서 가져온 후, TodoArr에 받아온 index값과 일치하는 Todo를 찾아 업데이트 해준다.
 
 - Todo delete
   * 오늘 날짜 Todo data를 DB에서 가져온 후, TodoArr에 받아온 index값과 일치하는 Todo만 slice한다.
 
 
### D-day
 - D-day post <br/>
   * 유저 data에서 dDay Array에 D-day(deadline, 내용)을 push한다.

 - D-day get <br/>
   * D-day가 없을 때 : 빈 배열을 반환한다.
   * 오늘보다 이전 D-day만 있을 때 : DB에서 D-day Array를 가져온 후, Date lib으로 오늘과 비교하여 빈배열을 반환한다. 
   * 오늘보다 이후 D-day만 있을 때 : DB에서 D-day Array를 가져온 후, Date lib으로 오늘과 비교하여 오늘 이후 D-day만 가져온다.
   * 다양한 날짜 D-day가 있을 때 : DB에서 D-day Array를 가져온 후, Date lib으로 오늘과 비교하여 오늘 이후 D-day만 가져온다.
 
 - D-day put <br/>
   * 유저 data에서 dDay Array를 가져온 후, D-day index와 일치하는 D-day를 찾아 업데이트 해준다.
 
 - D-day delete <br/>
   * 유저 data에서 dDay Array를 가져온 후, D-day index와 일치하는 D-day를 찾아 삭제 해준다.


### 프로필
 - 프로필 put <br/>
   * 프로필 nickname, ageGroup, specialty를 받아 user DB에 업데이트한다.<br/>
   * 프로필 중복체크 기능이 있으나 회원 수정시 한번 더 nickname 중복을 체크한다.
 
- 프로필 get <br/>
   * user DB에서 유저의 nickname, ageGroup, specialty, spec을 보여준다.
 
- nickname의 중복체크<br/>
   * 받아온 nickname을 DB에 검색한다.(검색 시 자신의 nickname은 제외해야 함)

- spec post <br/>
   * education(학력,경력), career(학교/회사명), year, experience(설명) user data의 spec Array에 push한다.
 
- spec put <br/>
   * 스펙 index를 user data의 spec Array의 index와 비교하여 일치하는 spec의 컬럼을 업데이트한다.
 
- spec delete <br/>
   * 스펙 index를 user data의 spec Array의 index와 비교하여 일치하는 spec을 제거한다.


### Google Cloud Messaging API(Web-push)

 - Google firebase
   * 알림을 허용한 회원들 한에서 notification 토큰을 받은뒤 DB에 저장을 합니다.
   * 저장을 하고 난다음 매 5분마다 node schedule이 목표 시간에 도달한 회원들에게 구글 firebase 서버키를 사용하여 크롭 웹 알림을 보냅니다.
   





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





<br/>






>## 🛍️파일 구조

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


<br/>

>## 🦾팀원

|이름|깃허브 주소|
|--|--|
|이창현(부리더)| https://github.com/changhyeonlee-0703|
|박원균(팀원)| https://github.com/CalvinParkNov|

<br/>

>## 📝기술적 의사 결정
>
<details>
<summary>Dayjs / Luxon Date Library</summary>
<div markdown="1">
Date 라이브러리를 대신해서 가장 많이 사용하는 moment라이브러리를 사용함. </br>
그러나 현재 moment 공식 홈에서도 업데이트를 중단했다고 선언하였고 다른 여러 라이브러리를 추천해주는 상황에서 변경이 불가피함. </br>
luxon, dayjs, date fns 라이브러리들의 퍼포먼스를 비교해본 결과 : </br>
속도 : moment → luxon=date-fns → dayjs </br>
    사이즈:  moment> date-fns>luxon>dayjs </br>
    속도는 luxon과 date-fns가 비슷했으나 dayjs보다 2~3배 빠른 속도를 보였다. 그러나 사이즈 면에서 dayjs가 다른 라이브러리에 비해 3~4배 작았음. </br>
    서버의 스팩 상 제일 적은 라이브러리보단 사이즈 도 비교적 작고 속도도 빠른 luxon라이브러리를 채택함. </br>
  </div>
</details>

<details>
<summary> mongoDB 선택 이유</summary>
 <div markdown="1">
   애플리케이션이 필요로 하는 형식으로 데이터가 저장되어 빠르게 입출력할 수 있다는 장점을 가지고 있다. 또한 다른 Documents의 구조를 넣을 수도 있다. </br> 
   예시로 Book Doc에 author라는 컬럼 안에 User Doc을 넣을 수도 있으며 동시에 Follow 컬럼 내 배열 안에 User Doc를 여러개 넣을 수 있다는 장점을 가지고 있다. </br>
   추후 수평적 확장에 대비하여서도 mongoDB를 사용.
  </div>
</details>

<details>
 <summary> Scheduler</summary>
  <div markdown="1">
node-scheduler와 리눅스의 crontab 중에 node-scheduelr는 노드 프로세스를 진행중이면 같이 적용되어 따로 관리가 필요없음을 인지함. </br>
다만 프로세스가 꺼지면 스케쥴러도 같이 꺼지기에 노드 프로세스의 관리가 필요한데 이는 pm2 lib으로 처리 가능하므로 node-scheduler를 채택 </br>
  </div>
</details>

<details>
 <summary> Scheduler</summary>
  <div markdown="1">
node-scheduler와 리눅스의 crontab 중에 node-scheduelr는 노드 프로세스를 진행중이면 같이 적용되어 따로 관리가 필요없음을 인지함. </br>
다만 프로세스가 꺼지면 스케쥴러도 같이 꺼지기에 노드 프로세스의 관리가 필요한데 이는 pm2 lib으로 처리 가능하므로 node-scheduler를 채택 </br>
  </div>
</details>

<details>
 <summary> CI/CD</summary>
  <div markdown="1">
jenkis를 직접 구현하진 않았으나 자료 검색 결과, 따로 서버를 만들어 ci/cd를 진행해야함. </br> 
 ci/cd를 위한 서버를 세팅해야하는 번거로움 발생. git actions은 github에서 push, pull request할 때마다 서버를 빌려주므로 github event와 동시에 서버에 ci/cd를 가능하게 하고 상대적으로 이용이 쉬워 시간상, 업무상 효율성을 생각하여 git actions 적용  </div>
</details>


<details>
 <summary> Error Handle</summary>
  <div markdown="1">
throw new Error를 사용할 시 status cide가 400으로 고정이 됨. </br>
대안책으로 hapi/boom과 custom error 두가지 방법을 구현한 결과 두 방법 모두 커스텀 에러는 가능하나 hapi express에서 쓰는 boom보단 우리 서비스에 맞게 커스텀을 할 수 있는 custom error class를 채택하여 진행함. </br>
 </div>
</details>

<details>
 <summary> admin page </summary>
  <div markdown="1">
관리자가 유저에게 보여주는 메세지를 작성할 필요. </br>
대표적인 예로 명언과 같은 설정한 메세지를 유저에게 보여주는 기능을 보유하고 있는데, vscode의 썬더 클라이언트나 포스트맨으로 명언을 추가해야하는 불편함 느낌. </br>
관리자 페이지의 필요성을 느꼈으나, 발표 준비 주를 제외한 5주라는 짧은 시간관계 상 프론트단의 자원은 UI/ user 편의성에 집중을 하는 것이 맞다 판단됨. ejs, jquery를 사용하여 간결하고 깔끔하게 관리자 페이지를 생성 </br>

 가입한 인원의 수, 회원 정보, 닉네임 검색 기능, 명언 CRUD페이지 추가하여 매번 추가/수정/삭제를 하지 않아도 되는 편리함을 적용. </br>
 </div>
</details>
