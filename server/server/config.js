var config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 9000,
    //是否初始化数据
    session:{
        secrets: 'jackblog-secret',
        cookie:  {maxAge: 60000*5}
    },
    //用户角色种类
    userRoles: ['user', 'admin'],
    mongo: {
        uri: 'mongodb://localhost/jackblog-dev',
    },
    seedDB: true
};

module.exports = config;
