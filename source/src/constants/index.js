const AppConstants = {
    apiRootUrl: process.env.REACT_APP_API,
    apiRootMasterUrl: process.env.REACT_APP_API_MASTER,
    contentRootUrl: `${process.env.REACT_APP_API}/v1/file/download`,
    langKey: 'vi'
};

const StorageKeys = {
    userData: 'iservice-user-data'
}

const LayoutConfigs = {
    NAV_WIDTH_EXPANDED: 230,
    NAV_WIDTH_COLLAPSED: 80
}

const UserTypes = {
    ADMIN: 1,
    CUSTOMER: 2,
    EMPLOYEE: 3,
}

const GroupPermissonTypes = {
    ADMIN: 1,
    CUSTOMER: 2,
    EMPLOYEE: 3,
}

const UploadFileTypes = {
    AVATAR: 'AVATAR',
    LOGO: 'LOGO',
    DOCUMENT: 'DOCUMENT',
}

const ProvinceKinds = {
    province: {
        name: 'LOCATION_KIND_PROVINCE',
        level: 1,
        text: 'Province'
    },
    district: {
        name: 'LOCATION_KIND_DISTRICT',
        level: 2,
        text: 'District'
    },
    commune: {
        name: 'LOCATION_KIND_WARD',
        level: 3,
        text: 'Commune'
    }
}

const CurrentcyPositions = {
    FRONT: 0,
    BACK: 1,
}

export const LIMIT_IMAGE_SIZE = 512000;

// Pagination config
export const DEFAULT_TABLE_ITEM_SIZE = 10;
export const DATE_FORMAT_DISPLAY = 'DD/MM/YYYY';
export const DATE_FORMAT_VALUE = 'DD/MM/YYYY';
export const TIME_FORMAT_DISPLAY = 'HH:mm';

// Common status
export const COMMON_STATUS = 0;
export const STATUS_PENDING = 0;
export const STATUS_ACTIVE = 1;
export const STATUS_LOCK = -1;
export const STATUS_DELETE = -2;

// Order status
export const ORDER_STATUS = 1;
export const ORDER_STATUS_NEW = 1;
export const ORDER_STATUS_CHECKOUT = 2;
export const ORDER_STATUS_PAID = 3;
export const ORDER_STATUS_FAILED = 4;
export const ORDER_STATUS_DELIVERED = 5;
export const ORDER_STATUS_RETURNED = 6;
export const ORDER_STATUS_COMPLETED= 7;

