-- CreateEnum
CREATE TYPE "Status" AS ENUM ('READY', 'INFLIGHT', 'DELIVERED');

-- CreateTable
CREATE TABLE "Senders" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "mobile" VARCHAR(16) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "salt" VARCHAR(255) NOT NULL,

    CONSTRAINT "Senders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bikers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "mobile" VARCHAR(16) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "salt" VARCHAR(255) NOT NULL,

    CONSTRAINT "Bikers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parcels" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "pickupAddress" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'READY',
    "pickupTime" TIMESTAMP(3),
    "deliveryTime" TIMESTAMP(3),
    "bikerId" INTEGER,

    CONSTRAINT "Parcels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Senders_email_key" ON "Senders"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Senders_mobile_key" ON "Senders"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Bikers_email_key" ON "Bikers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bikers_mobile_key" ON "Bikers"("mobile");

-- AddForeignKey
ALTER TABLE "Parcels" ADD CONSTRAINT "Parcels_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Senders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcels" ADD CONSTRAINT "Parcels_bikerId_fkey" FOREIGN KEY ("bikerId") REFERENCES "Bikers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
