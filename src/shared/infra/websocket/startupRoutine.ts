import { SwapsRepository } from "@modules/swap/repositories/SwapsRepository";
import { ListSwapsUseCase } from "@modules/swap/useCases/listSwapsUseCase/ListSwapsUseCase";

import { wsClient } from "@shared/infra/websocket/client";

async function createConnection(kline: string): Promise<WebSocket[]> {
    const connections: WebSocket[] = [];

    const connect1m = wsClient.subscribeSpotKline(kline, "1m");
    connections.push(connect1m);

    const connect3m = wsClient.subscribeSpotKline(kline, "3m");
    connections.push(connect3m);

    const connect5m = wsClient.subscribeSpotKline(kline, "5m");
    connections.push(connect5m);

    const connect15m = wsClient.subscribeSpotKline(kline, "15m");
    connections.push(connect15m);

    const connect30m = wsClient.subscribeSpotKline(kline, "30m");
    connections.push(connect30m);

    const connect1h = wsClient.subscribeSpotKline(kline, "1h");
    connections.push(connect1h);

    const connect2h = wsClient.subscribeSpotKline(kline, "2h");
    connections.push(connect2h);

    const connect4h = wsClient.subscribeSpotKline(kline, "4h");
    connections.push(connect4h);

    const connect6h = wsClient.subscribeSpotKline(kline, "6h");
    connections.push(connect6h);

    const connect8h = wsClient.subscribeSpotKline(kline, "8h");
    connections.push(connect8h);

    const connect12h = wsClient.subscribeSpotKline(kline, "12h");
    connections.push(connect12h);

    const connect1d = wsClient.subscribeSpotKline(kline, "1d");
    connections.push(connect1d);

    const connect3d = wsClient.subscribeSpotKline(kline, "3d");
    connections.push(connect3d);

    const connect1w = wsClient.subscribeSpotKline(kline, "1w");
    connections.push(connect1w);

    const connect1M = wsClient.subscribeSpotKline(kline, "1M");
    connections.push(connect1M);

    return connections;
}

export async function startupRoutine() {
    // await createConnection("BTCBRL");
    // await createConnection("ETHBRL");

    const swapsRepository = new SwapsRepository();
    const listSwapsUseCase = new ListSwapsUseCase(swapsRepository);
    const swaps = listSwapsUseCase.execute();
    console.log(swaps);
    swaps.then((swaps) => {
        swaps.forEach((swap) => {
            createConnection(swap.name);
        });
    });
}
