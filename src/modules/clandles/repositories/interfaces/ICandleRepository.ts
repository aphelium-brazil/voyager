import { ICreateCandleDTO } from "@modules/clandles/dtos/ICreateCandleDTO";
import { Candle } from "@modules/clandles/entities/Candle";

export interface ICandleRepository {
    create(data: ICreateCandleDTO): Promise<Candle>;
    cache(data: ICreateCandleDTO): Promise<Candle>;
}
