import { getRepository } from "typeorm";

import { redisClient } from "@shared/infra/redis";

import { ICreateCandleDTO } from "../dtos/ICreateCandleDTO";
import {
    ADABRL,
    ATOMBRL,
    AVAXBRL,
    AXSBRL,
    BNBBRL,
    BTCBRL,
    BUSDBRL,
    C98BRL,
    Candle,
    CHZBRL,
    DOGEBRL,
    DOTBRL,
    ENJBRL,
    ETHBRL,
    FISBRL,
    FTMBRL,
    GALABRL,
    GMTBRL,
    LINKBRL,
    LTCBRL,
    LUNABRL,
    MANABRL,
    MATICBRL,
    SANDBRL,
    SANTOSBRL,
    SHIBBRL,
    SOLBRL,
    USDTBRL,
    WINBRL,
    XRPBRL,
} from "../entities/Candle";
import { ICandleRepository } from "./interfaces/ICandleRepository";

export class CandleRepository implements ICandleRepository {
    private repository;

    constructor(repository: string) {
        if (repository === "BTCBRL") this.repository = getRepository(BTCBRL);
        if (repository === "ETHBRL") this.repository = getRepository(ETHBRL);
        if (repository === "BNBBRL") this.repository = getRepository(BNBBRL);

        if (repository === "SOLBRL") this.repository = getRepository(SOLBRL);
        if (repository === "LTCBRL") this.repository = getRepository(LTCBRL);
        if (repository === "LUNABRL") this.repository = getRepository(LUNABRL);
        if (repository === "AVAXBRL") this.repository = getRepository(AVAXBRL);
        if (repository === "AXSBRL") this.repository = getRepository(AXSBRL);
        if (repository === "ATOMBRL") this.repository = getRepository(ATOMBRL);
        if (repository === "DOTBRL") this.repository = getRepository(DOTBRL);
        if (repository === "LINKBRL") this.repository = getRepository(LINKBRL);
        if (repository === "SANTOSBRL")
            this.repository = getRepository(SANTOSBRL);
        if (repository === "SANDBRL") this.repository = getRepository(SANDBRL);
        if (repository === "MANABRL") this.repository = getRepository(MANABRL);
        if (repository === "GMTBRL") this.repository = getRepository(GMTBRL);
        if (repository === "ENJBRL") this.repository = getRepository(ENJBRL);
        if (repository === "C98BRL") this.repository = getRepository(C98BRL);
        if (repository === "MATICBRL")
            this.repository = getRepository(MATICBRL);
        if (repository === "FTMBRL") this.repository = getRepository(FTMBRL);
        if (repository === "ADABRL") this.repository = getRepository(ADABRL);
        if (repository === "USDTBRL") this.repository = getRepository(USDTBRL);
        if (repository === "BUSDBRL") this.repository = getRepository(BUSDBRL);
        if (repository === "XRPBRL") this.repository = getRepository(XRPBRL);
        if (repository === "FISBRL") this.repository = getRepository(FISBRL);
        if (repository === "CHZBRL") this.repository = getRepository(CHZBRL);
        if (repository === "GALABRL") this.repository = getRepository(GALABRL);
        if (repository === "DOGEBRL") this.repository = getRepository(DOGEBRL);
        if (repository === "WINBRL") this.repository = getRepository(WINBRL);
        if (repository === "SHIBBRL") this.repository = getRepository(SHIBBRL);
    }

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
        const candle = this.repository.create({
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

        return this.repository.save(candle);
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
