import "dotenv/config";

import "reflect-metadata";

import "@shared/container";

import { createServer } from "@shared/infra/grpc/server";
import { createConnection } from "@shared/infra/postgres";
import { startupRoutine } from "@shared/infra/websocket/startupRoutine";
import "../websocket/client";

createConnection();
createServer();
setTimeout(startupRoutine, 5000);
