/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-26 21:10:22
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 21:10:34
 */
'use strict';

const fs = require('fs');
const { resolvePath } = require('./utils');

function handleConfig() {
    let configPath = resolvePath("./", "cbl-dt-config.json");
    if (!fs.existsSync(configPath)) {
        process.exit();
    }

    let config = fs.readFileSync(configPath);
    try {
        config = JSON.parse(config);
    } catch (error) {

    }
    return config;
}

module.exports = handleConfig;