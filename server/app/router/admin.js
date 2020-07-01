module.exports = app => {
    const { router, controller } = app
    const adminauth = app.middleware.adminauth()
    router.get('/admin/index', controller.admin.main.index)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)
    router.get('/admin/getArticleInfo/:id', adminauth, controller.admin.main.getArticleInfo)
    router.post('/admin/updateArticle/:id', adminauth, controller.admin.main.updateArticle)
    router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList)
    router.get('/admin/deleteArticle/:id', adminauth, controller.admin.main.deleteArticle)
    router.post('/admin/uploadImage', controller.admin.main.uploadImage)
    router.get('/admin/getImagesPath', controller.admin.main.getImagesPath)
    router.get('/admin/deleteImage/:id', controller.admin.main.deleteImage)
    router.get('/admin/getArticleListByPage/:page', controller.admin.main.getArticleListByPage)
}