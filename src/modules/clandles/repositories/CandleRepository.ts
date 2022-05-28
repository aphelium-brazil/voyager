import { createConnection } from "@shared/infra/postgres";
import { redisClient } from "@shared/infra/redis";

import { ICreateCandleDTO } from "../dtos/ICreateCandleDTO";
import { Candle } from "../entities/Candle";
import { ICandleRepository } from "./interfaces/ICandleRepository";

export class CandleRepository implements ICandleRepository {
    async create({
        swapId,
        interval,
        timestamp,
        open,
        close,
        high,
        low,
        volume,
        isClosed,
    }: ICreateCandleDTO) {
        const candle = new Candle();

        Object.assign(candle, {
            swapId,
            interval,
            timestamp,
            open,
            close,
            high,
            low,
            volume,
            isClosed,
        });

        const client = await createConnection();

        const tableName = `candles_${swapId}_${interval}`;

        const pkName = `PK_candles_${swapId}_${interval}`;

        const fkName = `FK_candles_${swapId}_${interval}`;

        await client.query(`
            CREATE TABLE IF NOT EXISTS ${tableName} (
                "id" uuid NOT NULL,
                "swapId" uuid NOT NULL,
                "timestamp" timestamp NOT NULL,
                "open" decimal NOT NULL,
                "close" decimal NOT NULL,
                "high" decimal NOT NULL,
                "low" decimal NOT NULL,
                "volume" decimal NOT NULL,
                "isClosed" boolean NOT NULL,
                "createdAt" timestamp NOT NULL DEFAULT now(),
                "updatedAt" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT ${pkName} PRIMARY KEY ("id"),
                CONSTRAINT ${fkName}
                FOREIGN KEY("swapId")
                REFERENCES swaps(id)
            );
        `);

        const { rows } = await client.query(
            `SELECT id FROM swaps WHERE name = '${swapId.toUpperCase()}'`
        );

        const thisSwapId = rows[0].id;

        const sql = `INSERT INTO ${tableName} (
            "id", 
            "swapId", 
            "timestamp", 
            "open", 
            "close", 
            "high", 
            "low", 
            "volume",
            "isClosed", 
            "createdAt", 
            "updatedAt"
            ) VALUES ($1,$2,$3, $4, $5, $6, $7, $8, $9, $10, $11);`;
        const values = [
            candle.id,
            thisSwapId,
            candle.timestamp,
            candle.open,
            candle.close,
            candle.high,
            candle.low,
            candle.volume,
            candle.isClosed,
            candle.createdAt,
            candle.updatedAt,
        ];

        await client.query(sql, values);

        return candle;
    }

    async cache({
        swapId,
        interval,
        timestamp,
        open,
        close,
        high,
        low,
        volume,
        isClosed,
    }: ICreateCandleDTO): Promise<Candle> {
        const candle = new Candle();

        Object.assign(candle, {
            swapId,
            interval,
            timestamp,
            open,
            close,
            high,
            low,
            volume,
            isClosed,
        });

        if (interval === "1m") {
            const redis = await redisClient();

            redis.HSET(swapId.toString(), "now", close);

            redis.QUIT();
        }

        if (isClosed === true) {
            const redis = await redisClient();

            redis.HSET(swapId.toString(), interval.toString(), close);

            redis.QUIT();
        }
        return candle;
    }
}
