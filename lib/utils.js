/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-24 12:01:04
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-24 12:01:04
 */
'use strict';

const nodePath = require('path');

/**
 * @Description 路径解析
 * @param {string} path 路径
 * @param {string} path_2 路径
 * @return {string} 返回连接的绝对路径
 */
exports.resolvePath = (path, path_2) => nodePath.resolve(path, path_2);

/**
 * @Description 获取时间
 * @returns 2020-6-19_00:00:00
 */
exports.getTime = function getTime() {
    const time = new Date();
    return `${time.toLocaleDateString()}_${time.toLocaleTimeString().replace(/\:/g, '-')}`;
};

exports.handlePath = function handlePath(path) {
    let reg = new RegExp("/\/*$/");
    if (!reg.test(reg)) {
        return path + "/";
    }
    return path;
}