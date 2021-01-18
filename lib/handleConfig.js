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
const { resolvePath, except, configExample, isset } = require('./utils');


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
        "targetDist":"/var/www/html/dist",
        "auto": "111"
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

        _CONFIG.forEach((item) => {
            let exceptResult = except(Object.keys(item), Object.keys(configExample[0]))
            let issetResult = isset(item);
            let flag = new RegExp(/^[0,1]{3}$/);
            if (exceptResult.length) {
                configCase(`${exceptResult} 参数缺失请检查配置文件!`);
                process.exit(1);
            }
            if (issetResult.length) {
                configCase(`${issetResult} 参数不能为空!`);
                process.exit(1);
            }
            if (!flag.test(item.auto)) {
                configCase(`auto 参数不符合要求!`);
                process.exit(1);
            }
        })
    } catch (error) {
        msgError(error);
    }

    return _CONFIG;
}