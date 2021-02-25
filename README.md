# cbl-deploy-tools

一个前端自动化部署工具。

## 效果预览

全手动

![预览](https://raw.githubusercontent.com/catbuli/picture/master/cbl-deploy-tools/cbl-deploy-tools-example.gif)

全自动

![预览](https://raw.githubusercontent.com/catbuli/picture/master/cbl-deploy-tools/cbl-deploy-tools-auto-example.gif)

## 安装

```shell
npm i -g cbl-deploy-tools
```

## 执行

进入需要部署的前端项目目录

```shell
cbl-dt
```

## 注意事项

1. 暂时没有防呆设计，建议生产环境前先进行测试。
2. 因为存在解压缩打包文件，暂时需要服务器支持 unzip （之后会调整这部分逻辑）

## cbl-dt-config.json

- `name`: 项目名称
- `host`: 服务器host
- `port`: 端口
- `username`: 服务器用户名
- `password`: 服务器密码
- `build`: 打包命令
- `localDist`: 打包文件路径
- `targetDist`: 目标服务器部署路径
- `auto`: [1|0]{2} 第一位:是否自动备份 第二位:是否自动覆盖 **该字段只在格式正确时生效，如配置0则会进行询问**

```json
[
    {
        "name": "test",
        "host": "127.0.0.1",
        "port": "22",
        "username": "root",
        "password": "root",
        "build": "npm run build",
        "localDist": "./dist",
        "targetDist": "/var/www/html/xxxx",
        "auto":"11"
    }
]
```

### 目录结构

```docs
.
├── bin
│   └── cbl-deploy-tools.js
├── index.js
├── lib
│   ├── consoleMsg.js
│   ├── deploy.js
│   ├── handleConfig.js
│   ├── projectBuild.js
│   ├── selectServer.js
│   └── utils.js
├── package.json
├── package-lock.json
├── README.md
└── tests
    ├── cbl-dt-config.json
    ├── index.test.js
    └── testFunction.js
```
