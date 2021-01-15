/*
 * @Description 项目打包
 * @Author Catbuli
 * @Date 2020-12-26 23:50:18
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 23:50:18
 */

'use strict';

const { commandSpawn } = require("./utils");
const { msgSuccess, msgError, msgInfo, msgNormal } = require("../lib/consoleMsg");

/**
 * @Description 打包函数
 * @param {string} command 打包命令
 * @return {*}
 */
module.exports = async function projectBuild(command) {
    let [cmd, ...args] = command.split(' ');
    await commandSpawn(cmd, args).then(() => {
        msgSuccess("打包成功！");
    }).catch((err) => {
        msgNormal("");
        msgError("打包失败！请根据错误信息修改。")
        process.exit(1);
    });
}