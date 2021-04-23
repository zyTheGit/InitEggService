'use strict';

const loginValidate = {
    account: [
        { required: true, message: '账号不能为空' },
    ],
    password: [
        { required: true, message: '密码不能为空' },
    ],
};

const queryAllValidate = {
    pageIndex: [
        { required: true, message: '页码不能为空' },
        { type: 'number', message: '页码格式需要是数字' },
    ],
    pageSize: [
        { required: true, message: '页面大小不能为空' },
        { type: 'string', message: '页面大小格式不正确' },
    ],
};

const addValidate = {
    account: [
        { required: true, message: '账号不能为空' },
        { type: 'string', message: '账号格式不正确' },
    ],
    password: [
        { required: true, message: '密码不能为空' },
    ],
}

const updateValidate = {
    id: [
        { required: true, message: 'id不能为空' },
        { type: 'string', message: 'id格式不正确' },
    ],
}


const deleteValidate = {
    account: [
        { required: true, message: '账号不能为空' },
        { type: 'string', message: '账号格式不正确' },
    ],
}


module.exports = {
    loginValidate,
    queryAllValidate,
    addValidate,
    updateValidate,
    deleteValidate
};