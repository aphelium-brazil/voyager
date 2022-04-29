import { ICreateSwapDTO } from "@modules/swap/dtos/ICreateSwapDTO";
import { Swap } from "@modules/swap/entities/Swap";

import { ISwapsRepository } from "../interfaces/ISwapsRepository";

export class SwapsRepositoryInMemory implements ISwapsRepository {
    swaps: Swap[] = [];

    async listAll(): Promise<Swap[]> {
        return this.swaps;
    }

    async findByName(name: string): Promise<Swap> {
        return this.swaps.filter((swap) => name.includes(swap.name))[0];
    }

    async findByIds(ids: string[]): Promise<Swap[]> {
        return this.swaps.filter((swap) => ids.includes(swap.id));
    }

    async create({ name, coins, isActive }: ICreateSwapDTO): Promise<Swap> {
        const swap = new Swap();
        Object.assign(swap, { name, coins, isActive });
        this.swaps.push(swap);
        return swap;
    }
}
