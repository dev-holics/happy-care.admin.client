import { Category } from "src/app/_models/category";
import { Image } from "src/app/_models/image.model";
import { OriginModel } from "../../origins/models/origin.model";
import { BrandModel } from "../../brands/models/brand.model";
export class ProductModel {
    id: number;
    code: string;
    name: string;  
    description: string;
    packingSpec: string;
    price: number;
    element: string;
    uses: string;
    subject: string;
    guide: string;
    preserve: string;
    trademarkId: string;
    trademark: BrandModel | null;
    originId: string;
    origin: OriginModel | null;
    categoryId: string;
    category: Category | null;
    images: Array<Image>;
}