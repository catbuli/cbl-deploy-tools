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
const { deploy } = require("./lib/deploy");
const { msgInfo } = require("./lib/consoleMsg");
const PACKAGE = require("./package.json");
const { getDate } = require("./lib/utils");

/**
 * @Description 入口函数
 * @param {*}
 * @return {*}
 * @example 
 */
async function start() {

    msgInfo(" ________  ________  ___                     ________  _________   ");
    msgInfo("|\\   ____\\|\\   __  \\|\\  \\                   |\\   ___ \\|\\___   ___\\ ");
    msgInfo("\\ \\  \\___|\\ \\  \\|\\ /\\ \\  \\      ____________\\ \\  \\_|\\ \\|___ \\  \\_| ");
    msgInfo(" \\ \\  \\    \\ \\   __  \\ \\  \\    |\\____________\\ \\  \\ \\\\ \\   \\ \\  \\  ");
    msgInfo("  \\ \\  \\____\\ \\  \\|\\  \\ \\  \\___\\|____________|\\ \\  \\_\\\\ \\   \\ \\  \\ ");
    msgInfo("   \\ \\_______\\ \\_______\\ \\_______\\             \\ \\_______\\   \\ \\__\\");
    msgInfo(`    \\|_______|\\|_______|\\|_______|              \\|_______|    \\|__|   v${PACKAGE.version.toString()} by catbuli`);
    msgInfo("");

    msgInfo(`${getDate()}`);
    msgInfo("");

    // 选择服务器
    let _CONFIG = await selectServer(handleConfig());

    // 项目打包构建
    await projectBuild(_CONFIG.build);

    // 项目部署
    await deploy(_CONFIG);

    msgInfo(`${getDate()}`);
    msgInfo("");

    process.exit();
}

module.exports = start;