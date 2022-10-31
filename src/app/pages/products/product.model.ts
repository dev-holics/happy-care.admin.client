import { Category } from "src/app/_models/category";
import { Image } from "src/app/_models/image.model";
import { Origin } from "../origins/origin.model";
import { Trademark } from "../trademarks/trademark.model";
export class Product {
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
    trademark: Trademark;
    originId: string;
    origin: Origin;
    categoryId: string;
    category: Category;
    images: Array<Image>;
}