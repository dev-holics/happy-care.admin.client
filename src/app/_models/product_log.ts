export class ProductLogDto {
  quantity: number;
  transactionDate: Date;
  type: string;
  productName: string;
  branchName: string;
  product: any;
  branch: any;
}
export class ImportProductDto {
  quantity: number;
  transactionDate: Date;
  productId: string;
  branchId: string;
  type: string = "IMPORT";
}
