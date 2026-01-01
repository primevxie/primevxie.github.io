export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { discord_id } = await request.json();

    const user = await env.DB.prepare(`
      SELECT * FROM whitelist 
      WHERE discord_id = ? 
      AND is_active = 1 
      AND expiry_date > date('now')
    `).bind(discord_id).first();

    const logPayload = {
      username: "Reap Guard",
      avatar_url: "https://skids.smelly.cc/reaplogodc2.png",
      embeds: [{
        title: user ? "✅ Granted" : "❌ Denied",
        description: user ? "User whitelisted" : "Access denied - No active subscription",
        color: user ? 3066993 : 15158332,
        fields: [
          { name: "User ID", value: discord_id, inline: true },
          { name: "Username", value: user ? user.username : "Unknown", inline: true },
          { name: "Subscription", value: user ? (user.expiry_date === '9999-12-31' ? "Lifetime" : user.expiry_date) : "None", inline: false }
        ],
        footer: { text: "Reap Launcher • 2026" }
      }]
    };

    if (env.DISCORD_URL) {
      await fetch(env.DISCORD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logPayload)
      });
    }

    if (user) {
      return new Response(JSON.stringify({ 
        authorized: true, 
        expires: user.expiry_date === '9999-12-31' ? 'Lifetime' : user.expiry_date 
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    } else {
      return new Response(JSON.stringify({ authorized: false }), { 
        status: 403, 
        headers: { "Content-Type": "application/json" } 
      });
    }

  } catch (err) {
    return new Response(JSON.stringify({ error: "API Error", details: err.message }), { status: 500 });
  }
}
