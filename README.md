># πμ·¨μ€μμ μν μκ° κ΄λ¦¬ νλ«νΌ, λ­νπ

<img width="100%" src="https://user-images.githubusercontent.com/95389265/193836979-d0885d4e-1f0d-4796-972c-181fee784fb8.png" >

λ­νμ μ΄μ¬ν λ―Έλλ₯Ό μ€λΉνκ³  μμμλ λΆκ΅¬νκ³ , **ν­μ λΆμν΄νλ μ·¨μ€μ**λ€μ λμμΌλ‘

**λΆμκ°μ ν΄μμν€κ³ , λκΈ° λΆμ¬λ₯Ό ν΄μ€ λͺ©μ **μΌλ‘ λ§λ€μ΄μ§ μλΉμ€μλλ€. 

μ΄λ¬ν λ¬Έμ λ€μ μλμ solutionμΌλ‘ ν΄κ²°νκ³ μ νμ΅λλ€.

1. κ³΅λΆ μκ°μ μ²΄ν¬ν  μ μλ **νμ΄λ¨Έ**
2. λ€λ₯Έ μ¬λλ€μ μΌλ§λ κ³΅λΆνλμ§ νμΈνλ©° κ²½μν  μ μλ **λ­νΉ μμ€ν**
3. μ±μ·¨κ°κ³Ό μμ μ λμ΄μΌ λ³Ό μ μλ **μ€ν°λλ‘κ·Έ**

<br/>

>μλΉμ€ λ§ν¬ π: https://ranking-planner.com
>
>ν λΈμ π: https://c11.kr/161cx

<br/>


>## π₯οΈκΈ°λ₯

- **λ©μΈ νμ΄μ§**
    - νμ νμ΄λ¨Έ 
    - μ€ν±μμΉ
    - λλ€ λͺμΈ
    - μ€μ  λλ°μ΄
    - todo λ¦¬μ€νΈ
    - νμ¬ κ³΅λΆ μ€μΈ μ¬λ μ
- **λ§μ΄ νμ΄μ§**
    - νλ‘ν μμ 
    - λλ°μ΄ μ€μ 
    - μ€ν°λλ‘κ·Έ κ·Έλν (μλ³, μ£Όλ³)
    - λ μ§λ³ todo λ¦¬μ€νΈ
- **λ­νΉ νμ΄μ§**
    - μ μ²΄, 20λ, 30λ λ­νΉ
    - μΌκ°, μ£Όκ°, μκ° λ­νΉ
- **μλ κΈ°λ₯**
    - λͺ©ν μκ° λ¬μ± μ μλ μ μ‘
    - λͺ©ν μκ° μ΄κΈ°ν μ μλ μ΄κΈ°ν
- **admin νμ΄μ§**
    - λͺμΈ CRUD
    - νμ μ λ³΄ κ²μ
    - νμ μ λ³΄ νμ΄λΈ



<br/><br/><br/>

>## μν€νμ²
<div align="center">
<img width="700" height="500" src= "https://user-images.githubusercontent.com/82853790/194307654-b5603144-636c-4853-b5b5-c72981e965d8.jpg"/>
</div>

<br/><br/><br/>

>### λ©μΈνμ΄μ§

<div align="center">
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459516-9644d202-3cbb-4292-b51c-8e7727eac006.png" title="Green"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459581-ca4fd92e-a3fd-4e74-8ead-5d8ce6a91b57.png" title="Blue"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459584-4cdf119d-6c63-4e1d-8c4f-48f68ce0a15a.png" title="Red"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193460731-a4a2a4ea-da32-45ef-9a0f-f3ba89f59b80.png" title="Todo"/>
</div>

-  **νμ νμ΄λ¨Έ( or Circle Timer )**  <br/>
   κ³΅λΆ μμ Green ν΄μ μμ Blue λͺ©ν μκ° λ¬μ± Red, μκ°μ λ§€μΌ λ°€ **12μ** μ΄κΈ°ν<br/>
    - κ³΅λΆ μμ : μ€λ λ μ§ κ³΅λΆ λ°μ΄ν°κ° μμ λ λ°μ΄ν°λ₯Ό μμ±νκ³  μμ κ²½μ° κ³΅λΆ μμ μκ°μ μλ°μ΄νΈ
    - ν΄μ μμ : κ³΅λΆ μκ°μ λμ νκ³  ν΄μ μμ
    - ν΄μ μ’λ£ : ν΄μ μκ°μ λμ νκ³  κ³΅λΆ μμ
    - κ·Έλ§ νκΈ° : ν΄μ μ€μΌ λ ν΄μ μκ°μ λμ , κ³΅λΆ μ€μΌ λ κ³΅λΆ μκ°μ λμ 


