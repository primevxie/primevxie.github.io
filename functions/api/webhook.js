// functions/api/webhook.js
export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    const payload = await request.json();

    const discordResponse = await fetch(env.DISCORD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return new Response(null, { status: discordResponse.status });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Proxy Error" }), { status: 500 });
  }
}
