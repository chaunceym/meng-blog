const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = await this.app.mysql.get('blog_content')
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = { data: result }
  }

  async getArticleList() {
    const result = await this.app.mysql.query('select count(*) as total from article')
    this.ctx.body = { data: result[0].total }
  }
  async getArticleListByPage() {
    const { page } = this.ctx.params
    const sql = `
        SELECT article.id as id,
                article.title as title,
                article.introduce as introduce,
                article.view_count as view_count,
                article.isDraft as isDraft,
                FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
                type.typeName as typeName 
                FROM article LEFT JOIN type ON article.type_id = type.id 
                ORDER BY article.id DESC 
                LIMIT 10 OFFSET ${10 * (page - 1)}
        `
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }


  async getArticleById() {
    const id = this.ctx.params.id
    const sql = `SELECT article.id as id, article.title as title, article.introduce as introduce, article.article_content as article_content, FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime, article.view_count as view_count, type.typeName as typeName, type.id as typeId FROM article LEFT JOIN type ON article.type_id = type.id WHERE article.id=${id}`
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  async getListById() {
    const { id } = this.ctx.params
    const sql = `
    SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
    article.view_count as view_count ,
    type.typeName as typeName 
    FROM article LEFT JOIN type ON article.type_id = type.id 
    WHERE type_id=${id} AND article.isDraft = 0
    ORDER BY article.id DESC
    `
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }
}

module.exports = HomeController
