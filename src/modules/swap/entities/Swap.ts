import { v4 as uuidV4 } from "uuid";

export class Swap {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.createdAt = new Date();
        }
        this.updatedAt = new Date();
    }
}
