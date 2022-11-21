export class OrderModel {
    id: string;
    code: string;
    paymentType: string;
    orderType: string;
    status: string;
    freeShipping: boolean;
    total: number;
    createdDate: Date;
}