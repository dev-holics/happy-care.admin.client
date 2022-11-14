import { Menu } from "./menu.model";

export const verticalMenuItems = [
    new Menu (1, 'Tổng quan', '/', null, 'fa-solid fa-house', null, false, 0),
    new Menu (2, 'Sản phẩm', '/products', null, 'fa-solid fa-capsules', null, false, 0),
    new Menu (3, 'Danh mục', '/categories', null, 'fa-solid fa-chart-gantt', null, false, 0),
    new Menu (4, 'Nguồn gốc', '/origins', null, 'fa-solid fa-location-dot', null, false, 0),
    new Menu (5, 'Nhãn hiệu', '/brands', null, 'fa-solid fa-globe', null, false, 0),
    new Menu (6, 'Kho', '/', null , 'fa-solid fa-warehouse', null, true, 0),
    new Menu (7, 'Nhập kho', '/productLog', null, 'fa-solid fa-file-import', null, false, 6),
    new Menu (10, 'Hệ thống', '/', null, 'fa-solid fa-gear', null, true, 0),
    new Menu (11, 'Phân quyền', '/roles', null, null, null, false, 10),
    new Menu (12, 'Chi nhánh', '/branches', null, 'fa-solid fa-code-branch', null, false, 10),
    new Menu (13, 'Quyền', '/permissions', null, 'fa-solid fa-person-circle-question', null, false, 10),
    new Menu (14, 'Người dùng', '/users', null, 'fa-solid fa-user', null, false, 10),
];

export const horizontalMenuItems = [
];
