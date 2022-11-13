import { API_URL } from 'src/app/_config/env.config';

export const URL_CONFIG = Object.freeze({
	USER_URL: `${API_URL}/users`,

	// public url
	PRODUCT_PUBLIC_URL: `${API_URL}/public/products`,
    BRAND_PUBLIC_URL: `${API_URL}/public/trademarks`,
    ORIGIN_PUBLIC_URL: `${API_URL}/public/origins`,

    // admin url
    PRODUCT_ADMIN_URL: `${API_URL}/admin/products`,
    BRAND_ADMIN_URL: `${API_URL}/admin/trademarks`,
    ORIGIN_ADMIN_URL: `${API_URL}/admin/origins`,
});