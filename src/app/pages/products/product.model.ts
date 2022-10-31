import { Image } from "src/app/_models/image.model";
export class Product {
    id: number;
    code: string;
    name: string;  
    description: string;
    packingSpec: string;
    price: number;
    trademarkId: string;
    originId: string;
    categoryId: string;
    images: Array<Image>;
}