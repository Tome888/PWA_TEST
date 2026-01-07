import webpush from "web-push";
import { getSub } from "../subscribe/route";

webpush.setVapidDetails(
  "mailto:test@test.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function POST() {
  const sub = getSub();
  if (!sub) {
    return Response.json({ error: "No subscription found" }, { status: 400 });
  }

  // wait 5s
  await new Promise((res) => setTimeout(res, 5000));

  await webpush.sendNotification(
    sub,
    JSON.stringify({
      title: "PWA works 🎉",
      body: "You received this after closing the app",
    }),
  );

  return Response.json({ success: true });
}
