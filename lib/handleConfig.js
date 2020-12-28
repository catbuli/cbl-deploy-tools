/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-26 21:10:22
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 21:10:34
 */
'use strict';

const fs = require('fs');
const { msgError, msgInfo } = require('./consoleMsg');
const { resolvePath, handlePath } = require('./utils');

function handleConfig() {

    let configPath = resolvePath("./", "cbl-dt-config.json");
    if (!fs.existsSync(configPath)) {
        msgError("没有找到配置文件!请在项目目录下创建cbl-dt-config.json");
        msgInfo(`[
    {
        "name":"serve1",
        "type":"local",
        "host": "47.106.90.253",
        "port":"22",
        "username": "root", 
        "password": "zhangyifei0918..",
        "build":"npm run build",
        "localDist":"./dist",
        "targetDist":"/var/www/html/test"
    }
]
                `);
        process.exit(1);
    }

    let _CONFIG = fs.readFileSync(configPath);
    try {
        _CONFIG = JSON.parse(_CONFIG);

        _CONFIG.forEach((item, index) => {
            let { host, port, username, password, targetDist } = item;

            if (!host || !port || !username || !password || !targetDist || !localDist || !backup) process.exit(1);

            // item.targetDist = handlePath(targetDist);msgSuccess("服务器连接成功!")
        })
    } catch (error) {

    }

    return _CONFIG;
}

module.exports = handleConfig;