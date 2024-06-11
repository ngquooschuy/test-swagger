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
                description: "",
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
                summary: "Huỷ báo mất/hỏng/không sử dụng",
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
                summary: "Báo mất/hỏng/không sử dụng",
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
        }
    }
};
