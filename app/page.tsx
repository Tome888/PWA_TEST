"use client";

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

export default function Home() {
  async function enableNotifications() {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Notification permission denied");
      return;
    }

    const reg = await navigator.serviceWorker.ready;

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub),
    });

    alert("Subscribed ✅");
  }

  async function sendTest() {
    await fetch("/api/send", { method: "POST" });
    console.log("Close the app. Notification in ~5s ⏳");
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>PWA Push Test</h1>

      <button onClick={enableNotifications}>Enable notifications</button>

      <br />
      <br />

      <button onClick={sendTest}>Send test notification</button>
    </main>
  );
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((char) => char.charCodeAt(0)));
}
