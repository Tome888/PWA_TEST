self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "PWA Notification", {
    body: data.body || "It works 🎉",
    icon: "/icon.png",
  });
});