- **ν¬λ λ¦¬μ€νΈ**
    - Todo Get : λ°μμ¨ λ μ§λ‘ Todo Documentμ κ²μνμ¬ todoArrλ₯Ό λ°ν
    - Todo Post : μ€λμ Todo λ°μ΄ν°κ° μμ λ dataλ₯Ό μμ±νκ³  todoArrμ todoλ₯Ό κΈ°λ‘, λ°μ΄ν°κ° μμ κ²½μ° μ€λμ λ°μ΄ν° todoArr Push
    - Todo Put : μ€λμ Todo λ°μ΄ν°μμ todoArrμ λ°μμ¨ indexκ°κ³Ό λμΌν todoλ₯Ό λ³κ²½
    - Todo Delete : μ€λμ Todo λ°μ΄ν°μμ todoArrμ λ°μμ¨ indexκ°κ³Ό λμΌν todoλ₯Ό μ­μ 
   
- **νμ¬ κ³΅λΆ μ€μΈ μΈμ μ**
    - Studying Get : κ³΅λΆ μμ λ²νΌμ λλ₯Ό μ Studying Documentμ μ μ μ λ³΄ λ±λ‘
    - Studying Delete : κ·Έλ§ νκΈ° λ²νΌμ λλ₯Ό μ Studying Documentμ μ μ μ λ³΄ μ κ±°


<br/><br/>

>### λ­νΉνμ΄μ§

<div align="center">
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193480912-39f60e18-22bf-498f-bc87-0425edd14415.png" title="ranking"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193480952-e8574ba4-a40b-42ad-a10f-2611f78ee88c.png" title="bottom sheet"/>
</div>


- **λ­νΉ**
	- μΌκ°, μ£Όκ°, μκ° λ­νΉ νμΈ κ°λ₯ (Time Document λ μ§ κ²μ λ²μ μ€μ  User Documentλ³ κ³΅λΆ μκ° ν΅ν©)
	- μ μ μ μ°λ Ήλ λ³ λ­νΉ νμΈ κ°λ₯ (μ μ μ°¨ μ§ν ν μ°λ Ήλλ³ νν°λ§)
	- κ°κ° μ μ μ λ­νΉμμ μ μ μ μ§μ’ λ° νμ¬ μ μ μ¬λΆ νμΈ κ°λ₯ (Studying Documentμ μ μ  μ λ³΄ Join)


<br/><br/>


>### λ§μ΄νμ΄μ§
	 
<div align="center">
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193481340-bd2aada6-9e0d-4159-9a73-b9a6b8b23390.png" title="Green"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193481380-8c1a9dfd-0e36-427b-bd11-3aa0e177872b.png" title="Blue"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193481379-6cdc9cb9-eac8-43a7-8c0f-151b703e02a3.png" title="Blue"/>
</div>

- **μ€λ κ³΅λΆν μκ°κ³Ό μ΄νμ μ¬μ©νλ©΄μ κ³΅λΆν μ΄ μκ° νμΈ κ°λ₯**
    - μ μ  μκ° κ³΅λΆ κΈ°λ‘ : Time Documentμμ λ μ§(μκ°) λ²μ λ° μ μ  μ λ³΄λ₯Ό κΈ°μ€μΌλ‘ κ²μ
    - μ μ  μ£Όκ° κ³΅λΆ κΈ°λ‘ : Time Documentμμ λ μ§(μ£Όκ°) λ²μ λ° μ μ  μ λ³΄λ₯Ό κΈ°μ€μΌλ‘ κ²μ

- **νλ‘ν μμ **
    - μ μ  μ λ³΄ Get : ν ν°μΌλ‘ λ°μ μ μ  index, User Document κ²μ
    - μ μ  μ λ³΄ Put : λλ€μ, μ°λ Ήλ, λΆμΌ λ°κΎΈκΈ° κ°λ₯
    - nicknameμ μ€λ³΅μ²΄ν¬ : μμ μ nicknameμ μ μΈν λ€λ₯Έ μ μ μ λλ€μ κ²μ

