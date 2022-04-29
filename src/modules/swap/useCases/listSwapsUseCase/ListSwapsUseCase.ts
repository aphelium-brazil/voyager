import { Swap } from "@modules/swap/entities/Swap";
import { ISwapsRepository } from "@modules/swap/repositories/interfaces/ISwapsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListSwapsUseCase {
    constructor(
        @inject("SwapsRepository")
        private swapsRepository: ISwapsRepository
    ) {}

    async execute(): Promise<Swap[]> {
        const swaps = await this.swapsRepository.listAll();
        return swaps;
    }
}
