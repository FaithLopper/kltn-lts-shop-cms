import {
    STATUS_ACTIVE,
    STATUS_LOCK,
    STATUS_PENDING,
    GroupPermissonTypes,
} from './';

export const groupPermissionTypes = [
    { value: GroupPermissonTypes.ADMIN, label: 'Quản trị viên' },
    { value: GroupPermissonTypes.CUSTOMER, label: 'Khách hàng'}
]

export const commonStatus = [
    { value: STATUS_ACTIVE, label: 'Kích hoạt', color: 'green' },
    { value: STATUS_PENDING, label: 'Đang chờ', color: 'warning' },
    { value: STATUS_LOCK, label: 'Đang khóa', color: 'red' },
]

export const commonLanguages = [
    { value: 'vi', label: 'Việt Nam'},
    { value: 'en', label: 'English'},
    { value: 'de', label: 'German'},
]

export const commonKinds = [
    { value: 1, label: 'Tin tức'},
    { value: 2, label: 'Dịch vụ'},
]
export const commonProvince = [
    { value: 1, label: 'Tỉnh/ Thành Phố'},
    { value: 2, label: 'Huyện'},
    { value: 3, label: 'Xã'},

]


export const commonSex = [
    { value: 0, label: 'Nữ' },
    { value: 1, label: 'Nam' }
]

const GENDER_MALE = 1
const GENDER_FEMALE = 2
const GENDER_OTHER = 3

export const genders = [
    { value: GENDER_MALE, label: 'Nam' },
    { value: GENDER_FEMALE, label: 'Nữ' },
    { value: GENDER_OTHER, label: 'Khác' },
]

export const commonRatioImageSetting = [
    {
        value: 16/9,
        label: "16:9",
    },
    {
        value: 1/1,
        label: "1:1",
    },
    {
        value: 40/9,
        label: "40:9",
    },
]


export const ASPECT_CATEGORY_AVATAR = 16/9