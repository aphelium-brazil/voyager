import { CoinRepositoryInMemory } from "@modules/coin/repositories/in-memory/CoinRepositoryInMemory";

import { CreateCoinUseCase } from "../createCoin/CreateCoinUseCase";
import { ListCoinsUseCase } from "./ListCoinsUseCase";

describe("Coin", () => {
    let createCoinUseCase: CreateCoinUseCase;
    let listCoinsUseCase: ListCoinsUseCase;
    let coinRepositoryInMemory: CoinRepositoryInMemory;

    beforeEach(() => {
        coinRepositoryInMemory = new CoinRepositoryInMemory();
        createCoinUseCase = new CreateCoinUseCase(coinRepositoryInMemory);
        listCoinsUseCase = new ListCoinsUseCase(coinRepositoryInMemory);
    });

    describe("ListCoinsUseCase", () => {
        it("should be defined", async () => {
            await createCoinUseCase.execute({
                name: "string",
                isFiat: false,
                description: "string",
                symbol: "string",
                isActive: true,
            });

            const result = await listCoinsUseCase.execute();

            expect(result.length).toBe(1);
        });
    });
});
