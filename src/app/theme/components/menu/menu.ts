import { Menu } from "./menu.model";

export const verticalMenuItems = [
    new Menu (1, 'Tổng quan', '/', null, 'pi pi-home', null, false, 0),
    new Menu (300, 'Danh mục', '/', null, null, null, true, 0),
    new Menu (302, 'Danh sách danh mục', null, '/categories', null, null, false, 300),

    new Menu (303, 'Chi nhánh', '/', null, null, null, true, 0),
    new Menu (305, 'Danh sách chi nhánh', null, '/branches', null, null, false, 303),

    new Menu (308, 'Sản phẩm', null, null, 'event', null, true, 0),
    new Menu (309, 'Nguồn gốc', null, '/origins', 'event', null, false, 308),
    new Menu (310, 'Sản phẩm', null, '/products', 'event', null, false, 308),
    new Menu (310, 'Nhãn hiệu', null, '/brands', 'event', null, false, 308),

    new Menu (306, 'Quản lý hệ thống', '/', null, null, null, true, 0),
    new Menu (307, 'Vai trò', null, '/roles', null, null, false, 306),
];

export const horizontalMenuItems = [
];
