import jwt from 'jsonwebtoken'

export function fakeJwt() {
  const secret = 'a-string-secret-at-least-256-bits-long'
  const payload = {
    sub: 'username',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
    iat: Math.floor(Date.now() / 1000),
  }

  return jwt.sign(payload, secret, {
    algorithm: 'HS512',
  })
}