const errorCodes = {
    /**
     * General error code
     */
    "ERROR-GENERAL-000": { msg: "GENERAL_ERROR_UNAUTHORIZED" },
    "ERROR-GENERAL-001": { msg: "GENERAL_ERROR_NOT_FOUND" },
    "ERROR-GENERAL-002": { msg: "GENERAL_ERROR_BAD_REQUEST" },
    "ERROR-GENERAL-003": { msg: "GENERAL_ERROR_LOGIN_FAILED" },
    "ERROR-GENERAL-004": { msg: "GENERAL_ERROR_NOT_MATCH" },
    "ERROR-GENERAL-005": { msg: "GENERAL_ERROR_WRONG_HASH" },
    "ERROR-GENERAL-006": { msg: "GENERAL_ERROR_LOCKED" },
    "ERROR-GENERAL-007": { msg: "GENERAL_ERROR_INVALID" },
    /**
     * Category error code
    */
   "ERROR-CATEGORY-000": { msg: "CATEGORY_ERROR_UNAUTHORIZED" },
   "ERROR-CATEGORY-001": { msg: "CATEGORY_ERROR_NOT_FOUND" },
   /**
    * Group error code
   */
    "ERROR-GROUP-000": { msg: "GROUP_ERROR_UNAUTHORIZED" },
    "ERROR-GROUP-001": { msg: "GROUP_ERROR_NOT_FOUND" },
    "ERROR-GROUP-002": { msg: "GROUP_ERROR_EXIST" },
    "ERROR-GROUP-003": { msg: "Nhóm quyền đang được sử dụng cho tài khoản nào đó" },
    /**
     * Permission error code
    */
    "ERROR-PERMISSION-000": { msg: "PERMISSION_ERROR_UNAUTHORIZED" },
    "ERROR-PERMISSION-001": { msg: "PERMISSION_ERROR_NOT_FOUND" },
    /**
     * News error code
    */
    "ERROR-NEWS-000": { msg: "NEWS_ERROR_UNAUTHORIZED" },
    "ERROR-NEWS-001": { msg: "NEWS_ERROR_NOT_FOUND" },
    /**
     * Location error code
    */
    "ERROR-LOCATION-000": { msg: "LOCATION_ERROR_NOTFOUND" },
    "ERROR-LOCATION-001": { msg: "LOCATION_ERROR_INVALID" },
    "ERROR-LOCATION-002": { msg: "LOCATION_ERROR_INVALID_PARENT" },
    /**
     * Rank error code
    */
    "ERROR-RANK-000": { msg: "RANK_ERROR_NOT_FOUND" },
    "ERROR-RANK-001": { msg: "RANK_ERROR_DUPLICATE_NAME" },
    /**
     * Product category error code
    */
   "PRODUCT-CATEGORY-ERROR-000": { msg: "PRODUCT_CATEGORY_ERROR_UNAUTHORIZED" },
   "PRODUCT-CATEGORY-ERROR-001": { msg: "PRODUCT_CATEGORY_ERROR_EXISTED" },
   "PRODUCT-CATEGORY-ERROR-002": { msg: "PRODUCT_CATEGORY_ERROR_NOT_FOUND" },
   /**
    * Store error code
   */
    "STORE-ERROR-000": { msg: "STORE_ERROR_UNAUTHORIZED" },
    "STORE-ERROR-001": { msg: "STORE_ERROR_NOT_FOUND" },
    /**
     * Variant template error code
    */
    "VARIANT-TEMPLATE-ERROR-000": { msg: "VARIANT_TEMPLATE_NOT_FOUND" },
    /**
     * Variant error code
    */
    "VARIANT-ERROR-000": { msg: "VARIANT_NOT_FOUND" },
    /**
     * Variant config error code
    */
    "VARIANT-CONFIG-ERROR-000": { msg: "VARIANT_CONFIG_NOT_FOUND" },
    /**
     * Product error code
    */
    "PRODUCT-ERROR-000": { msg: "PRODUCT_NOT_FOUND" },
    /**
     * Product config error code
    */
    "PRODUCT-CONFIG-ERROR-000": { msg: "PRODUCT_CONFIG_NOT_FOUND" },
    /**
     * Product variant error code
    */
    "PRODUCT-VARIANT-ERROR-000": { msg: "PRODUCT_VARIANT_NOT_FOUND" },
    /**
     * Tag error code
    */
    "TAG-ERROR-000": { msg: "TAG_EXISTED" },
    "TAG-ERROR-001": { msg: "TAG_NOT_FOUND" },
    /**
     * Order Error
    */
    "ORDER-ERROR-000": { msg: "ORDER_NOT_FOUND" },
    "ORDER-ERROR-001": { msg: "ORDER_PRODUCT_CONFIG_IS_REQUIRED" },
    "ORDER-ERROR-002": { msg: "ORDER_PRODUCT_VARIANT_INVALID" },
    "ORDER-ERROR-003": { msg: "ORDER_STATUS_INVALID" },
    "ORDER-ERROR-004": { msg: "ORDER_STATUS_NOT_FOUND" },
    /**
     * Tenant Error
    */
    "TENANT-ERROR-000": { msg: "TENANT_ERROR_CREATE" },
    "TENANT-ERROR-001": { msg: "TENANT_ERROR_NOT_FOUND" },
    "TENANT-ERROR-002": { msg: "TENANT_ERROR_EXISTED" },
    "TENANT-ERROR-003": { msg: "TENANT_ERROR_INACTIVE" },
    "TENANT-ERROR-004": { msg: "TENANT_ERROR_CREATING" },
}

export {
    AppConstants,
    StorageKeys,
    LayoutConfigs,
    UserTypes,
    GroupPermissonTypes,
    UploadFileTypes,
    ProvinceKinds,
    CurrentcyPositions,
    errorCodes,
};
