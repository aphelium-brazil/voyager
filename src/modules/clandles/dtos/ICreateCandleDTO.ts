export interface ICreateCandleDTO {
    interval: string;
    swapId: string;
    timestamp: Date;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    isClosed: boolean;
}
