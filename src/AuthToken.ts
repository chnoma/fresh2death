export type AuthToken = {
  username: string;
  token: string;
  expires: number;
}

export function generateToken(id: string, expires?: number): AuthToken {
  return {
    username: id,
    token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    expires: expires || Date.now() + 1000 * 60 * 60 * 24 * 7,
  }
}

export function isTokenValid(_token: string) {
  // look up token in persistent storage and return true if it's valid
  return true;
}