- **λλ°μ΄ μ€μ **
    - D-day Get : User Documentμ D-day Array μ»¬λΌμ μλΈ D-day Documents λ μ§ μ­μμΌλ‘ μΆλ ₯
    - D-day Post : User Documentμ D-day Array μ»¬λΌμ μλΈ D-day Documents μλ ₯
    - D-day Put : μλΈ D-day Documentsμμ D-day index κ²μ ν μΌμΉνλ D-day μμ 
    - D-day Delete : μλΈ D-day Documentsμμ D-day index κ²μ ν μΌμΉνλ D-day μ­μ 

- **λ μ§ λ³ ν¬λ λ¦¬μ€νΈ**
	- λ€λ₯Έ λ μ§μ ν¬λ λ¦¬μ€νΈλ₯Ό νμΈ κ°λ₯(Todo Get)
	- **Done μμ  λΆκ°**

<br/><br/>

>### Web push(μλ κΈ°λ₯)

<div align="center">
<img width="70%" src ="https://user-images.githubusercontent.com/82853790/194310320-476abf11-2711-42cf-9b55-1163abbdcef1.png" />
</div>

- **λͺ©ν μκ° λ¬μ± μ μλ κΈ°λ₯**
    - λͺ©νμκ° λ¬μ± μ Web Push(FCM) κΈ°λ₯μ μ΄μ©νμ¬ μ μ μκ² μλ λ°μ‘
    - μ μ κ° μΉμμ μλ νμ© μ κ°λ₯(λ‘κ·ΈμΈ μ fcm ν ν° λ°μ‘)

- **λͺ©ν μκ° μ€μ  μ μλ κΈ°λ₯ μ΄κΈ°ν**
    - λͺ©ν μκ°μ λ¬μ± ν μλμ κ³μ λ°κ³  μΆμΌλ©΄, λͺ©ν μκ° μ€μ μΌλ‘ μλ μ΄κΈ°ν
    
- **Firebase Cloud Messaging API(Web-push)**
    - μλ¦Όμ νμ©ν νμλ€ νμμ notification ν ν°μ λ°μλ€ DBμ μ μ₯
    - λ§€ 5λΆλ§λ€ node scheduleμ΄ λͺ©ν μκ°μ λλ¬ν νμλ€μκ² κ΅¬κΈ firebase μλ²ν€λ₯Ό μ¬μ©νμ¬ ν¬λ‘­ μΉ μλ¦Ό
<br/>
<br/><br/>

>### admin Page

<div align="center">
<img width="49%" src ="https://user-images.githubusercontent.com/82853790/194300267-4a73f1fb-8b71-4f9a-aba1-a7623c3b99f6.png" />
<img width="50%" src= "https://user-images.githubusercontent.com/82853790/194301549-ce922224-325b-4f82-acb7-a32a9080081d.PNG"/>
</div>

-  **admin user login**  <br/>
   μ¬μ μ κ΄λ¦¬μ μμ΄λλ λ±λ‘μ΄ λμ΄ μμ΄μΌ νλ€.<br/>
    - λ±λ‘λμ΄ μλ emailλ‘ node mailerλ₯Ό μ¬μ©νμ¬ μΈμ¦λ²νΈλ₯Ό μ μ‘
    - μΈμ¦ μ½λ λ° μ‘ ν DBμ μΈμ¦ μ½λ μ μ₯
    - μΈμ¦ νμΈλλ©΄ DBμ μλ μΈμ¦ μ½λ μ­μ 
    - μ½λ μΈμ¦ ν λΉλ°λ²νΈμ μμ΄λκ° μΌμΉνλ©΄ λ‘κ·ΈμΈ


- **μ μ  νμ΄λΈ**
    - User μ : νμ¬ κ°μλ μ΄ νμμ μ
    - User Get : νμ¬ κ°μλ νμμ μ λ³΄ νμ΄λΈ μΆλ ₯
    - nickname search : κ°μλ nickanmeμΌλ‘ νμ μ λ³΄λ₯Ό κ²μ
 

- **λͺμΈ CRUD**
   μ μ μκ² λ³΄μ¬μ£Όλ λ°μ΄ν°λ‘ κ΄λ¦¬μκ° λͺμΈμ κ΄λ¦¬ν΄μΌ ν¨<br/>
    - Quote Get : λͺμΈ μΆλ ₯
    - Quote Post : 1κ° μ΄μμ λͺμΈ μμ±
    - Quote Put : λͺμΈ μμ 
    - Quote Delete : 1κ° μ΄μμ λͺμΈ μ­μ 

