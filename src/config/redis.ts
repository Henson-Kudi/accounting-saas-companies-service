import * as redis from "redis";
import { v4 as uuidv4 } from "uuid";

const lockTimeout = 30000; // Lock timeout in milliseconds

const redisClient = redis.createClient({
    url:
        process.env.REDIS_ADAPTER_URL ??
        "redis://default:redispw@localhost:32768",
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

export async function acquireLock(key: any) {
    console.log("acquiring lock");
    const lockId = uuidv4();
    try {
        const set = await redisClient.set(key, lockId, {
            PX: lockTimeout,
            NX: true,
        });
        console.log(set);
        return set ? lockId : null;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function releaseLock(key: any, lockId: any) {
    try {
        const currentLockId = await redisClient.get(key);
        if (currentLockId === lockId) {
            await redisClient.del(key);
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function connectToRedis() {
    try {
        await redisClient.connect();
        console.log("redis connected");
        return "Connected to redis";
    } catch (err) {
        throw err;
    }
}

export default redisClient;
