const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const result = await this.app.mysql.get('blog_content')
    console.log(result)
    this.ctx.body = 'dddd'
  }
}

module.exports = HomeController
