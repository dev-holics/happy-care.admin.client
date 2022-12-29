import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BranchesService } from 'src/app/pages/branches/services/branches.service';
import { ProductModel } from 'src/app/pages/products/models/product.model';
import { ProductsService } from 'src/app/pages/products/services/products.service';
import { DEFAULT_PAGINATION, STATUS, PAYMENT_TYPE_OPTIONS } from 'src/app/shared/config';
import { BranchModel } from 'src/app/shared/models/branch.model';
import { ORDER_STATUS } from 'src/app/_config';
import { OrderModel } from '../../models/order.model';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public displayDialog: boolean = false;

  public displayDetails: boolean = false;
  public details: [];

  public order: OrderModel;
  public products: ProductModel[] = [];
  public orders: OrderModel[] = [];
  public branchId: string = 'ALL';
  public branches: BranchModel[] = [];
  public status: string = 'ALL';
  public statusOption = STATUS;
  public paymentType: string = 'ALL';
  public paymentTypeOptions = PAYMENT_TYPE_OPTIONS;

  public canChangeStatus: boolean = true;
  public canFilter: boolean = true;

  totalData: number;
  params: any = {
    page: DEFAULT_PAGINATION.PAGE,
    limit: 20,
  };
  public searchText: string = '';

  public changeStatusPopup = false;
  public selectedOrder: OrderModel;

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private toast: MessageService,
    private branchesService: BranchesService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
    await this.getBranches();
    await this.getOrderHistoryList();
  }

  async getBranches() {
    const res = await this.branchesService.getBranches(null);
    this.branches = [{id: 'ALL', address: 'Tất cả'}].concat(res.data);
  }

  async getProducts(): Promise<void> {
    const res = await this.productsService.getProducts(null);
    this.products = res.data;
  }

  getOrderType(orderType: string) {
    if (orderType === 'ONLINE_STORE') {
      return 'Đặt qua web';
    }
    if (orderType === 'OFFLINE_STORE') {
      return 'Đến quầy mua'
    }
    return '';
  }

  getPaymentType(paymentType: string) {
    if (paymentType === 'CASH') {
      return 'Tiền mặt';
    }
    if (paymentType === 'TRANSFER') {
      return 'Chuyển khoản';
    }
    return '';
  }

  getDeliveryType(deliveryType: string) {
    if (deliveryType === 'SHIP') {
      return 'Giao hàng tận nhà';
    }
    if (deliveryType === 'PICK_UP') {
      return 'Đến lấy';
    }
    return '';
  }

  transformOrderStatus(status: string) {
    let orderStatus;

    switch (status) {
      case ORDER_STATUS.PROCESSING:
        orderStatus = 'Đang xử lý';
        break;
      case ORDER_STATUS.CONFIRMED:
        orderStatus = 'Đã xác nhận';
        break;
      case ORDER_STATUS.DELIVERING:
        orderStatus = 'Đang vận chuyển';
        break;
      case ORDER_STATUS.DELIVERED:
        orderStatus = 'Đã giao';
        break;
      case ORDER_STATUS.RECEIVED:
          orderStatus = 'Đã nhận';
          break;
      case ORDER_STATUS.CANCELED:
        orderStatus = 'Đã huỷ';
        break;
      default:
        break;
    }

    return orderStatus;
  }

  async paginate(event: any) {

    this.params = {
      ...this.params,
      page: event.page + 1,
    };

    return this.getOrderHistoryList();
  }

  async onChangeBranch(event) {
    await this.getOrderHistoryList();
  }


  async getOrderHistoryList() {
    let query = this.params;
    if (this.branchId !== 'ALL') {
      query = {
        ...query,
        branchId: this.branchId
      }
    };

    if (this.status !== 'ALL') {
      query = {
        ...query,
        status: this.status,
      };
    }

    if (this.paymentType !== 'ALL') {
      query = {
        ...query,
        paymentType: this.paymentType,
      };
    }

    const orders = await this.ordersService.getOrderHistory(query);

    if (!orders.success) {
      return this.toast.add({
        severity: 'error',
        summary: 'Thông báo',
        detail: 'Không thể lấy thông tin nhận hàng',
      });
    }

    this.totalData = orders.totalData;
    this.orders = orders.data as OrderModel[];
  }

  openDialog(order): void {
    this.displayDialog = true;
    if (order) {
      this.order = order;
    } else {
      this.order = new OrderModel();
    }
  }

  async onHideDialog(order): Promise<void> {
    console.log(order);
    this.displayDialog = false;
    if (order) {
      await this.ordersService.addOrder(order);
    }
  }

  onHideDetail(): void {
    this.displayDetails = false;
  }

  onShowDetail(order) {
    this.selectedOrder = order;
    this.displayDetails = true;
  }

  onShowChangeStatusDialog(order) {
    this.changeStatusPopup = true;
    this.selectedOrder = order;
  }

  onHideChangeStatusDialog() {
    this.changeStatusPopup = false;
  }

  async updateStatus() {
    let status = '';
    if (!this.selectedOrder) {
      return;
    }

    if (this.selectedOrder.status === 'PROCESSING') {
      status = 'CONFIRMED';
    }

    if (this.selectedOrder.status === 'CONFIRMED' && this.selectedOrder.delivery !== 'PICK_UP') {
      status = 'DELIVERING';
    }

    if (this.selectedOrder.status === 'CONFIRMED' && this.selectedOrder.delivery === 'PICK_UP') {
      status = 'RECEIVED';
    }

    if (this.selectedOrder.status === 'DELIVERING') {
      status = 'DELIVERED';
    }

    if (status === '') {
      return;
    }

    await this.ordersService.updateStatusOrder(this.selectedOrder.id, status);
    this.changeStatusPopup = false;
    await this.getOrderHistoryList();
    this.toast.add({
      severity: 'success',
      summary: 'Thông báo',
      detail: 'Cập nhật trạng thái thành công',
    });
  }

  getText() {
    if (this.selectedOrder) {
      if (this.selectedOrder.status === 'PROCESSING') {
        return 'Bạn có muốn xác nhận đơn hàng này ?';
      }
      if (this.selectedOrder.status === 'CONFIRMED' && this.selectedOrder.delivery !== 'PICK_UP') {
        return 'Bạn có muốn xác nhận vận chuyển đơn hàng này ?';
      }
      if (this.selectedOrder.status === 'CONFIRMED' && this.selectedOrder.delivery === 'PICK_UP') {
        return 'Bạn có muốn xác nhận khách hàng đã lấy đơn hàng này ?';
      }
      if (this.selectedOrder.status === 'DELIVERING') {
        return 'Bạn có muốn xác nhận đơn này đã được giao ?';
      }
    }
    return '';
  }
}
