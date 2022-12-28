import { CategoryModel } from "src/app/_models/category";
import { ImageModel } from "src/app/shared/models/image.model";
import { OriginModel } from "../../origins/models/origin.model";
import { BrandModel } from "../../brands/models/brand.model";
export class ProductModel {
    id: string;
    code: string;
    name: string;  
    description?: string;
    packingSpec: string;
    unit: string;
    price: number;
    element?: string;
    uses: string;
    subject: string;
    guide: string;
    preserve: string;
    trademarkId: string;
    trademark: BrandModel | null;
    originId: string;
    origin: OriginModel | null;
    categoryId: string;
    category: CategoryModel | null;
    images: Array<ImageModel>;
}

export class ProductLogModel {
    quantity: number;
    transactionDate: Date;
    type: string;
    productName: string;
    branchName: string;
    product: any;
    branch: any;
}

export class ProductImportModel {
    quantity: number;
    expired: Date;
    branchId: string;
    productId: string;
}

export class ProductExportModel {
    quantity: number;
    productSegementId: string;
    branchId: string;
    productId: string;
}