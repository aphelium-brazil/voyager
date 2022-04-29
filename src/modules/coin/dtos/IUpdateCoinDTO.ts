export interface IUpdateCoinDTO {
    id: string;
    name?: string;
    isFiat?: boolean;
    description?: string;
    symbol?: string;
    isActive?: boolean;
}
