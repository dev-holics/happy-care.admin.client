import { API_URL } from 'src/app/_config/env.config';

export const PUBLIC_URL = `${API_URL}/public`;
export const ADMIN_URL = `${API_URL}/admin`;

export const URL_CONFIG = Object.freeze({
	USER_URL: `${API_URL}/users`,

	// public url
    BRANCH_PUBLIC_URL: `${PUBLIC_URL}/branches`,
    BRAND_PUBLIC_URL: `${PUBLIC_URL}/trademarks`,
    CATEGORY_PUBLIC_URL: `${PUBLIC_URL}/categories`,
    CITY_PUBLIC_URL: `${PUBLIC_URL}/cities`,
    ORIGIN_PUBLIC_URL: `${PUBLIC_URL}/origins`,
    PRODUCT_PUBLIC_URL: `${PUBLIC_URL}/products`,

    // admin url
    BRANCH_ADMIN_URL: `${ADMIN_URL}/branches`,
    BRAND_ADMIN_URL: `${ADMIN_URL}/trademarks`,
    CATEGORY_ADMIN_URL: `${ADMIN_URL}/categories`,
    ORIGIN_ADMIN_URL: `${ADMIN_URL}/origins`,
    PERMISSION_ADMIN_URL: `${ADMIN_URL}/permissions`,
    PRODUCT_ADMIN_URL: `${ADMIN_URL}/products`,
    ROLE_ADMIN_URL: `${ADMIN_URL}/roles`,
});
