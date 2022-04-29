import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCoinUseCase } from "./CreateCoinUseCase";

export class CreateCoinController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, isFiat, description, symbol, isActive } = request.body;

        const createCoinUseCase = container.resolve(CreateCoinUseCase);

        await createCoinUseCase.execute({
            name,
            isFiat,
            description,
            symbol,
            isActive,
        });

        return response.status(201).send();
    }
}
