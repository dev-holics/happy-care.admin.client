export const EVENT_KEY = Object.freeze({
	LOGOUT: 'logout',
});

export const DEFAULT_PAGINATION = Object.freeze({
	PAGE: 1,
	LIMIT: 15,
});

export const ROLE = Object.freeze({
	SUPER_ADMIN: 'Super admin',
	ADMIN: 'Admin',
	PHARMACIST: 'Pharmacist',
	CUSTOMER: 'Customer',
});

export const SCROLL_DEFAULT_CONFIG = Object.freeze({
	DELAY: 250
});

export const PAYMENT_TYPE_OPTIONS = [
  {
    id: 'ALL',
    value: 'Tất cả',
  },
  {
    id: 'CASH',
    value: 'Tiền mặt',
  },
  {
    id: 'TRANSFER',
    value: 'Chuyển khoản',
  },
]

export const STATUS = [
  {
    id: 'ALL',
    value: 'Tất cả',
  },
  {
    id: 'PROCESSING',
    value: 'Đang xử lý',
  },
  {
    id: 'CONFIRMED',
    value: 'Đã xác nhận',
  },
  {
    id: 'DELIVERING',
    value: 'Đang vận chuyển',
  },
  {
    id: 'DELIVERED',
    value: 'Đã giao',
  },
  {
    id: 'RECEIVED',
    value: 'Đã nhận',
  },
  {
    id: 'CANCELED',
    value: 'Đã huỷ',
  },
]
