/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-26 21:10:22
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 21:10:34
 */
'use strict';

const fs = require('fs');
const { resolvePath, handlePath } = require('./utils');

function handleConfig() {

    let configPath = resolvePath("./", "cbl-dt-config.json");
    if (!fs.existsSync(configPath)) {
        process.exit();
    }

    let _CONFIG = fs.readFileSync(configPath);
    try {
        _CONFIG = JSON.parse(_CONFIG);

        _CONFIG.forEach((item, index) => {
            let { host, port, username, password, targetDist } = item;

            if (!host || !port || !username || !password || !targetDist) process.exit(1);

            item.targetDist = handlePath(targetDist);
        })
    } catch (error) {

    }

    return _CONFIG;
}

module.exports = handleConfig;