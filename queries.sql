CREATE TABLE IF NOT EXISTS "TESTE" (
    "id" uuid NOT NULL,
    "swapId" uuid NOT NULL,
    "timestamp" timestamp NOT NULL,
    "open" decimal NOT NULL,
    "close" decimal NOT NULL,
    "high" decimal NOT NULL,
    "low" decimal NOT NULL,
    "volume" decimal NOT NULL,
    "isClosed" boolean NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "PK_TEST" PRIMARY KEY ("id"),
    CONSTRAINT fk_testeSwapId
      FOREIGN KEY("swapId")
	  REFERENCES swaps(id)
)

CREATE TABLE IF NOT EXISTS "swaps" (

    "id" uuid NOT NULL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "isActive" boolean NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "updatedAt" timestamp NOT NULL DEFAULT now()
    
)