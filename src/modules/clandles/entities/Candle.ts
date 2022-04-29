/* eslint-disable max-classes-per-file */
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

export class Candle {
    @PrimaryColumn()
    id: string;
    @Column()
    interval: string;
    @Column()
    swapId: string;
    @Column()
    timestamp: Date;
    @Column()
    open: number;
    @Column()
    close: number;
    @Column()
    high: number;
    @Column()
    low: number;
    @Column()
    volume: number;
    @Column()
    isClosed: boolean;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

// @Entity("*")
// export class * extends Candle {}

@Entity("BTCBRL")
export class BTCBRL extends Candle {}

@Entity("ETHBRL")
export class ETHBRL extends Candle {}

@Entity("BNBBRL")
export class BNBBRL extends Candle {}

@Entity("SOLBRL")
export class SOLBRL extends Candle {}

@Entity("LTCBRL")
export class LTCBRL extends Candle {}

@Entity("LUNABRL")
export class LUNABRL extends Candle {}

@Entity("AVAXBRL")
export class AVAXBRL extends Candle {}

@Entity("AXSBRL")
export class AXSBRL extends Candle {}

@Entity("ATOMBRL")
export class ATOMBRL extends Candle {}

@Entity("DOTBRL")
export class DOTBRL extends Candle {}

@Entity("LINKBRL")
export class LINKBRL extends Candle {}

@Entity("SANTOSBRL")
export class SANTOSBRL extends Candle {}

@Entity("SANDBRL")
export class SANDBRL extends Candle {}

@Entity("MANABRL")
export class MANABRL extends Candle {}

@Entity("GMTBRL")
export class GMTBRL extends Candle {}

@Entity("ENJBRL")
export class ENJBRL extends Candle {}

@Entity("C98BRL")
export class C98BRL extends Candle {}

@Entity("MATICBRL")
export class MATICBRL extends Candle {}

@Entity("FTMBRL")
export class FTMBRL extends Candle {}

@Entity("ADABRL")
export class ADABRL extends Candle {}

@Entity("USDTBRL")
export class USDTBRL extends Candle {}

@Entity("BUSDBRL")
export class BUSDBRL extends Candle {}

@Entity("XRPBRL")
export class XRPBRL extends Candle {}

@Entity("FISBRL")
export class FISBRL extends Candle {}

@Entity("CHZBRL")
export class CHZBRL extends Candle {}

@Entity("GALABRL")
export class GALABRL extends Candle {}

@Entity("DOGEBRL")
export class DOGEBRL extends Candle {}

@Entity("WINBRL")
export class WINBRL extends Candle {}

@Entity("SHIBBRL")
export class SHIBBRL extends Candle {}
