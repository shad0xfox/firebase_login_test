import { getClient } from "../lib/redis.js";

const redis = getClient();

export function getIdTokenFromBlackList(idToken) {
  return redis.v4.get(`blacklist_${idToken}`);
}

export function setIdTokenBlackList(idToken) {
  return redis.v4.setEx(
    `blacklist_${idToken}`,
    process.env.REDIS_BLACKLIST_TTL,
    "1"
  );
}
