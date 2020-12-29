/*
 * @Description 项目构建
 * @Author Catbuli
 * @Date 2020-12-26 23:50:18
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 23:50:18
 */

'use strict';

const commandSpawn = require("./commandSpawn");
const { msgNormal, msgTitle, msgInfo, msgSuccess, msgError } = require("../lib/consoleMsg");

module.exports = async function projectBuild(command) {
    let [cmd, ...args] = command.split(' ');
    await commandSpawn(cmd, args).then(() => {
        msgSuccess("打包成功");
    }).catch(() => {
        msgError("打包失败")
    });
}