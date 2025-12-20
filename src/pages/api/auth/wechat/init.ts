export async function GET({ url }: { url: URL }) {
  const redirect = encodeURIComponent(url.origin + "/api/auth/wechat/callback");
  const authorize_url =
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=WECHAT_APP_ID&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
  return new Response(JSON.stringify({ authorize_url }), {
    headers: { "Content-Type": "application/json", "X-API-Version": "v1" }
  });
}

