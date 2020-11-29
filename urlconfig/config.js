const ipUrl = 'http://121.199.1.64:7001/default/'

const servicePath = {
  getArticleList: `${ipUrl}getArticleList`,
  getArticleById: `${ipUrl}getArticleById/`,
  getTypeInfo: `${ipUrl}getTypeInfo`,
  getListById: `${ipUrl}getListById/`,
  checkLogin: `${ipUrl}checkLogin`,
  getArticleListByPage: `${ipUrl}getArticleListByPage/`,
  putComment: `${ipUrl}putComment`,   
  getComments: `${ipUrl}getComments/`
}
export default servicePath
