/*
 * @Description 工具函数文件
 * @Author Catbuli
 * @Date 2020-12-24 12:01:04
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-24 12:01:04
 */
'use strict';

const nodePath = require('path');

/**
 * @Description 路径解析
 * @param {string} path 路径1
 * @param {string} path_2 路径2
 * @return {string} 返回绝对路径
 * @example resolvePath("./","dist");
 */
exports.resolvePath = (path, path_2) => nodePath.resolve(path, path_2);

/**
 * @Description 获取时间
 * @returns {string} 2020-6-6_00:00:00
 * @example getTime();
 * return "2020-6-6_00:00:00"
 */
exports.getTime = function getTime() {
    const time = new Date();
    return `${time.toLocaleDateString().replace(/\//g, '-')}_${time.toTimeString().split(' ')[0].replace(/\:/g, '-')}`;
};

/**
 * @Description 处理路径
 * @param {string} path /var/www/html/test
 * @return {string} 处理后的路径
 * @example handlePath("/var/www/html/test"); 
 * return “/var/www/html/test/”
 */
exports.handlePath = function handlePath(path) {
    let reg = new RegExp("/\/*$/");
    if (!reg.test(reg)) {
        return path + "/";
    }
    return path;
}