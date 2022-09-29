console.log("Service Worker Loaded...");
//EventListener 실행 (브라우저 자바스크립트)
self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by 원큔팤!!",
  });
});
