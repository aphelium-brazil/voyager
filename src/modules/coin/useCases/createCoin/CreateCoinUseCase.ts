import { ICreateCoinDTO } from "@modules/coin/dtos/ICreateCoinDTO";
import { Coin } from "@modules/coin/entities/Coin";
import { ICoinsRepository } from "@modules/coin/repositories/interfaces/ICoinRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateCoinUseCase {
    constructor(
        @inject("CoinsRepository")
        private coinRepository: ICoinsRepository
    ) {}

    async execute({
        name,
        isFiat,
        description,
        symbol,
        isActive,
    }: ICreateCoinDTO): Promise<Coin> {
        // Bussiness Rule: Should not create a new coin if it already exists one with the same name.
        const coinNameAlreadyExists = await this.coinRepository.findByName(
            name
        );

        if (coinNameAlreadyExists) {
            throw new AppError("Coin name already exists!");
        }

        // Bussiness Rule: Should not create a new coin if it already exists one with the same symbol.
        const coinSymbolAlreadyExists = await this.coinRepository.findBySymbol(
            symbol
        );

        if (coinSymbolAlreadyExists) {
            throw new AppError("Coin symbol already exists!");
        }

        const coin = await this.coinRepository.create({
            name,
            isFiat,
            description,
            symbol,
            isActive,
        });

        return coin;
    }
}
