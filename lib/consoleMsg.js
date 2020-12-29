/*
 * @Description 控制台输出
 * @Author Catbuli
 * @Date 2020-12-24 13:37:24
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-24 13:37:24
 */
'use strict';

const chalk = require('chalk');

/**
 * @Description 控制台输出信息 Title
 * @param {string} msg 消息内容
 * @example msgTitle("Hello World!");
 */
exports.msgTitle = (msg) => console.log(chalk.bgBlue(chalk.white(msg + "\n")));

/**
 * @Description 控制台输出信息 Normal
 * @param {string} msg 消息内容
 * @example msgNormal("Hello World!");
 */
exports.msgNormal = (msg) => console.log(msg);

/**
 * @Description 控制台输出信息 Info
 * @param {string} msg 消息内容
 * @example msgInfo("Hello World!");
 */
exports.msgInfo = (msg) => console.log(chalk.cyan(msg));

/**
 * @Description 控制台输出信息 Success
 * @param {string} msg 消息内容
 * @example msgSuccess("Hello World!");
 */
exports.msgSuccess = (msg) => console.log(chalk.green(msg + "\n"));

/**
 * @Description 控制台输出信息 Error
 * @param {string} msg 消息内容
 * @example msgError("Hello World!");
 */
exports.msgError = (msg) => console.log(chalk.red(msg + "\n"));