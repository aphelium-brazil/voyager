import { SwapsRepository } from "@modules/swap/repositories/SwapsRepository";

import { ICreateCandleDTO } from "../../dtos/ICreateCandleDTO";
import { Candle } from "../../entities/Candle";
import { CandleRepository } from "../../repositories/CandleRepository";

export class CreateCandleUseCase {
    // eslint-disable-next-line consistent-return
    async execute({
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
        const swapsRepository = new SwapsRepository();
        const { id } = await swapsRepository.findByName(swapId);

        const candleRepository = new CandleRepository(swapId);
        if (isClosed === true) {
            const candle = candleRepository.create({
                swapId: id,
                interval,
                timestamp: new Date(timestamp),
                open,
                close,
                high,
                low,
                volume,
                isClosed,
            });

            candleRepository.cache({
                swapId,
                interval,
                timestamp: new Date(timestamp),
                open,
                close,
                high,
                low,
                volume,
                isClosed,
            });

            return candle;
        }
        const candle = candleRepository.cache({
            swapId,
            interval,
            timestamp: new Date(timestamp),
            open,
            close,
            high,
            low,
            volume,
            isClosed,
        });

        return candle;
    }
}
