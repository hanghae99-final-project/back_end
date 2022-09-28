# back_end
├─ app.js
├─ package.json
├─ package-lock.json
├─ .eslintrc.js
├─ config
│  ├─ connect.js
│  ├─ logger.js
│  └─ scheduler.js
├─ middleware
│  ├─ async.js
│  ├─ auth.js
│  ├─ userAuth.js
│  └─ errorHandler.js
├─ errors
│  ├─ index.js
│  ├─ badRequestError.js
│  ├─ conflictError.js
│  ├─ customApiError.js
│  ├─ notFoundError.js
│  └─ unauthentiocated.js
├─ passport
│  ├─ index.js
│  ├─ kakaoLocal.js
│  └─ local.js
├─ routes
│  ├─ index.js
│  ├─ admin
│  │  └─ index.js
│  ├─ myPage.js
│  ├─ profile.js
│  ├─ quote.js
│  ├─ rank.js
│  ├─ studying.js
│  ├─ time.js
│  ├─ todo.js
│  └─ user.js
├─ controllers
│  ├─ adminDataFunction
│  │  ├─ admin.js
│  │  ├─ adminPage.js
│  │  └─ login.js
│  ├─ myPage.js
│  ├─ profile.js
│  ├─ quote.js
│  ├─ rank.js
│  ├─ studying.js
│  ├─ time.js
│  ├─ todo.js
│  └─ user.js
├─ service
│  ├─ adminService
│  │  ├─ admin.js
│  │  └─ adminLogin.js
│  ├─ myPage.js
│  ├─ profile.js
│  ├─ rank.js
│  ├─ studying.js
│  ├─ time.js
│  ├─ todo.js
│  └─ user.js
├─ models
│  ├─ admin
│  │  └─ adminModels.js
│  ├─ login.js
│  ├─ mail.js
│  ├─ myPage.js
│  ├─ profile.js
│  ├─ quotes.js
│  ├─ rank.js
│  ├─ search.js
│  ├─ studying.js
│  ├─ time.js
│  ├─ todo.js
│  └─ userValidation.js
├─ schemas
│  ├─ admin.js
│  ├─ confirmNumber.js
│  ├─ quote.js
│  ├─ studying.js
│  ├─ time.js
│  ├─ todo.js
│  └─ user.js
├─ test
│  ├─ rank.test.js
│  ├─ time.test.js
│  ├─ todo.test.js
│  ├─ studying.js
│  └─ user.test.js
├─ public
│  ├─ css
│  │  ├─ bootstrap/utilities
│  │  │  └─ _stretched-link.css
│  │  ├─ bootstrap.min.css
│  │  ├─ bootstrap.min.css.map
│  │  ├─ common.css
│  │  ├─ login.css
│  │  ├─ owl.carousel.min.css
│  │  └─ style.css
│  └─ js
│     ├─ bootstrap.min.js
│     ├─ jquery-3.3.1.min.js
│     ├─ main.js
│     ├─ owl.carousel.min.js
│     └─ popper.min.js
└─ views
   ├─ login.ejs
   ├─ alert
   │  ├─ alert.ejs
   │  └─ successAlert.ejs
   ├─ partials
   │  ├─ footer.ejs
   │  └─ header.ejs
   └─ main
      ├─ insQuotePage.ejs
      ├─ main.ejs
      ├─ user.ejs
      └─ addInput
         └─ addQuotes.ejs
         
         
         
         
