import { CoinRepositoryInMemory } from "@modules/coin/repositories/in-memory/CoinRepositoryInMemory";

import { CreateCoinUseCase } from "../createCoin/CreateCoinUseCase";
import { UpdateCoinUseCase } from "./UpdateCoinUseCase";

describe("Coin", () => {
    let createCoinUseCase: CreateCoinUseCase;
    let updateCoinUseCase: UpdateCoinUseCase;
    let coinRepositoryInMemory: CoinRepositoryInMemory;

    beforeEach(() => {
        coinRepositoryInMemory = new CoinRepositoryInMemory();
        createCoinUseCase = new CreateCoinUseCase(coinRepositoryInMemory);
        updateCoinUseCase = new UpdateCoinUseCase(coinRepositoryInMemory);
    });

    describe("UpdateCoinUseCase", () => {
        it("should updated a created coin", async () => {
            const coin = await createCoinUseCase.execute({
                name: "string",
                isFiat: false,
                description: "string",
                symbol: "string",
                isActive: true,
            });

            await updateCoinUseCase.execute({ id: coin.id, name: "Bitcoin" });

            const updatedCoin = await coinRepositoryInMemory.findByIds([
                coin.id,
            ]);

            expect(updatedCoin[0].name).toBe("Bitcoin");
        });
    });
});
