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
 */
exports.msgTitle = (msg) => console.log(chalk.bgBlue(chalk.white(msg + "\n")));

/**
 * @Description 控制台输出信息 Normal
 * @param {string} msg 消息内容
 */
exports.msgNormal = (msg) => console.log(msg);

/**
 * @Description 控制台输出信息 Info
 * @param {string} msg 消息内容
 */
exports.msgInfo = (msg) => console.log(chalk.rgb(255, 150, 0)(msg));

/**
 * @Description 控制台输出信息 Success
 * @param {string} msg 消息内容
 */
exports.msgSuccess = (msg) => console.log(chalk.green(msg + "\n"));

/**
 * @Description 控制台输出信息 Error
 * @param {string} msg 消息内容
 */
exports.msgError = (msg) => console.log(chalk.red(msg + "\n"));
