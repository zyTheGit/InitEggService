'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {

  async login() {
    const ctx = this.ctx;
    const rule = this.app.rules.user;
    const { account, password } = ctx.query;
    const validateResult = await ctx.validate(rule.loginValidate, ctx.query);
    if (!validateResult) return;
    const user = await ctx.service.user.find(account);
    if (!user) {
      ctx.body = { code: -1, msg: '账号不存在' };
    } else {
      if (user.password != password) {
        ctx.body = { code: -1, msg: '密码错误' };
      } else {
        ctx.body = { code: 0, msg: '登陆成功' };
      }
    }
  }

  // 获取操作员列表
  async queryAll() {
    const ctx = this.ctx;
    const rule = this.app.rules.user;
    const { pageIndex, pageSize } = ctx.query;
    const validateResult = await ctx.validate(rule.queryAllValidate, ctx.query);
    if (!validateResult) return;
    const { code, data, msg } = await ctx.service.user.findAll({ pageIndex, pageSize });
    ctx.body = { code, data, msg };
  }

  // 操作员新增
  async add() {
    const ctx = this.ctx;
    const rule = this.app.rules.user;
    const { account, password } = ctx.query;
    const validateResult = await ctx.validate(rule.addValidate, ctx.query);
    if (!validateResult) return;
    const { code, data, msg } = await ctx.service.user.add({ account, password });
    ctx.body = { code, data, msg };
  }

  async update() {
    const ctx = this.ctx;
    const rule = this.app.rules.user;
    const { id, password, account, role } = ctx.query;
    const validateResult = await ctx.validate(rule.updateValidate, ctx.query);
    if (!validateResult) return;
    const { code, data, msg } = await ctx.service.user.update({ id, password, account, role });
    ctx.body = { code, data, msg };
  }

  async delete() {
    const ctx = this.ctx;
    const rule = this.app.rules.user;
    const { account } = ctx.query;
    const validateResult = await ctx.validate(rule.deleteValidate, ctx.query);
    if (!validateResult) return;
    const { code, data, msg } = await ctx.service.user.delete(account);

    ctx.body = { code, data, msg };
  }
}
module.exports = UserController;