<br/>

>## π οΈERD

<br/>

<div align="center">
<img height="50%" src="https://user-images.githubusercontent.com/82853790/194448646-e7ee3c5c-4937-42e2-aba8-55a5a1965dba.png"/>
</div>


>## π οΈμ¬μ© κΈ°μ  μ€ν

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


>## πλΌμ΄λΈλ¬λ¦¬

<details>
<summary> Library used </summary>
 
| μ΄λ¦   | μ€λͺ                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| mongoose | mongoDB λ°μ΄ν°λ₯Ό λͺ¨λΈλ§ν  μ μλ κ°λ¨ν μ€ν€λ§ κΈ°λ° solutionμ μ κ³΅νμ¬, κ²μ¦, μΏΌλ¦¬, μμ± λΉμ¦λμ€ λ‘μ§ λ±μ΄ ν¬ν¨λμ΄ μ μ© |
| bcryptjs | bcryptjsλ μμ μλ°μ€ν¬λ¦½νΈλ‘ κ΅¬νλ λΌμ΄λΈλ¬λ¦¬μ€ C++λ‘ κ΅¬νλ bcryptλΌμ΄λΈλ¬λ¦¬λ₯Ό μ½λμ λ³ν μμ΄ λμ²΄ κ°λ₯.|
| passport-local | μΈμμ κΈ°λ°μΌλ‘ ν μΈμ¦- κ΄λ¦¬μ νμ΄μ§ λ‘κ·ΈμΈ, λ‘κ·Έμμμ κ΄λ¦¬μ©. λ°±μλμ μΈμκ³Ό ν¨κ» λΈλΌμ°μ  μΏ ν€λ₯Ό μ¬μ©|
| passport-kakao | μΉ΄μΉ΄μ€ μμλ‘κ·ΈμΈμ νμλ‘ ν λ―Έλ€μ¨μ΄ λΌμ΄λΈλ¬λ¦¬.|
| nodemailer | μΈμ¦λ²νΈλ₯Ό μν μ΄λ©μΌ λΌμ΄λΈλ¬λ¦¬. node.js SMTP gmailμ μ¬μ©νμ¬ μ΄λ©μΌ μ μ‘. |
| node-schedule | λ§€μΌ 00μ00λΆ κΈ°μ€μΌλ‘ κ³΅λΆμκ°μ DBμ μ μ₯νκΈ° λ° μ μ μ λͺ©νμκ° λ¬μ± μλμ μν΄ μ¬μ©.|
| joi | κ°λμ± λ° μ μ§λ³΄μ κΈ°λ₯μ΄ λ°μ΄λλ―λ‘ νλ‘ν μν¨μ± κ²μ¬λ₯Ό μν΄ joiλ₯Ό μ¬μ©. |
| http-status-codes | HTTP μνλ₯Ό μλ €μ£Όλ λΌμ΄λΈλ¬λ¦¬. μ νν μ€λ₯ λ²νΈλ₯Ό λ³΄λ΄κΈ° μν΄ μ μ©νμ¬ μ¬μ©.|
| luxon | νμ€μκ°μΈ DBμ νκ΅­ μκ° 0~24μ λ΄μ DBκ° μμ±λκ³  λμμΌ κ²μμ νκΈ° μν΄ μ¬μ©.|
| ejs | node.js ννλ¦Ώμμ§κ΄λ¦¬μ νμ΄μ§μμ λ°μ΄ν°λ₯Ό htmlμ μ¬μ©. |
| eslint | μ½λλ₯Ό λΆμνμ¬ μ€λ₯λ₯Ό μ°Ύκ³  μΈκ΄λ μ½λ μ€νμΌμ μ μ§ . prettier μ½λ μ»¨λ°΄μμ μ μ©|
| morgan | HTTPλ©μλ, HTTP μν μ½λ, μλ΅μλ, μλ΅λ°μ΄νΈ, μμ²­κ³Ό μλ΅μ νλμ λ³Ό μ μμ΄ μ μ©|
| body-parser | μμ²­μ μλ λ°μ΄ν°λ₯Ό ν΄μν΄μ req.body κ°μ²΄λ‘ λ§λ€μ΄μ£Όλ λ―Έλ€μ¨μ΄μ¬μ μ μ©|
| winston | μλ²μ μμ²­, μλ΅, μ€λ₯λ₯Ό μ»€μ€ν λ‘κΉνκΈ° μν΄ μ μ©. |
|winston-daily-rotate-file| λ μ§λ³λ‘ λ‘κ·Έ νμΌμ κ΄λ¦¬νκΈ° μν΄ μ¬μ©. |

