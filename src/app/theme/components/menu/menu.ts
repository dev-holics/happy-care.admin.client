import { Menu } from "./menu.model";

export const verticalMenuItems = [
    {
        label: 'Tổng quan',
        icon: 'pi pi-home',
        url: '/'
    },
    {
        label: 'Danh mục',
        items: [
            {
                label: 'Danh sách danh mục',
                url: '/categories'
            }
        ]
    },
    {
        label: 'Chi nhánh',
        items: [
            {
                label: 'Danh sách chi nhánh',
                url: '/branches'
            },
            {
                label: 'Sản phẩm của chi nhánh',
                url: '/products-of-branches'
            }
        ]
    },
    {
        label: 'Sản phẩm',
        items: [
            {
                label: 'Nguồn gốc',
                url: '/origins'
            },
            {
                label: 'Sản phẩm',
                url: '/products'
            },
            {
                label: 'Nhãn hiệu',
                url: '/brands'
            }
        ]
    },
    {
        label: 'Quản lý đơn hàng',
        items: [
            {
                label: 'Đơn hàng',
                url: '/orders'
            },
            {
                label: 'Trạng thái đơn hàng',
                url: '/order-statuses'
            }
        ]
    },
    {
        label: 'Quản lý hệ thống',
        items: [
            {
                label: 'Vai trò',
                url: '/roles'
            },
            {
                label: 'Quyền',
                url: '/permissions'
            },
            {
                label: 'Người dùng',
                url: '/users'
            }
        ]
    },
    {
        label: 'Kho hàng',
        items: [
            {
                label: 'Nhập kho',
                url: '/products/log'
            },
        ]
    }
];

export const horizontalMenuItems = [
    new Menu (1, 'Tổng quan', '/', null, 'pi pi-home', null, false, 0),
    new Menu (300, 'Danh mục', '/', null, null, null, true, 0),
    new Menu (302, 'Danh sách danh mục', null, '/categories', null, null, false, 300),

    new Menu (303, 'Chi nhánh', '/', null, null, null, true, 0),
    new Menu (305, 'Danh sách chi nhánh', null, '/branches', null, null, false, 303),
    new Menu (316, 'Sản phẩm của chi nhánh', null, '/products-of-branches', null, null, false, 303),

    new Menu (308, 'Sản phẩm', null, null, 'event', null, true, 0),
    new Menu (309, 'Nguồn gốc', null, '/origins', 'event', null, false, 308),
    new Menu (310, 'Sản phẩm', null, '/products', 'event', null, false, 308),
    new Menu (311, 'Nhãn hiệu', null, '/brands', 'event', null, false, 308),

    new Menu (306, 'Quản lý hệ thống', '/', null, null, null, true, 0),
    new Menu (307, 'Vai trò', null, '/roles', null, null, false, 306),
    new Menu (312, 'Quyền', null, '/permissions', null, null, false, 306),
    new Menu (313, 'Người dùng', null, '/users', null, null, false, 306),

    new Menu (314, 'Kho', '/', null , null, null, true, 0),
    new Menu (315, 'Nhập kho', null, '/productLog', null, null, false, 314),
];
