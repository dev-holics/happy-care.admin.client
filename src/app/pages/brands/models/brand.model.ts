import { OriginModel } from "../../origins/models/origin.model";

export class BrandModel {
    id: number;
    name: string;
    originId: string;
    origin: OriginModel | null;
}