</details>



<br/>






>## ποΈνμΌ κ΅¬μ‘°
<details>
<summary> File structure</summary>
 
```
BackEnd
ββ app.js
ββ config
β  ββ connect.js
β  ββ logger.js
β  ββ notification.js
β  ββ scheduler.js
ββ controllers
β  ββ adminDataFunction
β  β  ββ admin.controller.js
β  β  ββ adminPage.controller.js
β  β  ββ login.controller.js
β  ββ myPage.controller.js
β  ββ profile.controller.js
β  ββ quote.controller.js
β  ββ rank.controller.js
β  ββ studying.controller.js
β  ββ time.controller.js
β  ββ todo.controller.js
β  ββ user.controller.js
ββ errors
β  ββ badRequestError.js
β  ββ conflictError.js
β  ββ customApiError.js
β  ββ index.js
β  ββ notFoundError.js
β  ββ unauthentiocated.js
ββ middleware
β  ββ async.js
β  ββ auth.js
β  ββ errorHandler.js
β  ββ userAuth.js
ββ models
β  ββ admin
β  β  ββ admin.model.js
β  β  ββ adminLogin.model.js
β  β  ββ mail.model.js
β  ββ login.model.js
β  ββ myPage.model.js
β  ββ profile.model.js
β  ββ quote.model.js
β  ββ rank.model.js
β  ββ search.model.js
β  ββ studying.model.js
β  ββ time.model.js
β  ββ todo.model.js
β  ββ userValidation.model.js
ββ passport
β  ββ index.js
β  ββ kakaoLogin.js
β  ββ local.js
ββ routes
β  ββ admin
β  β  ββ index.route.js
β  ββ index.route.js
β  ββ myPage.route.js
β  ββ profile.route.js
β  ββ quote.route.js
β  ββ rank.route.js
β  ββ studying.route.js
β  ββ time.route.js
β  ββ todo.route.js
β  ββ user.route.js
ββ schemas
β  ββ admin.js
β  ββ confirmNumber.js
β  ββ quote.js
β  ββ studying.js
β  ββ time.js
β  ββ todo.js
β  ββ user.js
ββ service
β  ββ adminService
β  β  ββ admin.service.js
β  β  ββ adminLogin.service.js
β  ββ myPage.service.js
β  ββ profile.service.js
β  ββ rank.service.js
β  ββ studying.service.js
β  ββ time.service.js
β  ββ todo.service.js
β  ββ user.service.js
ββ test // test code folder
ββ views // admin page ejs
ββ public // admin page css&js
```
</details>

<br/>


>## πκΈ°μ μ  μμ¬ κ²°μ  & νΈλ¬λΈ μν
<details>
<summary> Trouble: Dayjs / Luxon Date Library</summary>

### π€―Β JavaScript Dateμ μ±λ₯ μ΄μ.
- λ μ§/μκ°μ λν μ²λ¦¬λ₯Ό κ°λ°μκ° μ§μ  κ΅¬νν΄μΌνλ λΆνΈν¨ μ‘΄μ¬.  i.e. μ€λ, 9μ 31
- ν libraryμ λΉν΄ λ¬΄κ²κ³  μλ μΈ‘λ©΄μμ λλ¦Ό.
- MongoDBμμ μ μ₯νλ timestampλ UTC κΈ°μ€.
- Date libμ λμμΌλ‘ κ°μ₯ λ§μ΄ μ¬μ©νλ Moment libμ μ±ννμΌλ, legacyλ‘ μΈνμ¬ λ μ΄μμ μλ°μ΄νΈκ° μ€μ§λμκ³ , μΆν νμ₯μ±μ μν΄ momentμμ μΆμ²νλ Date libμ μ¬μ©.
<p align="center"><img src="https://user-images.githubusercontent.com/82853790/193856920-b36a584d-99bf-4dc5-88e6-e65d630d5ef0.png" width="600" height="300" /></p>

