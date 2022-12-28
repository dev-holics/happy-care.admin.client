import { BranchModel } from 'src/app/shared/models/branch.model';

export class OrderModel {
    id: string;
    products: any[];
    paymentType: string;
    totalPrice: number;
    customerId: string;
    orderCode: string;
    orderType: string;
    status: string;
    orderDate: string;
    delivery: string;
    updatedAt: string;
    orderPayment: any;
    branch: BranchModel;

    constructor(init?: Partial<OrderModel>) {
      Object.assign(this, init);
    }
}
