import { Menu } from "./menu.model";

export const verticalMenuItems = [
    new Menu (1, 'Tổng quan', '/', null, 'fa-solid fa-house', null, false, 0),
    new Menu (2, 'Sản phẩm', '/products', null, 'fa-solid fa-capsules', null, false, 0),
    new Menu (3, 'Danh mục', '/categories', null, 'fa-solid fa-chart-gantt', null, false, 0),
    new Menu (4, 'Nguồn gốc', '/origins', null, 'fa-solid fa-location-dot', null, false, 0),
    new Menu (5, 'Nhãn hiệu', '/brands', null, 'fa-solid fa-globe', null, false, 0),
    new Menu (6, 'Hệ thống', '/', null, 'fa-solid fa-gear', null, true, 0),
    new Menu (7, 'Phân quyền', '/roles', null, 'fa-solid fa-user', null, false, 6),
    new Menu (8, 'Chi nhánh', '/branches', null, 'fa-solid fa-code-branch', null, false, 6)
];

export const horizontalMenuItems = [
];