### π Β ν΄κ²°.
Date Libaray : **luxon,** dayjs, date-fns (μ±λ₯ νμ€νΈ : 1 - 5000λ² λ°λ³΅νμ¬ 100λ²μ νκ·  μλλ₯Ό μΈ‘μ )

 - μλ : luxon β€ date-fns < dayjs
 - μ¬μ΄μ¦ :  date-fns> moment > luxon >>> dayjs
 - κ²°λ‘  : μλ μΈ‘λ©΄μμ luxon, μ¬μ΄μ¦ μΈ‘λ©΄μμ dayjs μ΄λ μλ² μμμ ν¬κΈ°λ³΄λ¨ μλκ° μ°μ μ΄λΌ νλ¨νμ¬ κ°μ₯ λΉ λ₯΄κ³  λΉκ΅μ  μ¬μ΄μ¦κ° μμ **luxon**μ μ±ν

<div align="center">
    <img src="https://user-images.githubusercontent.com/82853790/193856772-b38c3fab-2df0-4beb-9824-036d25e1fcd3.png" width="700" height="400"/>
    <img src="https://user-images.githubusercontent.com/82853790/193856834-b7d065cc-3fed-46e3-b248-e76a8625587f.png" width="700" height="400"/>
</div>
</details>
<br/>

<details>
<summary> Technical Debate:  DB Select</summary>

### π€― NoSQL vs RDBMSΒ 
- Databaseλ₯Ό μ€μ  μ MySQLκ³Ό MongoDBκ° μ‘΄μ¬ν¨.
- μλΉμ€μ νΉμ± μ μ΅μ’μ μΌλ‘ RDBMS MySQLλ³΄λ€ NoSQLμΈ Mongoλ₯Ό μ ν.

### β­ MongoDBλ₯Ό μ νν μ΄μ .
- μλΉμ€μ νμλ‘ νλ νμμΌλ‘ λ°μ΄ν°κ° μ μ₯λμ΄ λΉ λ₯΄κ² μ,μΆλ ₯ν  μ μλ€λ μ₯μ  μ‘΄μ¬.<br/>
- λν λ€λ₯Έ Documentsμ κ΅¬μ‘°λ₯Ό λ£μ μ μκ³  μ μ, κΈ°ν, κ΅¬ννλ μμ μμ μλΉμ€μ λΉμ¦λμ€ κ΅¬μ‘°κ° ν¬κ² λ°λ μ μμμ κ°μνμ¬ **μνμ  νμ₯μ μ©μ΄ν MongoDB** μ ν.<br/>
- ex). 
  - time db - μλκΈ°λ₯μ μν isGoal, tempSavedStudyTime μ»¬λΌ μΆκ°
  - user db - dday μ»¬λΌμ dday docsμ»¬λΌμΌλ‘ μμ 
  - user db - todo docs μ»¬λΌμ μΈλΆμ todo dbλ‘ μμ±
</details>
<br/>

<details>
<summary> Technical Debate: μ€μΌμ€ μλ¬΄ μλν</summary>

### π€― Linux Cron tab vs Node Scheduler
- μ μ κΈ°μ€μΌλ‘ μμ λ° **μ€λμ κ³΅λΆ μκ°μ μ μ₯νκ³  μ΄κΈ°ν**ν΄μ£Όλ μμ½ κΈ°λ₯μ΄ νμ. <br/>
- Linux Cron tab, Node Scheduler μ€ Node Scheduler μ±ν.

### β­ node-scheduelrλ₯Ό μ νν μ΄μ 
- λΈλ νλ‘μΈμ€λ₯Ό μ€ν μ€μΌμ node-schedulerμ κ΄λ¦¬κ° λ°λ‘ νμκ° μμ.<br/>
- κ·Έλ¬λ νλ‘μΈμ€κ° κΊΌμ§λ©΄ node-schedulerμ κΈ°λ₯λ κ°μ΄ κΊΌμ§.<br/>
- νλ‘μΈμ€μ λλ°μ μΈ μ μ§λ₯Ό λ°©μ§νλ **pm2 νλ‘μΈμ€ κ΄λ¦¬ λκ΅¬**λ‘ μμμΉ λͺ»ν κΈ°λ₯ κΊΌμ§μ λ°©μ§νμ¬ node-schedulerμ λ¨μ μ κ·Ήλ³΅νκ³  μ₯μ μ μ΄λ¦΄ μ μλ€ νλ¨.<br/>
</details>
<br/>

<details>
<summary> Technical Debate: μλν μλ¬΄(CI/CD)</summary>

