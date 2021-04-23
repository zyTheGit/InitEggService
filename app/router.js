'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { queryAll, login, add, delete: del, update } = controller.user;
  router.get('/', controller.home.index);
  router.get('/user/login', login);
  router.get('/user/add', add);
  router.get('/user/update', update);
  router.get('/user/delete', del);
  router.get('/user/queryAll', queryAll);
};
