#!/usr/bin/env node

/*
 * @Description 
 * @Author Catbuli
 * @Date 2020-12-26 16:09:35
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 16:09:38
 */

const start = require("../index");

(function () {

    try {
        start();
    } catch (err) {
        if (err) throw err;
    }
})();