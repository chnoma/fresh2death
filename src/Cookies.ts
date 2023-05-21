export function parseCookieHeader(cookiesHeader: string | null) {
  const cookies = new Map<string,string>();
  if(cookiesHeader === null) return cookies;
  for (const cookie of cookiesHeader.split(";")) {
      const [key, value] = cookie.split("=");
      cookies.set(key.trim(), value.trim());
  }
  return cookies;
}

export function toCookieHeader(cookies: Map<string,string>) {
  let cookieHeader = "";
  for (const [key, value] of cookies) {
    cookieHeader += `${key}=${value}; `;
  }
  return cookieHeader;
}