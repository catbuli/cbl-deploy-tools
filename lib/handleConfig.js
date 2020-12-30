/*
 * @Description 配置文件检测
 * @Author Catbuli
 * @Date 2020-12-26 21:10:22
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 21:10:34
 */
'use strict';

const fs = require('fs');
const { msgError, msgInfo } = require('./consoleMsg');
const { resolvePath } = require('./utils');


/**
 * @Description 配置样例
 * @param {string} msg
 * @return {*}
 */
function configCase(msg) {
    msgError(msg);
    msgInfo(`[
    {
        "name":"name",
        "host": "127.0.0.1",
        "port":"22",
        "username": "root",
        "password": "root",
        "build":"npm run build",
        "localDist":"./dist",
        "targetDist":"/var/www/html/dist"
    }
]
            `);
}

module.exports = function handleConfig() {

    let configPath = resolvePath("./", "cbl-dt-config.json");
    if (!fs.existsSync(configPath)) {
        configCase("没有找到配置文件!请在项目目录创建cbl-dt-config.json");
        process.exit(1);
    }

    let _CONFIG = fs.readFileSync(configPath);
    try {
        _CONFIG = JSON.parse(_CONFIG);

        _CONFIG.forEach((item, index) => {
            let { name, host, port, username, password, build, localDist, targetDist } = item;

            if (!name || !host || !port || !username || !password || !build || !localDist || !targetDist) {
                configCase("请检查配置文件!");
                process.exit(1);
            }
            // item.targetDist = handlePath(targetDist);
        })
    } catch (error) {

    }

    return _CONFIG;
}