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
  const config = exports = {};
  config.session = {
    key: 'SESSION_ID', 
    maxAge: 72 * 3600 * 1000,  
    httpOnly: true,  
    encrypt: true,
    //sameSite: 'none',
    //secure: true
  }
  config.mysql = {
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'chauncey',
      // password
      password: 'Chauncey@520',
      // database
      database: 'blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593074060555_8103';

  // add your middleware config here
  config.middleware = [];

  config.multipart = {
    mode: 'file'
  };
	
  config.security = {     
    csrf: {     
       enable: false 
    },     
    domainWhiteList: ['http://mengxiangyu.top','http://mengxiangyu.top:3001','http://man.mengxiangyu.top','http://blog.mengxiangyu.top']  
  }

  config.cors = {
    // origin: '',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
}


