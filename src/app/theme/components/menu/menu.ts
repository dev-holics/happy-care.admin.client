import { Menu } from "./menu.model";

export const verticalMenuItems = [
    new Menu (1, 'Dashboard', '/', null, 'pi pi-home', null, false, 0),
    new Menu (2, 'Products', null, null, 'event', null, true, 0),
    new Menu (3, 'Brands', '/brands', null, 'event', null, false, 2)
];

export const horizontalMenuItems = [
];
