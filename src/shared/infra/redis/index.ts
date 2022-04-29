import { createClient } from "redis";

export async function redisClient() {
    const client = createClient({
        url: "redis://127.0.0.1:6380",
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    return client;
}
