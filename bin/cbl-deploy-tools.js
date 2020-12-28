#!/usr/bin/env node
/*
 * @Description 
 * @Author Catbuli
 * @Date 2020-12-26 16:09:35
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 16:09:38
 */

const package = require("../package.json");
const start = require("../index");
const { msgNormal, msgTitle, msgInfo, msgSuccess, msgError } = require("../lib/consoleMsg");

(function () {
    msgNormal(`[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}]`);
    msgTitle(`===============${package.name} v${package.version}===============`);
    try {
        start();
    } catch (error) {
        if (error) throw error;
    }
})();