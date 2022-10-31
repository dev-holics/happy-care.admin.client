import { Origin } from "../origins/origin.model";

export class Trademark {
    id: number;
    name: string;
    originId: string;
    origin: Origin | null;
}