### π€― FTP - vscode μ°λ vs Git actions vs Jenkis
- λ‘μ»¬νκ²½μμ μ½λμ μμ  ν Filezilla or git bashλ₯Ό μ¬μ©νμ¬ main server, test serverμ μ¬λ €μ€μΌνλ λΆνΈν¨ λ°μ.  <br/>
- FTP - vscode μ°λ vs Git actions vs Jenkis μ€ **Git actions μ±ν.**

### β­Β Git actionsμ μ νν μ΄μ 
- FTP - vscode μ°λμ ν΅ν΄ μμ λ μ½λ μλ°μ΄νΈ κ°λ₯. κ·Έλ¬λ μλ² νκ²½μΌλ‘ μλ°μ΄νΈλ μΆκ° κΈ°λ₯ λλ λ²κ·Έ μμ  μ½λλ₯Ό νμ€νΈνλ μμ²΄μ μΈ κΈ°λ₯μ΄ μμ.<br/>
- Jenkisλ μλ²λ₯Ό μ€ννμ¬ λΉλ μ test scriptλ‘ test μ½λλ₯Ό μ§νν¨.<br/>
- νμ€νΈ μ½λλ₯Ό μν μλ² μ€νκ³Ό λ°ν λ° μΆμκ° λͺ μΌ μ λ¨μ μμ μμ Jenkisλ³΄λ¨ **Git actions**μ μ±ν.<br/>
- Githubμμ push, pull request μ CI/CDλ₯Ό κ°λ₯νκ² νλ μλ²λ₯Ό λΉλ €μ€. λν Github Eventμ λμμ μλ²μ CI/CDλ₯Ό κ°λ₯νκ² νλ―λ‘ λ€λ₯Έ λ κΈ°μ λ³΄λ€ μλμ μΌλ‘ μ μ©κ³Ό μ΄μ©μ΄ μ¬μ.<br/>
- λν dev branchλ₯Ό λμ΄ test serverμ μ΄μμ΄ μμ μ main branchλ‘ μ νν΄μΌ νλ―λ‘ git Eventμ μ μ©λλ Git actionsμ μ νν¨.
</details>
<br/>

<details>
<summary> Trouble: Error Handler</summary>

### π€― μλ¬ νΈλ€λ§μ λν κ³ μ°°
- μμΈμ²λ¦¬ λ‘μ§ μμμ μ§μ μ μΌλ‘ return κ΅¬νμ μ¬μ°λ, μλ¬λ₯Ό μ‘κ³  κΈ°λ‘νλ κ³Όμ (logging)μμ λΆνΈν¨μ΄ λ°μ.
- μλ¬ μ²λ¦¬λ λλ, κ° λ‘μ§ μμμ λ°μνλ μλ¬λ€μ κ΄λ¦¬ν  μ μμ.
- try-catch + throw new Errorλ₯Ό μ΄μ©νμ¬ μλ¬λ₯Ό νλμ λ―Έλ€μ¨μ΄μ ν΅ν©μν€κ³  κ΄λ¦¬ν¨μΌλ‘μ λ‘κΉ, μλ¬νΈλ€λ§μ΄ κ°λ₯νλ λͺ¨λ  μλ¬κ° 400μΌλ‘ ν΅μΌλλ€λ λ¬Έμ μ  λ°μ.

### β­ μλ¬μ μ»€μ€ν(status code λ³κ²½)κ³Ό κ΄λ¦¬ λ° κΈ°λ‘ν  μ μλ λ°©λ²
 1. hapi/boom (library)
 2. Custom API Error
 
 hapi/boom λΌμ΄λΈλ¬λ¦¬λ‘ μλ¬ νΈλ€λ§μ νμΌλ, hapi frameworkμμ μ°λ libraryλ express frameworkλ‘ μμ±ν μλΉμ€μ λ§μ§ μλλ€ νλ¨. **Custom Error APIλ₯Ό μ±ν.**
Custom API Errorλ₯Ό κ΅¬ννμ¬ νμν error classλ₯Ό μμ±νκ³  https-status-codes libraryλ₯Ό μ¬μ©νμ¬ μ νν μν μ½λμ μ νν μλ¬ λ©μΈμ§λ₯Ό μ»€μ€νν  μ μμ. μλΉμ€μ λ§κ² κ΅¬ννμ¬ μ¬μ© λν κ°νΈνκ³  Error libraryλ₯Ό μ¬μ©ν  νμκ° μμ΄ κ°λ²Όμ°λ©΄μ κ°κ²°ν μ½λκ° κ°λ₯. 
</details>
<br/>

