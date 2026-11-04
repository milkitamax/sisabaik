const secret = process.env.JWT_SECRET ?? "";

if (!/^[a-f0-9]{64}$/i.test(secret)) {
  throw new Error("JWT_SECRET harus berupa 32 byte acak dalam format hex.");
}

export const authConfig = Object.freeze({
  secret,
  issuer: "sisabaik-api",
  audience: "sisabaik-client",
  ttl: "15m",
  cost: 12,
});