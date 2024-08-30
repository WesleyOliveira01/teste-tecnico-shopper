-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "measures" (
    "measure_uuid" TEXT NOT NULL,
    "customerCode" TEXT NOT NULL,
    "measureDate" TIMESTAMP(3) NOT NULL,
    "measureType" "MeasureType" NOT NULL,
    "value" INTEGER,
    "imageUrl" TEXT,
    "isConfirmed" BOOLEAN DEFAULT false,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("measure_uuid")
);
