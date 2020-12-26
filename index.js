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

/**
 * @Description 主函数
 * @param {*}
 * @return {*}
 * @example 
 */
async function start() {
    let _SELECT = await selectServer(handleConfig());
    if (!_SELECT) process.exit(1);


}

module.exports = start;