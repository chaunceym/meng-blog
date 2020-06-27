const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = await this.app.mysql.get('blog_content')
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data: result}
  }

  async getArticleList() {
    const sql = `SELECT article.id as id, article.title as title,
      article.introduce as introduce,
      FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
      article.view_count as view_count,
      type.typeName as typeName 
      FROM article LEFT JOIN type ON article.type_id = type.id
      ORDER BY article.id DESC `
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data: results}
  }

  async getArticleById() {
    const id = this.ctx.params.id
    const sql = `SELECT article.id as id, article.title as title, article.introduce as introduce, article.article_content as article_content, FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime, article.view_count as view_count, type.typeName as typeName, type.id as typeId FROM article LEFT JOIN type ON article.type_id = type.id WHERE article.id=${id}`
    const result = await this.app.mysql.query(sql)
    console.log('result', result)
    this.ctx.body = {data: result}
  }

  async getListById() {
    const {id} = this.ctx.params
    const sql = `
    SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
    article.view_count as view_count ,
    type.typeName as typeName 
    FROM article LEFT JOIN type ON article.type_id = type.id 
    WHERE type_id=${id} ORDER BY article.id DESC
    `
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data: result}
  }
}

module.exports = HomeController