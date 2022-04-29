import { ICreateCandleDTO } from "@modules/clandles/dtos/ICreateCandleDTO";

import { CreateCandleUseCase } from "./CreateCandleUseCase";

export class CreateCandleController {
    async handle({
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
        const createCandleUseCase = new CreateCandleUseCase();
        const candle = await createCandleUseCase.execute({
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

        return candle;
    }
}
