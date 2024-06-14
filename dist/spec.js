var spec =
{
    swagger: "2.0",    // Phiên bản Swagger UI
    info: {
        description:
            "Các thông tin mô tả về dự án và API",
        version: "1.0",    // Phiên bản API
        title: "Biên bản bàn giao"
    },
    host: "",    // Server và port deploy API
    // basePath: "/api/v1",       // Đường dẫn tới API
    // tags: [    // Danh sách các nhóm API: admin, users, images,...
    //     {
    //         name: "Biên bản bàn giao",                                   // Tên nhóm API
    //         description: "Danh sách",    // Mô tả về nhóm API
    //     }
    // ],
    schemes: ["https"],    // Sử dụng scheme gì? HTTP, HTTPS?
    paths: {
        "/getListEntityByUser": {    // Đường dẫn. Kết hợp với host và basePath sẽ thành localhost:3000/api/v1/admin/
            post: {
                tags: ["Tài sản cá nhân"],
                summary: "Danh sách, Tìm kiếm TSCN",
                description: "<ul>lstMerStatus:<li>1-Tài sản đang báo mất chưa xử lý xong, </li><li>2-Tài sản đang báo hỏng chưa xử lý xong, </li><li>3-Tài sản đang sử dụng </br> </li>lstEntityType<li> 0-Tài sản mạng lưới, </li><li>1-Tài sản khác</li></ul>",
                operationId: "getListMyAssets",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "employeeId",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Mã nhân viên"
                    },
                    {
                        "in": "formData",
                        "name": "keyword",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "keyword"
                    },
                    {
                        "in": "formData",
                        "name": "lstMerStatus",
                        "required": "true",
                        "schema": {
                            "type": "string",
                        },
                        "description": "trạng thái",
                    },
                    {
                        "in": "formData",
                        "name": "lstEntityType",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Loại bàn giao"
                    },
                    {
                        "in": "formData",
                        "name": "size",
                        "required": false,
                        "schema": {
                            "type": "number"
                        },
                        "description": "page"
                    },
                    {
                        "in": "formData",
                        "name": "pageSize",
                        "required": false,
                        "schema": {
                            "type": "number"
                        },
                        "description": "page size"
                    }
                ],
                responses: {
                    200: {
                        description: "Lấy dữ liệu thành công",
                        schema: {
                            $ref: "#/definitions/assetsList"
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"
                        }
                    }
                },
                security: [

                ]
            }
        },
        "/rejectAssetManager": {
            post: {
                tags: ["Tài sản cá nhân"],
                summary: "Huỷ báo mất/hỏng",
                description: "truyền đúng type đã báo, nếu type=1: báo mất, type=2: báo hỏng",
                operationId: "CancelReports",
                consumes: ["multipart/form-data", "body"],    // Loại dữ liệu gửi đi
                produces: ["application/json"],       // Loại dữ liệu trả về
                parameters: [               // Các tham số
                    {
                        "in": "formData",
                        "name": "merEntityId",
                        "required": true,
                        "schema": {
                            "type": "number"
                        },
                        "description": "Id của tài sản"
                    },
                    {
                        "in": "formData",
                        "name": "type",
                        "required": true,
                        "schema": {
                            "type": "number"
                        },
                        "description": "Loại báo cáo"
                    },
                    {
                        "in": "body",      // Tham số được gửi lên từ form
                        "name": "body (cho dev)",    // Tên tham số
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "",
                        "schema": {
                            $ref: "#/definitions/rejectBody"           // Dữ liệu trả về là đói tượng admin (tham chiếu với phần definitions ở cuối)
                        }
                    },
                ],
                responses: {
                    200: {                                     // Mã trả về 200
                        description: "Lấy dữ liệu thành công",    // Mô tả kết quả trả về
                        schema: {
                            $ref: "#/definitions/rejectResponse"           // Dữ liệu trả về là đói tượng admin (tham chiếu với phần definitions ở cuối)
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/rejectResponse"           // Dữ liệu trả về là đói tượng admin (tham chiếu với phần definitions ở cuối)
                        }
                    }
                },
                security: [

                ]
            }
        },
        "/updateStatusEntity": {
            post: {
                tags: ["Tài sản cá nhân"],
                summary: "Báo mất/hỏng",
                description: "truyền đúng type đã báo, nếu type=1: báo mất, type=2: báo hỏng",
                operationId: "reportsAssets",
                consumes: ["body", "multipart/form-data"],    // Loại dữ liệu gửi đi
                produces: ["application/json"],       // Loại dữ liệu trả về
                parameters: [
                    {
                        "in": "formData",
                        "name": "dateOn",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        },
                        "description": "ngày báo hỏng/mất"
                    },
                    {
                        "in": "formData",
                        "name": "brokenDescription",
                        "required": true,
                        "schema": {
                            "type": "string",
                        },
                        "description": "mô tả lỗi"
                    },
                    {
                        "in": "formData",
                        "name": "count",
                        "required": true,
                        "schema": {
                            "type": "string",
                        },
                        "description": "số lượng"
                    },
                    {
                        "in": "formData",
                        "name": "merEntityId",
                        "required": true,
                        "schema": {
                            "type": "string",
                        },
                        "description": "Id tài sản"
                    },
                    {
                        "in": "formData",
                        "name": "qcDept",
                        "required": true,
                        "schema": {
                            "type": "string",
                        },
                        "description": "phòng/ban"
                    },
                    {
                        "in": "formData",
                        "name": "reason",
                        "required": true,
                        "schema": {
                            "type": "string",
                        },
                        "description": "Lý do hỏng/mất"
                    },
                    {
                        "in": "formData",
                        "name": "type",
                        "required": true,
                        "schema": {
                            "type": "string",
                        },
                        "description": "loại báo cáo"
                    },
                    {
                        "in": "body",      // Tham số được gửi lên từ form
                        "name": "body (cho dev)",    // Tên tham số
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "",
                        "schema": {
                            $ref: "#/definitions/reportBody"           // Dữ liệu trả về là đói tượng admin (tham chiếu với phần definitions ở cuối)
                        }
                    },
                ],
                responses: {
                    200: {                                     // Mã trả về 200
                        description: "Lấy dữ liệu thành công",    // Mô tả kết quả trả về
                        schema: {
                            $ref: "#/definitions/rejectResponse"           // Dữ liệu trả về là đói tượng admin (tham chiếu với phần definitions ở cuối)
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"           // Dữ liệu trả về là đói tượng admin (tham chiếu với phần definitions ở cuối)
                        }
                    }
                },
                security: [

                ]
            }
        },
        "/getListEntityByUser(dùng chung)": {
            post: {
                tags: ["Tài sản cá nhân"],
                summary: "Bộ lọc TSCN",
                description: "",
                operationId: "advancedSearchRecords",
                consumes: ["body"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "",
                        "schema": {
                            $ref: "#/definitions/recordsBody"
                        }
                    },
                ],
                responses: {
                    200: {
                        description: "Lấy dữ liệu thành công",
                        schema: {
                            $ref: "#/definitions/assetsList"
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"
                        }
                    }
                },
                security: [

                ]
            },
        },

        "/getListHandoverByUser": {
            post: {
                tags: ["Biên bản bàn giao"],
                summary: "Danh sách BBBG",
                description: "",
                operationId: "getListRecords",
                consumes: ["body", "multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "employeeId",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Mã nhân viên",
                    },
                    {
                        "in": "formData",
                        "name": "keyword",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "keyword",
                    },
                    {
                        "in": "formData",
                        "name": "lstMerStatus",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Trạng thái",
                    },
                    {
                        "in": "formData",
                        "name": "lstEntityType",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Loại tài sản",
                    },
                    {
                        "in": "formData",
                        "name": "page",
                        "required": false,
                        "schema": {
                            "type": "string"
                        },
                        "description": "page",
                    },
                    {
                        "in": "formData",
                        "name": "pageSize",
                        "required": false,
                        "schema": {
                            "type": "string"
                        },
                        "description": "pageSize",
                    },
                    {
                        "in": "body",
                        "name": "body (cho dev)",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "",
                        "schema": {
                            $ref: "#/definitions/recordsBody"
                        }
                    },
                ],
                responses: {
                    200: {
                        description: "Lấy dữ liệu thành công",
                        schema: {
                            $ref: "#/definitions/recordsResponse"
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"
                        }
                    }
                },
                security: [

                ]
            },
        },
        "/getListHandoverByUser(dùngchung)": {
            post: {
                tags: ["Biên bản bàn giao"],
                summary: "Tìm kiếm BBBG",
                description: "",
                operationId: "searchRecords",
                consumes: ["body", "multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "employeeId",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Mã nhân viên",
                    },
                    {
                        "in": "formData",
                        "name": "keyword",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "keyword",
                    },
                    {
                        "in": "formData",
                        "name": "status",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Trạng thái",
                    },
                    {
                        "in": "formData",
                        "name": "type",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Loại tài sản",
                    },
                    {
                        "in": "formData",
                        "name": "fromDate",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Từ ngày",
                    },
                    {
                        "in": "formData",
                        "name": "toDate",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Đến ngày",
                    },
                    {
                        "in": "formData",
                        "name": "isConfirm",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Đã xác nhận",
                    },
                    {
                        "in": "formData",
                        "name": "page",
                        "required": false,
                        "schema": {
                            "type": "string"
                        },
                        "description": "page",
                    },
                    {
                        "in": "formData",
                        "name": "pageSize",
                        "required": false,
                        "schema": {
                            "type": "string"
                        },
                        "description": "pageSize",
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "",
                        "schema": {
                            $ref: "#/definitions/recordsSearchBody"
                        }
                    },
                ],
                responses: {
                    200: {
                        description: "Lấy dữ liệu thành công",
                        schema: {
                            $ref: "#/definitions/recordsResponse"
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"
                        }
                    }
                },
                security: [

                ]
            },
        },
        "/getDetailHandover": {
            post: {
                tags: ["Biên bản bàn giao"],
                summary: "Xem chi tiết BBBG",
                description: "",
                operationId: "detailsRecords",
                consumes: ["body", "multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "minuteHandOverId",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Mã BBBG",
                    },
                    {
                        "in": "formData",
                        "name": "type",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Loại BBBG",
                    },
                    {
                        "in": "formData",
                        "name": "page",
                        "required": false,
                        "schema": {
                            "type": "string"
                        },
                        "description": "page",
                    },
                    {
                        "in": "formData",
                        "name": "pageSize",
                        "required": false,
                        "schema": {
                            "type": "string"
                        },
                        "description": "pageSize",
                    },
                    {
                        "in": "body",
                        "name": "body (cho dev)",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "",
                        "schema": {
                            $ref: "#/definitions/recordsDetailBody"
                        }
                    },
                ],
                responses: {
                    200: {
                        description: "Lấy dữ liệu thành công",
                        schema: {
                            $ref: "#/definitions/recordsDetailResponse"
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"
                        }
                    }
                },
                security: [

                ]
            },
        },
        "/createPersonalHandoverMinutes": {
            post: {
                tags: ["Biên bản bàn giao"],
                summary: "Tạo mới BBBG",
                description: "",
                operationId: "createRecords",
                consumes: ["body", "multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "merEntityId",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Id tài sản",
                    },
                    {
                        "in": "formData",
                        "name": "minuteHandoverGiverCode",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Mã nhân viên giao",
                    },
                    {
                        "in": "formData",
                        "name": "minuteHandoverReceiverCode",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Mã nhân viên nhận",
                    },
                    {
                        "in": "formData",
                        "name": "description",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "mô tả",
                    },
                    {
                        "in": "formData",
                        "name": "minuteHandoverDate",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Ngày giao",
                    },
                    {
                        "in": "formData",
                        "name": "listMerBO",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "listMerBO",
                    },
                    {
                        "in": "body",
                        "name": "body (cho dev)",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "",
                        "schema": {
                            $ref: "#/definitions/recordsDetailBody"
                        }
                    },
                ],
                responses: {
                    200: {
                        description: "Lấy dữ liệu thành công",
                        schema: {
                            $ref: "#/definitions/rejectResponse"
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"
                        }
                    }
                },
                security: [

                ]
            },
        },
        "/getQCDepartment": {    // Đường dẫn. Kết hợp với host và basePath sẽ thành localhost:3000/api/v1/admin/
            post: {
                tags: ["Tài sản cá nhân"],
                summary: "Danh sách, Tìm kiếm phòng/ban",
                description: "",
                operationId: "getListDept",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "assetDeptCodeOrName",
                        "required": "false",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Mã hoặc tên phòng ban"
                    },
                ],
                responses: {
                    200: {
                        description: "Lấy dữ liệu thành công",
                        schema: {
                            $ref: "#/definitions/deptResponse"
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"
                        }
                    }
                },
                security: [

                ]
            }
        },

        "/confirmMinuteHandover": {
            post: {
                tags: ["Biên bản bàn giao"],
                summary: "Phê duyệt, từ chối, huỷ BBBG",
                description: "<b>status</b>: 1- Xác nhận || 2- Từ chối",
                operationId: "cancelRecords",
                consumes: ["body", "multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "minuteHandoverId",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Id của BBBG",
                    },
                    {
                        "in": "formData",
                        "name": "status",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Trạng thái",
                    },
                    {
                        "in": "formData",
                        "name": "acceptDescription",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "description": "Mô tả",
                    },

                    // {
                    //     "in": "body",
                    //     "name": "body (cho dev)",
                    //     "required": "true",
                    //     "schema": {
                    //         "type": "string"
                    //     },
                    //     "description": "",
                    //     "schema": {
                    //         $ref: "#/definitions/recordsDetailBody"
                    //     }
                    // },
                ],
                responses: {
                    200: {
                        description: "Lấy dữ liệu thành công",
                        schema: {
                            $ref: "#/definitions/rejectResponse"
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"
                        }
                    }
                },
                security: [

                ]
            },
        },
        "/deleteHandoverMinutes/": {
            post: {
                tags: ["Biên bản bàn giao"],
                summary: "Xoá BBBG",
                description: "<b>Loại BBBG: </b> 1/ Bàn giao 2 nhân viên || 2/ Bàn giao khai thác TSML",
                operationId: "deleteRecords",
                consumes: ["body", "multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "formData",
                        "name": "merHandoverId",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Id của BBBG",
                    },
                    {
                        "in": "formData",
                        "name": "type",
                        "required": "true",
                        "schema": {
                            "type": "number"
                        },
                        "description": "Loại biên bản",
                    },
                    // {
                    //     "in": "body",
                    //     "name": "body (cho dev)",
                    //     "required": "true",
                    //     "schema": {
                    //         "type": "string"
                    //     },
                    //     "description": "",
                    //     "schema": {
                    //         $ref: "#/definitions/recordsDetailBody"
                    //     }
                    // },
                ],
                responses: {
                    200: {
                        description: "Lấy dữ liệu thành công",
                        schema: {
                            $ref: "#/definitions/rejectResponse"
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"
                        }
                    }
                },
                security: [

                ]
            },
        },
        "https://viettelfamily.com/vtf-mobile/mobile-apis/vtf-backend/api/v1/employee/search?keyword=": {
            get: {
                tags: ["Danh sách, tìm kiếm nhân viên"],
                summary: "danh sách, tìm kiếm",
                description: "",
                operationId: "getEmployee",
                consumes: ["params", "multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "params",
                        "name": "keyword",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "Tìm kiếm theo tên, mã",
                    },
                    // {
                    //     "in": "body",
                    //     "name": "body (cho dev)",
                    //     "required": "true",
                    //     "schema": {
                    //         "type": "string"
                    //     },
                    //     "description": "",
                    //     "schema": {
                    //         $ref: "#/definitions/recordsDetailBody"
                    //     }
                    // },
                ],
                responses: {
                    200: {
                        description: "Lấy dữ liệu thành công",
                        schema: {
                            $ref: "#/definitions/employeeResponse"
                        }
                    },
                    500: {
                        description: "Lấy dữ liệu thất bại",
                        schema: {
                            $ref: "#/definitions/assetsError"
                        }
                    }
                },
                security: [

                ]
            },
        },


    },
    securityDefinitions: {    // Thông tin về api key sử dụng để thực hiện request
        api_key: {
            type: "apiKey",      // Thuộc loại api key xác thực
            name: "api_key",     // Tên trường chứa api key xác thực
            in: "header",        // API key được để trong phần header của request
        }
    },
    definitions: {
        assetsList: {
            type: "object",
            properties: {
                msgCode: {
                    type: "number"
                },
                msg: {
                    type: "string"
                },
                data: {
                    type: "object",
                    properties: {
                        start: {
                            type: "number"
                        },
                        size: {
                            type: "number"
                        },
                        total: {
                            type: "number"
                        },
                        lstMerEntityId: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    merEntityId: {
                                        type: "string"
                                    },
                                    count: {
                                        type: "string"
                                    },
                                    uom: {
                                        type: "string"
                                    },
                                    catMerchandiseName: {
                                        type: "string"
                                    },
                                    code: {
                                        type: "string"
                                    },
                                    serialNumber: {
                                        type: "string" // Note: Changed to string for consistency
                                    },
                                    statusID: {
                                        type: "string"
                                    },
                                    statusName: {
                                        type: "string"
                                    },
                                    statusID2: {
                                        type: "string"
                                    },
                                    statusName2: {
                                        type: "string"
                                    },
                                    entityType: {
                                        type: "number"
                                    },
                                    companyName: {
                                        type: "string"
                                    },
                                    usedDate: {
                                        type: "string"
                                    },
                                    assetPrice: {
                                        type: "number"
                                    },
                                    lifetime: {
                                        type: "string"
                                    },
                                    isDevice: {
                                        type: "number"
                                    },
                                    remainValue: {
                                        type: "number"
                                    },
                                    dateLost: {
                                        type: "string"
                                    },
                                    causeLost: {
                                        type: "string"
                                    },
                                    privateManagerName: {
                                        type: "string"
                                    },
                                    checkCancel: {
                                        type: "number"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        assetsError: {
            type: "object",
            properties: {
                msgCode: {
                    type: "number"
                },
                msg: {
                    type: "string"
                },
                msgDetail: {
                    type: "object",
                    properties: {
                        msgNo: {
                            type: "number"
                        },
                        msgType: {
                            type: "string"
                        },
                        message: {
                            type: "string"
                        },
                    }
                }
            }
        },
        rejectResponse: {
            type: "object",
            properties: {
                msgCode: { type: "string" },
                msg: { type: "string" }
            }
        },
        rejectBody: {
            type: "object",
            properties: {
                merEntityId: {
                    type: "string",
                },
                type: {
                    type: "number"
                }
            }
        },
        reportBody: {
            type: "object",
            properties: {
                dateOn: {
                    "type": "string",
                    "format": "date-time"
                },
                lstMerEntity: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            brokenDescription: {
                                type: "string"
                            },
                            count: {
                                type: "number"
                            },
                            merEntityId: {
                                type: "string"
                            },
                            qcDept: {
                                type: "string"
                            },
                            reason: {
                                type: "string" // Note: Changed to string for consistency
                            },
                            type: {
                                type: "number"
                            },
                        }
                    }
                }
            }
        },
        recordsBody: {
            type: "object",
            properties: {
                employeeId: {
                    type: "string"
                },
                keyword: {
                    type: "string"
                },
                lstMerStatus: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            status: {
                                type: "string"
                            },
                        }
                    }
                },
                lstEntityType: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            entityType: {
                                type: "string"
                            },
                        }
                    }
                }
            }
        },
        recordsResponse: {
            type: "object",
            properties: {
                msgCode: { type: 'number' },
                msg: { type: "string" },
                data: {
                    type: "object",
                    properties: {
                        start: { type: "number" },
                        size: { type: "number" },
                        total: { type: "number" },
                        "lstHandoverID": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "minuteHandOverCode": {
                                        "type": "string"
                                    },
                                    "minuteHandOverId": {
                                        "type": "string"
                                    },
                                    "minuteHandoverDate": {
                                        "type": "string"
                                    },
                                    "minuteHandoverReceiverId": {
                                        "type": "number"
                                    },
                                    "minuteHandoverReceiverName": {
                                        "type": "string"
                                    },
                                    "minuteHandoverReceiverCode": {
                                        "type": "number"
                                    },
                                    "receiverPositionName": {
                                        "type": "string"
                                    },
                                    "minuteHandoverGiverId": {
                                        "type": "number"
                                    },
                                    "minuteHandoverGiverName": {
                                        "type": "string"
                                    },
                                    "minuteHandoverGiverCode": {
                                        "type": "number"
                                    },
                                    "giverPositionName": {
                                        "type": "string"
                                    },
                                    "status": {
                                        "type": "string"
                                    },
                                    "type": {
                                        "type": "number"
                                    }
                                }
                            }
                        }
                    }
                }

            }
        },
        recordsSearchBody: {
            type: "object",
            properties: {
                "employeeId": {
                    "type": "string"
                },
                "status": {
                    "type": "number"
                },
                "page": {
                    "type": "number"
                },
                "pageSize": {
                    "type": "number"
                },
                "type": {
                    "type": "number"
                },
                "keyword": {
                    "type": "string"
                },
                "fromDate": {
                    "type": "string",
                    "pattern": "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/(19|20)\\d\\d$"
                },
                "toDate": {
                    "type": "string",
                    "pattern": "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/(19|20)\\d\\d$"
                },
                "isConfirm": {
                    "type": "number"
                }
            }
        },
        recordsDetailBody: {
            type: 'object',
            properties: {
                minuteHandOverId: {
                    type: "string"
                },
                type: {
                    type: "number"
                },
                page: {
                    type: "number"
                },
                pageSize: {
                    type: "number"
                }
            }
        },
        recordsDetailResponse: {
            "type": "object",
            "properties": {
                "msgCode": {
                    "type": "number"
                },
                "msg": {
                    "type": "string"
                },
                "data": {
                    "type": "object",
                    "properties": {
                        "start": {
                            "type": "number"
                        },
                        "size": {
                            "type": "number"
                        },
                        "total": {
                            "type": "number"
                        },
                        "lstMerEntityId": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "MER_ENTITY_ID": {
                                        "type": "string"
                                    },
                                    "statusId": {
                                        "type": "string"
                                    },
                                    "catMerchandiseName": {
                                        "type": "string"
                                    },
                                    "count": {
                                        "type": "string"
                                    },
                                    "serialNumber": {
                                        "type": "string"
                                    },
                                    "companyName": {
                                        "type": "string"
                                    },
                                    "statusName": {
                                        "type": "string"
                                    },
                                    "usedDate": {
                                        "type": "string"
                                    },
                                    "lifeTime": {
                                        "type": "string"
                                    },
                                    "assetPrice": {
                                        "type": "number"
                                    },
                                    "remainValue": {
                                        "type": "number"
                                    }
                                }
                            }
                        }
                    }
                },
                "success": {
                    "type": "boolean"
                }
            }
        },
        deptResponse: {
            type: "object",
            properties: {
                assetDeptCode: {
                    type: "string"
                },
                assetDeptName: {
                    type: "string"
                }
            }
        },
        employeeResponse: {
            type: "object",
            properties: {
                listMember: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            "employeeId": { "type": "number" },
                            "forceUpdateAppGroups": { "type": "string" },
                            "provinceOfBirthId": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "provinceOfOriginId": { "type": "number" },
                            "ethnicId": { "type": "number" },
                            "religionId": { "type": "number" },
                            "organizationId": { "type": "number" },
                            "invalidedSoldierLevelId": { "type": "number" },
                            "sickSoldierLevelId": { "type": "number" },
                            "cultureLevelId": { "type": "number" },
                            "isActive": { "type": "boolean" },
                            "createdTime": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "modifiedTime": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "createdBy": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "modifiedBy": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "empTypeId": { "type": "number" },
                            "positionId": { "type": "number" },
                            "soldierLevelId": { "type": "number" },
                            "status": { "type": "number" },
                            "otherOrgId": { "type": "number" },
                            "insuranceNumber": { "type": "number" },
                            "educationGradeId": { "type": "number" },
                            "educationSubjectId": { "type": "number" },
                            "educationTypeId": { "type": "number" },
                            "graduatedRankId": { "type": "number" },
                            "yearOfIssue": { "type": "string" },
                            "placeOfIssueId": { "type": "number" },
                            "taxNumberUpdatedTime": { "type": "number" },
                            "oldId": { "type": "number" },
                            "viettelStartDate": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "recruitTypeId": { "type": "number" },
                            "taxCodeDate": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "taxManageOrgId": { "type": "number" },
                            "taxManageOrg": { "type": "string" },
                            "isPolicy": { "type": "boolean" },
                            "referencePeople": { "type": "string" },
                            "referenceRank": { "type": "string" },
                            "referenceDepartment": { "type": "string" },
                            "referenceRelationship": { "type": "string" },
                            "seniorMilestone": { "type": "string" },
                            "workingAbroadMonth": { "type": "number" },
                            "injuryPercent": { "type": "number" },
                            "injuryDecideNumber": { "type": "number" },
                            "policyType": { "type": "number" },
                            "policyYear": { "type": "number" },
                            "policyLevelId": { "type": "number" },
                            "policyPlace": { "type": "string" },
                            "saleCode": { "type": "number" },
                            "saleAddress": { "type": "string" },
                            "saleStatus": { "type": "number" },
                            "smartSim": { "type": "number" },
                            "saleSerial": { "type": "number" },
                            "channelType": { "type": "number" },
                            "channelName": { "type": "string" },
                            "channelCode": { "type": "number" },
                            "saleModifiedTime": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "collectCallCode": { "type": "number" },
                            "collectCallAddress": { "type": "string" },
                            "collectCallStatus": { "type": "number" },
                            "smei": { "type": "number" },
                            "collectCallModifiedTime": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "managementCommand": { "type": "string" },
                            "politicalTheorist": { "type": "string" },
                            "technicalExpertiseProfession": { "type": "string" },
                            "degreeId": { "type": "number" },
                            "wentAbroad": { "type": "number" },
                            "demobilizationDate": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "reasonOfDemobilization": { "type": "string" },
                            "taxNumber": { "type": "number" },
                            "childGrade": { "type": "number" },
                            "otherInfo": { "type": "string" },
                            "nationId": { "type": "number" },
                            "familyTypeId": { "type": "string" },
                            "politicalFamilyTypeId": { "type": "number" },
                            "permanentProvinceId": { "type": "number" },
                            "currentProvinceId": { "type": "number" },
                            "employeeCode": { "type": "string" },
                            "email": { "type": "string" },
                            "aliasName": { "type": "string" },
                            "lastName": { "type": "string" },
                            "firstName": { "type": "string" },
                            "middleName": { "type": "string" },
                            "fullName": { "type": "string" },
                            "imagePath": { "type": "string" },
                            "dateOfBirth": { "type": "number" },
                            "placeOfBirth": { "type": "string" },
                            "gender": { "type": "number" },
                            "origin": { "type": "number" },
                            "maritalStatus": { "type": "number" },
                            "personalIdNumber": { "type": "number" },
                            "personalIdIssuedDate": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "personalIdIssuedPlace": { "type": "string" },
                            "passportIssueDate": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "passportNumber": { "type": "number" },
                            "permanentAddress": { "type": "string" },
                            "currentAddress": { "type": "string" },
                            "phoneNumber": { "type": "string" },
                            "mobileNumber": { "type": "string" },
                            "mobileNumber2": { "type": "string" },
                            "mobileNumber3": { "type": "string" },
                            "fax": { "type": "string" },
                            "partyNumber": { "type": "number" },
                            "partyAdmissionDate": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "partyOfficialAdmissionDate": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "partyAdmissionPlace": { "type": "string" },
                            "unionNumber": { "type": "number" },
                            "unionAdmissionDate": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "unionAdmissionPlace": { "type": "string" },
                            "soldierNumber": { "type": "number" },
                            "enlistedDate": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "isInvalidedSoldier": { "type": "boolean" },
                            "isSickSoldier": { "type": "boolean" },
                            "positionName": { "type": "string" },
                            "organizationName": { "type": "string" },
                            "birthYear": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "versionInfos": { "type": "number" }
                        }
                    }
                }
            }
        }
    }
};
