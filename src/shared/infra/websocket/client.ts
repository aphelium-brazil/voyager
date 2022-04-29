import { CreateCandleController } from "@modules/clandles/useCases/createCandle/CreateCandleController";
import { WebsocketClient } from "binance";

export const wsClient = new WebsocketClient({
    api_key: process.env.API_KEY,

    api_secret: process.env.API_SECRET,

    beautify: true,
});

// // receive raw events

// wsClient.on("message", (data) => {

//   console.log("Message: ", JSON.stringify(data, null, 2));

// });

// notification when a connection is opened

// wsClient.on("open", (data) => {
//     console.log("connection opened open:", data.wsKey, data.ws.target.url);
// });

// receive formatted events with beautified keys. Any "known" floats stored in strings as parsed as floats.

wsClient.on("formattedMessage", (data) => {
    // console.log("formattedMessage: ", data);
    const { symbol, kline } = data;
    const { interval, endTime, open, close, high, low, volume, final } = kline;

    const createCandle = new CreateCandleController();
    createCandle.handle({
        swapId: symbol,
        interval,
        timestamp: endTime,
        open,
        close,
        high,
        low,
        volume,
        isClosed: final,
    });
});

// // read response to command sent via WS stream (e.g LIST_SUBSCRIPTIONS)

// wsClient.on("reply", (data) => {

//   console.log("log reply: ", JSON.stringify(data, null, 2));

// });

// receive notification when a ws connection is reconnecting automatically

// wsClient.on("reconnecting", (data) => {
//     console.log("ws automatically reconnecting.... ", data?.wsKey);
// });

// receive notification that a reconnection completed successfully (e.g use REST to check for missing data)

// wsClient.on("reconnected", (data) => {
//     console.log("ws has reconnected ", data?.wsKey);
// });

// wsClient.subscribeSpotUserDataStream();
