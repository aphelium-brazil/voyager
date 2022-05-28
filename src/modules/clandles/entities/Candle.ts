import { v4 as uuidV4 } from "uuid";

export class Candle {
    id: string;
    interval: string;
    swapId: string;
    timestamp: Date;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    isClosed: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
        if (this.id) {
            this.updatedAt = new Date();
        }
    }
}
