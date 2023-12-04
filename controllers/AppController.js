import dbClient from '../utils/db';
import redisClient from '../utils/redis';

function getStatus() {
  return { redis: redisClient.isAlive(), db: dbClient.isAlive() };
}

async function getStats() {
  return { users: await dbClient.nbUsers(), files: await dbClient.nbFiles() };
}

module.exports = { getStatus, getStats };
