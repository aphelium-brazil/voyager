import * as grpc from "@grpc/grpc-js";
import art from "ascii-art";

import { AppError } from "@shared/errors/AppError";

export function createServer() {
    const server = new grpc.Server();

    try {
        server.bindAsync(
            `127.0.0.1:${process.env.GRPC_PORT}`,

            grpc.ServerCredentials.createInsecure(),

            (err, port) => {
                if (err) {
                    console.log(err);

                    return;
                }

                art.font("Voyager-1", "Doom", (err: string, rendered: void) => {
                    console.log(
                        "-----------------------------------------------------------"
                    );

                    console.log(rendered);

                    console.log(
                        `Build with ❤  by Aphelium.   |   Version: ${process.env.VERSION}`
                    );

                    console.log(
                        "-----------------------------------------------------------"
                    );
                });

                server.start();
            }
        );
    } catch (e) {
        throw new AppError(e);
    }

    //   server.start();
}
