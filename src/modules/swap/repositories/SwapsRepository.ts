import { ICreateSwapDTO } from "@modules/swap/dtos/ICreateSwapDTO";
import { ISwapsRepository } from "@modules/swap/repositories/interfaces/ISwapsRepository";

import { createConnection } from "@shared/infra/postgres";

import { Swap } from "../entities/Swap";

export class SwapsRepository implements ISwapsRepository {
    async listAll(): Promise<Swap[]> {
        const client = await createConnection();
        const { rows } = await client.query("SELECT * FROM swaps");
        return rows;
    }

    // async findByName(name: string): Promise<Swap> {
    //     const swap = await this.repository.findOne({ name });
    //     return swap;
    // }

    // async findByIds(ids: string[]): Promise<Swap[]> {
    //     const swap = await this.repository.findByIds(ids);
    //     return swap;
    // }

    // async create({ id, name, coins, isActive }: ICreateSwapDTO): Promise<Swap> {
    //     const swap = await this.repository.create({
    //         id,
    //         name,
    //         coins,
    //         isActive,
    //     });

    //     await this.repository.save(swap);

    //     return swap;
    // }
}
