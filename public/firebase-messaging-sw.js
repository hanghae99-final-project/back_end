// servcie worker 구현 웹이 꺼져있어도 돌아갈수 있도록 (웹 백엔드 느낌)

importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

// Initialize Firebase
var config = {
  apiKey: process.env.FIRE_BASE_API,
  authDomain: process.env.FIRE_BASE_AUTH_DOMAIN,
  projectId: process.env.FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

//백그라운 메시지 handler(index.html 페이지가 아닌곳에서 푸시 알림 다루는 코드)
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const title = "Hello World";
  const options = {
    body: payload.data.status,
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(title, options);
});
