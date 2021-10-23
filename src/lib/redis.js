import { createClient as redisCreateClient } from "redis";
const { REDIS_HOST, REDIS_PORT } = process.env;

/**
 * @typedef { import("redis/dist/lib/commands").RedisModules } RedisModules
 * @typedef { import("redis/dist/lib/lua-script").RedisLuaScripts } RedisLuaScripts
 * @typedef { import("redis/dist/lib/client").RedisClientType<RedisModules, RedisLuaScripts> } RedisClient
 */

/** @type {RedisClient} */
let client = null;

/**
 *
 * @returns {RedisClient} client
 */
export function getClient() {
  return client;
}

export async function createClient() {
  console.log(`connecting redis...`);
  client = await redisCreateClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    legacyMode: true,
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  console.log(`connected redis`);
}
