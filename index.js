/*
 * @Description 
 * @Author Catbuli
 * @Date 2020-12-26 18:09:13
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 18:09:14
 */

'use strict';

const selectServer = require("./lib/selectServer");
const handleConfig = require("./lib/handleConfig");
const projectBuild = require("./lib/projectBuild");
const deploy = require("./lib/deploy");

/**
 * @Description 主函数
 * @param {*}
 * @return {*}
 * @example 
 */
async function start() {

    let _CONFIG = await selectServer(handleConfig());

    let [command, ...script] = _CONFIG.build.split(' ');

    await projectBuild(command, script);

    await deploy(_CONFIG);

    process.exit();
}

module.exports = start;