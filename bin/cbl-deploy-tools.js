#!/usr/bin/env node
/*
 * @Description bin文件
 * @Author Catbuli
 * @Date 2020-12-26 16:09:35
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 16:09:38
 */

'use strict'

const start = require("../index");

(function () {
    try {
        start();
    } catch (error) {
        if (error) throw error;
    }
})();