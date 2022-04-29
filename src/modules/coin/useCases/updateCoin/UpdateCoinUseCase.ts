import { IUpdateCoinDTO } from "@modules/coin/dtos/IUpdateCoinDTO";
import { Coin } from "@modules/coin/entities/Coin";
import { ICoinsRepository } from "@modules/coin/repositories/interfaces/ICoinRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateCoinUseCase {
    constructor(
        @inject("CoinsRepository")
        private coinsRepository: ICoinsRepository
    ) {}

    async execute({
        id,
        name,
        isFiat,
        description,
        symbol,
        isActive,
    }: IUpdateCoinDTO): Promise<Coin> {
        // Bussiness Rule: Should not create a new coin if it already exists one with the same name.
        const coinExists = await this.coinsRepository.findByIds([id]);

        if (!coinExists[0]) {
            throw new AppError("Coin not found!");
        }

        const coin = await this.coinsRepository.update({
            id,
            name,
            isFiat,
            description,
            symbol,
            isActive,
        });

        return coin;
    }
}
