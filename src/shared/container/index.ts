import { CoinsRepository } from "@modules/coin/repositories/CoinsRepository";
import { ICoinsRepository } from "@modules/coin/repositories/interfaces/ICoinRepository";
import { ISwapsRepository } from "@modules/swap/repositories/interfaces/ISwapsRepository";
import { SwapsRepository } from "@modules/swap/repositories/SwapsRepository";
import { container } from "tsyringe";

container.registerSingleton<ISwapsRepository>(
    "SwapsRepository",
    SwapsRepository
);

container.registerSingleton<ICoinsRepository>(
    "CoinsRepository",
    CoinsRepository
);
