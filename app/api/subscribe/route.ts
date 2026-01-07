// eslint-disable-next-line @typescript-eslint/no-explicit-any
let subscription: any = null;

export async function POST(req: Request) {
  subscription = await req.json();
  return Response.json({ success: true });
}

export function getSub() {
  return subscription;
}