<details>
<summary> Trouble: κ³΅μ§μ¬ν­ or μ μ μκ² λ³΄μ¬μ£Όλ λͺμΈμ μ½λ λ¨ μμ΄ κ°κ²°νκ² crudνκΈ°</summary>
 
### π€― λͺμΈ CRUDμ λΆνΈν¨
- μλΉμ€ νΉμ± μ ν΄λΌμ΄μΈνΈμκ² λ³΄μ¬μ€μΌ ν  λ¬Έκ΅¬(λͺμΈ)λ€μ΄ μ‘΄μ¬.  <br/>
- **μ μ  κ³΅μ§ λ©μΈμ§λ₯Ό postman, thunder Client, mongoDB μμμ μΌμΌμ΄ λ£μ΄μ€μΌ νλ λΆνΈν¨ λ°κ²¬.**
<div align="center">
    <img src="https://user-images.githubusercontent.com/82853790/194036690-2471bce9-c625-4747-b8ab-a609ab401a21.png" />
</div>

### π Β κ΄λ¦¬μ νμ΄μ§ μμ±. κ΄λ¦¬μ νμ΄μ§λ₯Ό μμ±μ νλ©΄μ κ°μ Έμ€λ μ΄λμ΄ λ¬΄μμΈκ°? 
- ν΄λΌμ΄μΈνΈμκ² λ³΄μ¬μ£Όλ λͺμΈ μΆκ°, μμ , μ­μ κ° κ°λ₯ν¨.<br/>
- κ΄λ¦¬μ νμ΄μ§λ‘ λ‘κ·ΈμΈνλ©΄ νμκ°μν μ΄ νμ μλ₯Ό λ³Ό μ μμ.<br/>
- νμμ κ²μ ν  μ μμ.<br/>
<br/>
</details>
<br/>

<details>
<summary> Technical Debate: κ΄λ¦¬μ νμ΄μ§ but How?</summary>

### π€― μκ°, λ¬Όμ , μΈμ  μμμ κ³ λ €
- 6μ£ΌλΌλ **μ§§μ μκ° κ΄κ³ μ front μμμ UI/UX ν΄λΌμ΄μΈνΈ νμ΄μ§λ₯Ό μ§μ€**νλ κ²μ΄ μ³μ κ²μ΄λΌ νλ¨λ¨.  <br/>
- κ΄λ¦¬μ νμ΄μ§λ λͺμΈμ CRUDλ νμμ μ λ³΄λ§ λ³΄μ¬μ£Όλ κ°κ²°ν νμ΄μ§μ΄κΈ°μ UI/UXλ³΄λ¨ κΈ°λ₯ μμ£Όμ νμ΄μ§λ₯Ό μμ±.

### π  How?
- κ΄λ¦¬μνμ΄μ§μ URIλ ν¨λΆλ‘ μλ €μ§λ©΄ μλλ―λ‘ λ°±μλ μλ²λ‘λ§ μ μμ΄ κ°λ₯νκ² μμ±.<br/>
- λ‘κ·ΈμΈμ λ±λ‘λμ΄μ Έ μλ μ΄λ©μΌλ§ κ°λ₯νκ³ , μ΄λ©μΌλ‘ μ μ‘ν μΈμ¦λ²νΈλ₯Ό μλ ₯ν΄μΌ λ‘κ·ΈμΈμ΄ κ°λ₯νκ² νμ¬ λ³΄μ μν₯.<br/>
- μ§§μ μκ°μΌλ‘ μμ±μ ν΄μΌ νλ―λ‘ ejs template enginκ³Ό jqueryλ₯Ό μ¬μ©νμ¬ **κ°κ²°νκ³  κΉλνκ² κ΄λ¦¬μ νμ΄μ§λ₯Ό μμ±**.<br/>
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
κΈ°λ₯ μμ£Όμ κ΄λ¦¬μ νμ΄μ§ κ΅¬ν. κ΄λ¦¬μ(λ­ν κ΄λ ¨ νμ)λ§ κ΄λ¦¬μ νμ΄μ§ μ κ·Όμ΄ κ°λ₯.

</details>


>## π¦Ύνμ

|μ΄λ¦|Github Link|Blog Link|
|--|--|--|
|μ΄μ°½ν|https://github.com/changhyeonlee-0703|https://lucian-blog.tistory.com|
|λ°μκ· |https://github.com/CalvinParkNov|https://velog.io/@pwk921110|


<br/>
