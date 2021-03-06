module.exports = app => {
  const { router, controller } = app
  router.get('/default/index', controller.default.home.index)
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo)
  router.get('/default/getListById/:id', controller.default.home.getListById)
  router.get('/default/getArticleList', controller.default.home.getArticleList)
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
  router.get('/default/getArticleListByPage/:page', controller.default.home.getArticleListByPage)
  router.post('/default/putComment', controller.default.home.putComment)   
  router.get('/default/getComments/:id', controller.default.home.getComments)
}
