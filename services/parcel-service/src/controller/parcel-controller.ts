import { Parcels, PrismaClient, Status } from '@prisma/client';
import {
    InternalServerError,
    InvalidDeliveryRequest,
    ParcelAlreadyPickedForDelivery,
} from '../utils/error';
import logger from '../utils/logger';

const prisma = new PrismaClient();

export async function createParcel({
    senderId,
    pickupAddress,
    deliveryAddress,
}: {
    senderId: number;
    pickupAddress: string;
    deliveryAddress: string;
}): Promise<number> {
    try {
        const { id } = await prisma.parcels.create({
            data: { senderId, pickupAddress, deliveryAddress },
            select: { id: true },
        });
        return id;
    } catch (error) {
        logger.error(error);
        throw new InternalServerError('Failed to create parcel');
    }
}

type ParcelKey = keyof Parcels;

export async function getParcel(
    parcelId: number,
    selectOptions?: ParcelKey[]
): Promise<Partial<Parcels>> {
    const fieldsToReturn = (selectOptions || []).reduce<
        Record<ParcelKey, boolean>
    >((agg, option) => {
        agg[option] = true;
        return agg;
    }, {} as Record<ParcelKey, boolean>);

    return prisma.parcels.findUnique({
        where: { id: parcelId },
        rejectOnNotFound: true,
        select: fieldsToReturn,
    });
}

export async function listParcels(senderId?: number): Promise<Parcels[]> {
    return prisma.parcels.findMany({
        ...(senderId && { where: { senderId } }),
    });
}

export async function pickupParcel({
    bikerId,
    pickupTime,
    parcelId,
}: {
    parcelId: number;
    bikerId: number;
    pickupTime: Date;
}): Promise<Status> {
    const { status } = await getParcel(parcelId, ['status']);
    if (status === 'READY') {
        const { status } = await prisma.parcels.update({
            data: { bikerId, pickupTime, status: 'INFLIGHT' },
            where: { id: parcelId },
            select: { status: true },
        });
        return status;
    } else {
        throw new ParcelAlreadyPickedForDelivery();
    }
}

export async function deliverParcel({
    bikerId,
    deliveryTime,
    parcelId,
}: {
    parcelId: number;
    bikerId: number;
    deliveryTime: Date;
}): Promise<Status> {
    const { status, bikerId: bikerIdFromDatabase } = await getParcel(parcelId, [
        'status',
        'bikerId',
    ]);
    if (status === 'INFLIGHT' && bikerId === bikerIdFromDatabase) {
        const { status } = await prisma.parcels.update({
            data: { bikerId, deliveryTime, status: 'DELIVERED' },
            where: { id: parcelId },
            select: { status: true },
        });
        return status;
    } else {
        throw new InvalidDeliveryRequest();
    }
}
