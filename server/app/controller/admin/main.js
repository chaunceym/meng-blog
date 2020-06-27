const Controller = require('egg').Controller

class MainController extends Controller {
    async index() {
        this.ctx.body = 'admin manager index'
    }
    async checkLogin() {
        const { username, password } = this.ctx.request.body
        const sql = ` SELECT username FROM admin_user WHERE username = '${username}' AND password = '${password}'`
        const result = await this.app.mysql.query(sql)
        if (result.length > 0) {
            const openId = new Date().getTime()
            this.ctx.session.openId = { openId }
            this.ctx.body = { message: '登录成功', openId }
        } else {
            this.ctx.body = { message: '登录失败' }
        }
    }
    async getTypeInfo() {
        const result = await this.app.mysql.select('type')
        this.ctx.body = { data: result }
    }
    async getArticleInfo() {
        const { id } = this.ctx.params
        const sql = `
        SELECT article.id as id,
                article.title as title,
                article.introduce as introduce,
                article.view_count as view_count,
                FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
                article.article_content as article_content,
                article.type_id as typeId,
                article.isDraft as isDraft
                FROM article LEFT JOIN type ON article.type_id = type.id 
                WHERE article.id = ${id}
        `
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }
    async addArticle() {
        const newArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article', newArticle)
        const { affectedRows, insertId } = result
        if (affectedRows === 1) {
            this.ctx.body = {
                message: '添加成功',
                insertId
            }
        } else {
            this.ctx.body = {
                message: '添加失败',
            }
        }
    }
    async updateArticle() {
        const newArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article', newArticle)
        if (result.affectedRows === 1) {
            this.ctx.body = {
                message: '修改成功'
            }
        }
    }
    async getArticleList() {
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
        `
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }

    async deleteArticle() {
        const { id } = this.ctx.params
        const result = await this.app.mysql.delete('article', { id })
        if (result.affectedRows === 1) {
            this.ctx.body = { message: '删除成功' }
        } else {
            this.ctx.body = { message: '删除失败' }
        }
    }
}
module.exports = MainController