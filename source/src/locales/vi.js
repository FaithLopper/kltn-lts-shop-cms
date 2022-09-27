export default {
    translation: {
        toast: {
            titleSuccess: 'Thành công',
            titleError: 'Lỗi',
            titleWarning: 'Thông tin lỗi'
        }
    },
    masterLayout: {
        breadcrumbs: {
            home: 'Trang chủ',
        },
    },
    navSider: {
        'Account Management': 'Quản lý tài khoản',
        'Admin': 'Quản trị viên',
        'System': 'Hệ thống',
        'Role': 'Quyền',
        'Category': 'Danh mục',
        'News': 'Tin tức',
        'Province':'Tỉnh thành'
    },
    appHeader: {
        profile: 'Hồ sơ',
        logout: 'Đăng xuất',
    },
    constants: {
        Administrator: "Quản trị viên",
        Active: "Kích hoạt",
        Unactive: "Khóa",
        Lock: "Khóa",
        Delete: "Xóa",
        Service: 'Dịch vụ',
        Female: 'Nữ',
        Male: 'Nam',
        UndefinedSex: 'Đang cập nhật',
        OtherSex: 'Khác',
        Forbidden: 'Bị cấm',
        Pending: 'Đang chờ',
        Active: 'Hoạt động',
        Pause: 'Tạm dừng',
        Done: 'Hoàn thành',
        Cancel: 'Đã hủy',
        Calculated: 'Đã tính',
        yes: 'Có',
        no: 'Không',
        platinum: 'Bạch kim',
        silver: 'Bạc',
        gold: 'Vàng',
        diamond: 'Kim cương',
        NotDone: 'Chưa hoàn thành',
        Successfully:'Thành công',
        Failed:'Thất bại',
        successMessage: {
            copied: 'Đã sao chép',
        },
    },
    listBasePage: {
        update: 'Cập nhật',
        create: 'Tạo mới',
        success: 'Thành công',
        error: 'Lỗi',
        showSuccessMessage: ' {{ actionName, capitalize }} {{ objectName, lowercase }} thành công!',
        showErrorMessage: ' {{ actionName, capitalize }} {{ objectName, lowercase }} thất bại. Vui lòng thử lại!',
        showDeleteSuccessMessage: 'Xóa {{ objectName, lowercase }} thành công!',
        showDeleteErrorMessage: 'Xóa {{ objectName, lowercase }} thất bại. Vui lòng thử lại!',
        active: 'Hoạt động',
        lock: 'khóa',
        titleConfirm: 'Bạn có chắc muốn {{ actionName, lowercase }} {{ objectName, lowercase }} này?',
        okText: 'Có',
        cancleText: 'Không',
        titleActionCol: 'Hành động',
        titleStatusCol: 'Trạng thái',
    },
    // basicModal: {
    //     updateTitle: 'CẬP NHẬT {{ objectName, uppercase }}',
    //     createTitle: 'THÊM MỚI {{ objectName, uppercase }}',
    //     closeButton: 'Đóng',
    //     saveButton: 'Lưu',
    // },
    basicModal: {
        updateTitle: "CẬP NHẬT {{ objectName, uppercase }}",
        createTitle: "THÊM MỚI {{ objectName, uppercase }}",
        closeButton: "Đóng",
        saveButton: "Lưu",
      },
    basicSavePage:{
        saveButton:'Lưu',
        updateButton:'Lưu & cập nhật',
        cancelButton:'Huỷ',
        createMessage:'tạo mới',
        updateMessage:'cập nhật',
        okText:'Trở về danh sách',
        Continue:'Tiếp tục'
    },
    baseField: {
        select: 'chọn',
        enter: 'nhập',
        requiredMsg: 'Vui lòng {{ action, lowercase }} {{ fieldTitle, lowercase }}',
        imageTooLarge: 'Hình tải lên cần nhỏ hơn 500KB!',
    },
    fileUploadField: {
        clickToUpload: 'Nhấp vào để tải lên',
    },
    cropImageFiled: {
        uploading: 'Đang tải lên',
        upload: 'Tải lên',
    },
    richTextField: {
        limitFileSize: 'Dung lượng hình cần phải nhỏ hơn 512KB. Vui lòng tải lên dung lượng nhỏ hơn!',
    },
    textField: {
        maxLengthMsg: 'Số ký tự không thể nhiều hơn {{ var }}',
        minLengthMsg: 'Số ký tự không thể ít hơn {{ var }}',
        invalidEmailMsg: 'Định dạng email không hợp lệ',
    },
    searchForm: {
        searchButton: 'Tìm kiếm',
        clearButton: 'Làm mới',
    },
    notFound: {
        notFoundMsg: 'Trang bạn đang tìm kiếm không tồn tại',
        goBack: 'Quay lại',
    },
    ForbiddenListPage:{
        breadcrumbs: {
            currentPage: 'Bị cấm'
        },
        message: {
            forbiddenMessage: 'Bạn không có quyền truy cập'
        }
    },
    profilePage: {
        breadcrumbs: {
            currentPage: 'Hồ sơ'
        },
        form: {
            label: {
                avatar: 'Hình đại diện',
                username: 'Tài khoản',
                fullName: 'Họ và tên',
                phone: 'Số điện thoại',
                taxNumber: 'Mã số thuế',
                zipCode: 'Mã Zip',
                city: 'Thành phố',
                address: 'Địa chỉ',
                logo: 'Logo',
                oldPassword: 'Mật khẩu hiện tại',
                newPassword: 'Mật khẩu mới',
                confirmNewPassword: 'Xác nhận mật khẩu mới',
                organizeName: 'Tên đơn vị',
                organizeHotline: 'Đường dây nóng',
                province: 'Tỉnh',
                district: 'Quận/huyện',
                commune: 'Xã/phường',
                contactName: 'Tên liên lạc',
                contactTitle: 'Thông tin người liên lạc',
                Male: 'Nam',
                kind: 'Thể loại',
                identityNumber: 'Mã CMND',
                sex: 'Giới tính',
                birthday: 'Sinh nhật',
                placeOfIssue: 'Nơi cấp',
                dateOfIssue: 'Ngày cấp',
                departmentName: 'Phòng ban',
            },
            fieldSet: {
                profileInfo: 'Thông tin hồ sơ',
                accountInfo: 'Thông tin tài khoản',
                legalInfo: 'Thông tin pháp lý',
            },
            validationMessage: {
                fullNameRequire: 'Vui lòng nhập họ và tên',
                passwordRequire: 'Vui lòng nhập mật khẩu',
                passwordNotMatch: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            updateProfileFail: 'Cập nhật hồ sơ thất bại. Vui lòng thử lại!',
            updateProfileSuccess: 'Hồ sơ của bạn đã được cập nhật!',
        },
        button: {
            update: 'Cập nhật',
        }
    },
    userAdminListPage: {
        breadcrumbs: {
            currentPage: 'Quản trị viên',
        },
        objectName: 'quản trị viên',
        searchPlaceHolder: {
            username: 'Tài khoản đăng nhập',
            fullName: 'Họ và tên',
            status: 'Chọn trạng thái',
            organize: 'Chọn đơn vị',
        },
        table: {
            avatar: '#',
            username: 'Tên đăng nhập',
            fullName: 'Họ và tên',
            phone: 'Số điện thoại',
            createdDate: 'Ngày tạo',
            organize: 'Đơn vị',
        },
        form: {
            label: {
                newPassword:'Tạo mật khẩu mới',
                password:'Mật khẩu',
                avatar: 'Ảnh đại diện',
                username: 'Tên đăng nhập',
                fullName: 'Họ và tên',
                password: 'Mật khẩu',
                confirmPassword: 'Xác nhận mật khẩu',
                newPassword: 'Mật khẩu mới',
                confirmNewPassword: 'Xác nhận mật khẩu mới',
                groupPermission: 'Nhóm quyền',
                phone: 'Số điện thoại',
                language: 'Ngôn ngữ',
                status: 'Trạng thái',
                organization: 'Đơn vị',
                organizationPlaceHolder: 'Hãy chọn đơn vị',
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    userAdminUpdatePage: {
        breadcrumbs: {
            // currentPage: '{{ var }} quản trị viên',
            parentPage:'Quản trị viên',
        },
        objectName: 'quản trị viên',
        form: {
            label: {
                newPassword:'Tạo mật khẩu mới',
                password:'Mật khẩu',
                avatar: 'Ảnh đại diện',
                username: 'Tên đăng nhập',
                fullName: 'Họ và tên',
                password: 'Mật khẩu',
                confirmPassword: 'Xác nhận mật khẩu',
                newPassword: 'Mật khẩu mới',
                confirmNewPassword: 'Xác nhận mật khẩu mới',
                groupPermission: 'Nhóm quyền',
                phone: 'Số điện thoại',
                language: 'Ngôn ngữ',
                status: 'Trạng thái',
                organization: 'Đơn vị',
                organizationPlaceHolder: 'Hãy chọn đơn vị',
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
    },
    categoryListPage: {
        breadcrumbs: {
            currentPage: 'Danh mục',
            currentPage: 'Danh mục',
        },
        objectName: 'danh mục',
        searchPlaceHolder: {
            name: 'Tên',
            status: 'Chọn trạng thái',
        },
        table: {
            name: 'Tên',

        },
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                categoryName: 'Tên danh mục',
                categoryDescription: 'Mô tả',
                status: 'Trạng thái',
            },
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    groupPermissionListPage: {
        breadcrumbs: {
            currentPage: 'Nhóm quyền',
        },
        objectName: 'Nhóm',
        table: {
            name: 'Tên',
            description: 'Mô tả',
        },
        searchPlaceholder: {
            name: 'Tên',
        },
        form: {
            label: {
                name: 'Tên',
                value: 'Giá trị',
                description: 'Mô tả',
                status: 'Trạng thái',
                kind: 'Loại',
                groupPermission: 'Nhóm quyền',
            },
            validationMessage: {
               permission: 'Vui lòng chọn nhóm quyền',
            }
        },
    },
    groupPermissionUpdatePage: {
        breadcrumbs: {
            parentPage: 'Nhóm quyền',
            currentPage: 'Cập nhật Nhóm',
        },
        objectName: 'Cập nhật nhóm',
        form: {
            label: {
                name: 'Tên',
                value: 'Giá trị',
                description: 'Mô tả',
                status: 'Trạng thái',
                kind: 'Loại',
                groupPermission: 'Nhóm quyền',
            },
            validationMessage: {
               permission: 'Vui lòng chọn nhóm quyền',
            }
        },
    },
    SettingDetailsListPage: {
        breadcrumbs: {
            currentPage: 'Cài đặt'
        },
    },
    adminNewsListPage: {
        breadcrumbs: {
            currentPage: 'Tin tức'
        },
        objectName: 'tin tức',
        newsPreviewTitle: 'BẢN XEM THỬ',
        searchPlaceHolder: {
            title: 'Tiêu đề',
            status: 'Chọn trạng thái',
            category: 'Chọn thể loại',
        },
        table: {
            avatar: '#',
            title: 'Tiêu đề',
            createdDate: 'Ngày tạo',
            ordering: 'Thứ tự',
            category: 'Thể loại',
            pinTop: 'Ghim',
        },
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                title: 'Tiêu đề',
                category: 'Thể loại',
                status: 'Trạng thái',
                ordering: 'Thứ tự',
                description: 'Mô tả',
                content: 'Nội dung',
                pinTop: 'Ghim lên đầu',
                banner: 'Ảnh bìa',
            },
            validationMessage: {
                avatarRequire: 'Hãy chọn ảnh đại diện',
                bannerRequire: 'Hãy chọn banner',
            }
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    provinceListPage: {
        breadcrumbs: {
          currentPage: "Tỉnh thành",
        },
        objectName: "Tỉnh thành",
        searchPlaceHolder: {
          province: "Tên tỉnh thành",
          status: "Chọn trạng thái",
          organize: "Chọn đơn vị",
        },
        table: {
          provinceName: "Tên tỉnh",
          
        },
    
        form: {
          label: {
            parentId: "ID tỉnh",
            status: "Trạng thái",
            provinceName: "Tên tỉnh",
            currentName:"Tên tỉnh"
          },
          validationMessage: {
            phoneLengthRequire: "Hãy nhập số",
            comparePassword: "Mật khẩu bạn nhập không khớp!",
          },
        },
        message: {
          // updateProfileFail: 'Your profile failed. Please try again!',
          // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: "Tạo {{ var, lowercase }} mới",
      },
      districtListPage: {
        breadcrumbs: {
          currentPage: "Quận/ Huyện",
          parentPage: "Tỉnh thành",
        },
        objectName: "Quận/ huyện",
        searchPlaceHolder: {
          province: "Tên quận huyện",
          status: "Chọn trạng thái",
          organize: "Chọn đơn vị",
        },
        table: {
          provinceName: "Tên quận huyện",
        },
    
        form: {
          label: {
            parentName: "Tên tỉnh",
            provinceName: "Tên Quận/ Huyện",
            currentName:"Tên Quận/ Huyện"
          },
          validationMessage: {
            phoneLengthRequire: "Hãy nhập số",
            comparePassword: "Mật khẩu bạn nhập không khớp!",
          },
        },
        message: {
          // updateProfileFail: 'Your profile failed. Please try again!',
          // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: "Tạo {{ var, lowercase }} mới",
      },
      communeListPage: {
        breadcrumbs: {
          currentPage: "Xã",
          parentPage: "Tỉnh thành",
        },
        objectName: "Xã Phường",
        searchPlaceHolder: {
          province: "Tên Xã/ Phường",
          status: "Chọn trạng thái",
          organize: "Chọn đơn vị",
        },
        table: {
          provinceName: "Tên Xã/ Phường",
        },
    
        form: {
          label: {
            currentName: "Tên Xã Phường",
            parentName: "Tên Quận/ Huyện",
            provinceName: "Tên tỉnh",
          },
          validationMessage: {
            phoneLengthRequire: "Hãy nhập số",
            comparePassword: "Mật khẩu bạn nhập không khớp!",
          },
        },
        message: {
          // updateProfileFail: 'Your profile failed. Please try again!',
          // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: "Tạo {{ var, lowercase }} mới",
      },
}
