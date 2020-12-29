/*
 * @Description 入口文件
 * @Author Catbuli
 * @Date 2020-12-26 18:09:13
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 18:09:14
 */

'use strict';

const selectServer = require("./lib/selectServer");
const handleConfig = require("./lib/handleConfig");
const projectBuild = require("./lib/projectBuild");
const PACKAGE = require("./package.json");
const deploy = require("./lib/deploy");
const { msgSuccess, msgNormal, msgTitle, msgInfo } = require("./lib/consoleMsg");

/**
 * @Description 入口函数
 * @param {*}
 * @return {*}
 * @example 
 */
async function start() {

    msgInfo("         ___   ____   __          ____   ____ ");
    msgInfo("        / __) (  _ \\ (  )   ___  (  _ \\ (_  _)");
    msgInfo("       ( (__   ) _ <  )(__ (___)  )(_) )  )( ");
    msgInfo(`        \\___) (____/ (____)      (____/  (_)    v${PACKAGE.version} by ${PACKAGE.author}`);
    msgInfo("");

    msgInfo(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
    msgInfo("");

    let _CONFIG = await selectServer(handleConfig());

    await projectBuild(_CONFIG.build);

    await deploy(_CONFIG);

    msgInfo(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
    msgInfo("");

    process.exit();
}

module.exports = start;