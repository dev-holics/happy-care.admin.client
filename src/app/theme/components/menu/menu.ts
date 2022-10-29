import { Menu } from "./menu.model";

export const verticalMenuItems = [
    new Menu (1, 'Tổng quan', '/', null, 'pi pi-home', null, false, 0),
    new Menu (2, 'Sản phẩm', null, null, 'event', null, true, 0),
    new Menu (2, 'Nguồn gốc', '/origins', null, 'event', null, false, 2),
];

export const horizontalMenuItems = [
];