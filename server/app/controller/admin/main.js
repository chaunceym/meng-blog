const Controller = require('egg').Controller
const fs = require('fs')
const path = require('path')

class MainController extends Controller {
    async index() {
        this.ctx.body = 'admin manager index';
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

    async deleteArticle() {
        const { id } = this.ctx.params
        const result = await this.app.mysql.delete('article', { id })
        if (result.affectedRows === 1) {
            this.ctx.body = { message: '删除成功' }
        } else {
            this.ctx.body = { message: '删除失败' }
        }
    }
    async uploadImage() {
        const { dataUrl } = this.ctx.request.body
        const base64Data = dataUrl.split(',');
        const fileType = base64Data[0].split(';')[0].split('/')[1]
        const fileData = base64Data[1]
        const dataBuffer = new Buffer(fileData, 'base64');
        const pathName = `blog${Date.now()}.${fileType}`
        fs.writeFileSync(path.join('C:/Users/86183/Desktop/meng-blog/server/app/public', pathName), dataBuffer);
        const onLineUrl = `http://127.0.0.1:7001/public/${pathName}`
        const result = await this.app.mysql.insert('image', { path: onLineUrl })
        if (result.affectedRows === 1) {
            this.ctx.body = { message: '添加成功', data: onLineUrl }
        } else {
            this.ctx.body = { message: '添加失败' }
        }
    }
    async getImagesPath() {
        const result = await this.app.mysql.query('select path,id from image  ORDER BY id DESC ')
        console.log(result)
        if (result.length) {
            const pathArray = result.map(item => {
                return { id: item.id, path: item.path }
            })
            this.ctx.body = { message: '获取成功', data: pathArray }
        } else {
            this.ctx.body = { message: '没有数据' }
        }
    }
    async deleteImage() {
        const { id } = this.ctx.params
        const result = await this.app.mysql.delete('image', { id })
        if (result.affectedRows === 1) {
            this.ctx.body = { message: '删除成功' }
        } else {
            this.ctx.body = { message: '删除失败' }
        }
    }
}
module.exports = MainController