# cbl-deploy-tools

一个前端自动化部署工具，还在开发中

## 效果预览

![预览](https://catbuli.oss-cn-beijing.aliyuncs.com/cbl-deploy-tools/cbl-deploy-tools-example.gif?Expires=1610532900&OSSAccessKeyId=TMP.3KdEMcVHQ6tS48g7nU6ptnDTNnDk2mKab2YzG5S6Lqd1sogyTBk4oVv9LvV3hRGNNAMdBBYk6nRoMWnBJjxAJ7TPbxmeZC&Signature=y66u45mptL7A%2FSuzluD2IUq7Je4%3D)

## 安装

```shell
npm i -g cbl-deploy-tools //还没发包 再等等
```

## 执行

进入需要部署的前端项目目录

```shell
cbl-dt
```

## cbl-dt-config.json

- `name`: 项目名称
- `host`: 服务器host
- `port`: 端口
- `username`: 服务器用户名
- `password`: 服务器密码
- `build`: 打包命令
- `localDist`: 打包文件路径
- `targetDist`: 目标服务器部署路径

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
        "targetDist": "/var/www/html/xxxx"
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
