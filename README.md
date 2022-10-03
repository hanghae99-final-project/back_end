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
오늘 날짜 공부 data가 없을 때 : data 생성하고 공부 시작 시각을 기록한다.<br/>
오늘 날짜 공부 data가 있을 때 : 공부 시작 시각을 업데이트 한다.
 
 - 휴식 시작 <br/>
공부 종료 시각과 공부 시작 시각으로 공부 누적 시간을 계산하고 휴식 시작 시각을 기록한다.(공부 시작/종료 시각 초기화)

 - 휴식 종료 <br/>
 휴식 시작 시각과 휴식 종료 시각으로 휴식 누적 시간을 계산하고 공부 시작 시각을 기록한다.(휴식 시작/종료 시각 초기화)
 
 - 공부 종료 <br/>
 휴식 중일 때 : 휴식 시작 시각과 휴식 종료 시각으로 휴식 누적 시간을 계산한다.(휴식 시작/종료 시각 초기화)<br/>
 공부 중일 때 : 공부 시작 시각과 공부 종료 시각으로 공부 누적 시간을 계산한다.(공부 시작/종료 시각 초기화)
   
   
### ranking
- 기간 별, 연령대 별 공부 시간 랭킹 보여주기<br/>
  &nbsp; - 기간(오늘, 주간, 월간)을 기준으로 DB의 날짜 검색 범위를 지정한다.<br/>
  &nbsp; - 연령대가 전체일 경우, 지정한 날짜로 검색한 time DB에서 user DB를 병합한다. 유저를 기준으로 공부 누적 시간을 더한 후 내림차순 정렬을 진행한다. <br/>
  &nbsp; - 연령대가 20대, 30대 일 경우, 지정한 날짜로 검색한 time DB에서 user DB를 병합한 후 연령대를 기준으로 검색을 한번 더 진행한다. <br/>
  &nbsp; - 경우의 수 : <br/> 
  &nbsp; &nbsp; &nbsp; - 전체-오늘, 전체-주간, 전체-월간, <br/> 
  &nbsp; &nbsp; &nbsp; - 20대-오늘, 20대-주간, 20대-월간, <br/>
  &nbsp; &nbsp; &nbsp; - 30대-오늘, 30대-주간, 30대-월간 으로 총 9가지가 생긴다.
  
  

### admin


### Todo
 - Todo post <br/>
 오늘 Todo data가 없을 때 : data를 생성하고 data 내부의 todoArr에 todo(내용, 색상, 완료여부)를 저장한다.<br/>
 오늘 Todo data가 있을 때 : data 내부의 todoArr에 todo를 push한다.
 
 - Todo get <br/>
 받아온 날짜에 Todo data를 DB에서 가져온 후, TodoArr만 보여준다.
 받아온 날짜에 Todo data가 없을 경우, 빈 배열을 반환한다.
 
 - Todo put <br/>
 오늘 날짜 Todo data를 DB에서 가져온 후, TodoArr에 받아온 index값과 일치하는 Todo를 찾아 업데이트 해준다.
 
 - Todo delete <br/>
 오늘 날짜 Todo data를 DB에서 가져온 후, TodoArr에 받아온 index값과 일치하는 Todo만 slice한다.
 
 
### D-day
 - D-day post <br/>
 유저 data에서 dDay Array에 D-day(deadline, 내용)을 push한다.

 - D-day get <br/>
 D-day가 없을 때 : 빈 배열을 반환한다.
 오늘보다 이전 D-day만 있을 때 : DB에서 D-day Array를 가져온 후, Date lib으로 오늘과 비교하여 빈배열을 반환한다. 
 오늘보다 이후 D-day만 있을 때 : DB에서 D-day Array를 가져온 후, Date lib으로 오늘과 비교하여 오늘 이후 D-day만 가져온다.
 다양한 날짜 D-day가 있을 때 : DB에서 D-day Array를 가져온 후, Date lib으로 오늘과 비교하여 오늘 이후 D-day만 가져온다.
 
 - D-day put <br/>
 유저 data에서 dDay Array를 가져온 후, D-day index와 일치하는 D-day를 찾아 업데이트 해준다.
 
 - D-day delete <br/>
 유저 data에서 dDay Array를 가져온 후, D-day index와 일치하는 D-day를 찾아 삭제 해준다.


### 프로필
 - 프로필 put <br/>
 프로필 nickname, ageGroup, specialty를 받아 user DB에 업데이트한다.<br/>
 프로필 중복체크 기능이 있으나 회원 수정시 한번 더 nickname 중복을 체크한다.
 
- 프로필 get <br/>
 user DB에서 유저의 nickname, ageGroup, specialty, spec을 보여준다.
 
- nickname의 중복체크<br/>
 받아온 nickname을 DB에 검색한다.(검색 시 자신의 nickname은 제외해야 함)

- spec post <br/>
 education(학력,경력), career(학교/회사명), year, experience(설명) user data의 spec Array에 push한다.
 
- spec put <br/>
 스펙 index를 user data의 spec Array의 index와 비교하여 일치하는 spec의 컬럼을 업데이트한다.
 
- spec delete <br/>
 스펙 index를 user data의 spec Array의 index와 비교하여 일치하는 spec을 제거한다.


### Web push





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

|이름|주요기능|
|--|--|
|박원균| ERD, ec2 서버 구축, https, web push, passport login,user validation, admin page, quote crud, user searching, ci/cd, logging, node-mailer|
|이창현| ERD, ec2 서버 구축, https, studytime 기록, ranking, todo/d-day crud, profile crud, ci/cd, logging, node-scheduer|

<br/>

>## 📝기술적 의사 결정









