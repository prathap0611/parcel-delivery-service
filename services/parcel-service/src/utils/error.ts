export class ClientAuthenticationError extends Error {}

export class InternalServerError extends Error {}

export class ParcelAlreadyPickedForDelivery extends Error {
    constructor() {
        super('Parcel Already picked for delivery');
    }
}

export class InvalidDeliveryRequest extends Error {
    constructor() {
        super('Either the biker or parcel status is invalid');
    }
}
