#!/usr/bin/env node
/*
 * @Description 
 * @Author Catbuli
 * @Date 2020-12-26 16:09:35
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 16:09:38
 */

'use strict'

const PACKAGE = require("../package.json");
const start = require("../index");
const { msgNormal, msgTitle, msgInfo, msgSuccess, msgError } = require("../lib/consoleMsg");

(function () {
    msgInfo("         ___   ____   __          ____   ____ ");
    msgInfo("        / __) (  _ \\ (  )   ___  (  _ \\ (_  _)");
    msgInfo("       ( (__   ) _ <  )(__ (___)  )(_) )  )( ");
    msgInfo(`        \\___) (____/ (____)      (____/  (__)    v${PACKAGE.version} by:${PACKAGE.author}`);
    msgInfo("");

    msgInfo(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
    msgInfo("");

    try {
        start();
    } catch (error) {
        if (error) throw error;
    }
})();