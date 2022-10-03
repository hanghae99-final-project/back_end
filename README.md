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
 - 영문, 숫자, 한글을 이용하여 nickname을 받고, 기존 nickname의 유무가 있는지를 체크한다.
 - 
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


### 프로필 수정

### ranking

### admin

### Web push





>## 🛠️사용 기술 스택

<br/>

<div align="center">
<img height="40px" src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/CSS Modules-000000?style=flat-square&logo=CSS Modules&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/styled components -DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

</div>
<div align="center">
<img height="40px" src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=Javascript&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black&"/>
<img height="40px" src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=PWA&logoColor=white"/>
	
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

|이름|담당|
|--|--|
|박종현| 타임 타이머(서버 통신), 스톱워치, 메인페이지,Layout, 주간 스터디 로그, 타임피커, pwa, github actions, FCM|
|김수환| D-day CRUD, D-day 캘린더 , todo list CRUD, 월간 스터디 로그, 마이페이지 날짜별 todo list|
|한효승| 타임 타이머(svg로 구현 및 기본 틀 완성),로그인, 회원가입/프로필 수정 및 디바운싱, 랭킹페이지, s3 + cloudFront

<br/>

>## 📝기술적 의사 결정









