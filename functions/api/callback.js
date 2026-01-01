export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const code = searchParams.get('code');

  if (!code) {
    return Response.redirect('https://skids.smelly.cc/sub.html?authorized=false&error=no_code');
  }

  try {
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: context.env.DISCORD_CLIENT_ID,
        client_secret: context.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://skids.smelly.cc/api/callback',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokens = await tokenResponse.json();
    if (!tokens.access_token) {
      return Response.redirect('https://skids.smelly.cc/sub.html?authorized=false&error=token_fail');
    }

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const userData = await userResponse.json();

    const user = await context.env.DB.prepare(
      'SELECT * FROM whitelist WHERE discord_id = ? AND is_active = 1'
    ).bind(userData.id).first();

    const baseParams = `user=${encodeURIComponent(userData.username)}&userid=${userData.id}&avatar=${userData.avatar}`;

    if (user) {
      return Response.redirect(`https://skids.smelly.cc/sub.html?authorized=true&${baseParams}&expiry=${user.expiry_date}`);
    } else {
      return Response.redirect(`https://skids.smelly.cc/sub.html?authorized=false&${baseParams}`);
    }
  } catch {
    return Response.redirect('https://skids.smelly.cc/sub.html?authorized=false&error=system_error');
  }
}
