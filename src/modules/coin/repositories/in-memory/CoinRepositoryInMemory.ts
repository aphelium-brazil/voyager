import { ICreateCoinDTO } from "@modules/coin/dtos/ICreateCoinDTO";
import { IUpdateCoinDTO } from "@modules/coin/dtos/IUpdateCoinDTO";
import { Coin } from "@modules/coin/entities/Coin";

import { ICoinsRepository } from "../interfaces/ICoinRepository";

export class CoinRepositoryInMemory implements ICoinsRepository {
    coins: Coin[] = [];

    async all(): Promise<Coin[]> {
        return this.coins;
    }
    async findBySymbol(symbol: string): Promise<Coin> {
        return this.coins.find((coin) => coin.symbol === symbol);
    }

    async findByIds(ids: string[]): Promise<Coin[]> {
        return this.coins.filter((coin) => ids.includes(coin.id));
    }
    async findByName(name: string): Promise<Coin> {
        return this.coins.find((coin) => coin.name === name);
    }

    async create({
        name,
        isFiat,
        description,
        symbol,
        isActive,
    }: ICreateCoinDTO): Promise<Coin> {
        const coin = new Coin();

        Object.assign(coin, {
            name,
            isFiat,
            description,
            symbol,
            isActive,
        });

        this.coins.push(coin);

        return coin;
    }

    async update({
        id,
        name,
        isFiat,
        description,
        symbol,
        isActive,
    }: IUpdateCoinDTO): Promise<Coin> {
        const coinExists = this.coins.find((coin) => coin.id === id);

        const updatedCoin = new Coin();

        Object.assign(updatedCoin, {
            id,
            name: name || coinExists.name,
            isFiat: isFiat || coinExists.isFiat,
            description: description || coinExists.description,
            symbol: symbol || coinExists.symbol,
            isActive: isActive || coinExists.isActive,
        });

        await this.coins.splice(this.coins.indexOf(coinExists), 1, updatedCoin);

        return updatedCoin;
    }

    async remove(id: string): Promise<void> {
        const coinExists = this.coins.find((coin) => coin.id === id);
        await this.coins.splice(this.coins.indexOf(coinExists), 1);
    }
}
