import { Menu } from "./menu.model";

export const verticalMenuItems = [
    new Menu (1, 'Dashboard', '/', null, 'pi pi-home', null, false, 0),
    new Menu (2, 'Products', null, null, 'fa-solid fa-capsules', null, true, 0),
    new Menu (3, 'List', '/products', null, 'pi pi-bars', null, false, 2),
    new Menu (4, 'Brands', '/brands', null, 'fa-brands fa-bandcamp', null, false, 2),
    new Menu (5, 'Origins', '/origins', null, 'fa-solid fa-globe', null, false, 2)
];

export const horizontalMenuItems = [
];
