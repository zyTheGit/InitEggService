/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    validatePlus: {
      resolveError(ctx, errors) {
        if (errors.length) {
          ctx.type = 'json';
          ctx.status = 400;
          ctx.body = {
            code: -1,
            msg: errors,
          };
        }
      }
    }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618788116967_4007';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {

    'mysql': {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123',
        // 数据库名
        database: 'real_estate',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};