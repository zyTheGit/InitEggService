const Service = require('egg').Service;
const uuidv1 = require('uuid/v1');
class UserService extends Service {
    async findAll({ pageSize = 10, pageIndex = 0 }) {
        const users = await this.app.mysql.select('user', {
            limit: pageSize, // 返回数据量
            offset: pageIndex, // 数据偏移量
        });
        return { code: 0, data: users, msg: "操作成功" };
    }
    // 查询单个用户信息
    async find(account) {
        const user = await this.app.mysql.get('user', { account });
        if (!user) {
            return null;
        }
        return user
    }

    // 新增用户
    async add({ account, password }) {
        let user = await this.find(account);
        if (user) {
            return { code: -1, msg: "操作员重复" };
        }
        const id = uuidv1();
        const result = await this.app.mysql.insert('user', { account, password, id });
        return { code: 0, msg: "操作成功" };
    }

    // 修改用户信息
    async update({ id, account, password, role }) {
        let row = { account, password }, result = null;
        const user = await this.find(account);
        if (!user) {
            result = await this.add({ account, password });
        } else {
            result = await this.app.mysql.update('user', {
                account: account || user.account, password: password || user.password, role: role || user.role
            }, { where: { id } });
            if (result.affectedRows === 1) {
                return { code: 0, msg: "操作成功" };
            }
            return { code: -1, msg: "操作失败" };
        }
        return result;
    }

    // 删除用户
    async delete(account) {
        const user = await this.find(account);
        if (!user) {
            return { code: -1, msg: "删除用户不存在" };
        }
        const result = await this.app.mysql.delete('user', {
            account,
        });
        return { code: 0, msg: "操作成功" };
    }
}

module.exports = UserService;