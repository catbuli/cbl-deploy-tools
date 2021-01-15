/*
 * @Description 工具函数文件
 * @Author Catbuli
 * @Date 2020-12-24 12:01:04
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-24 12:01:04
 */
'use strict';

const nodePath = require('path');
const { spawn } = require('child_process');

/**
 * @Description 路径解析
 * @param {string} path 路径1
 * @param {string} path_2 路径2
 * @return {string} 返回绝对路径
 * @example resolvePath("./","dist");
 */
exports.resolvePath = (path, path_2) => nodePath.resolve(path, path_2);

/**
 * @Description 获取备份文件时间
 * @returns {string} 2020-6-6_00:00:00
 * @example getBackupTime();
 * return "2020-6-6_00:00:00"
 */
exports.getBackupDate = () => {
    const time = new Date();
    return `${time.toLocaleDateString().replace(/\//g, '-')}_${time.toTimeString().split(' ')[0].replace(/\:/g, '-')}`;
};

/**
 * @Description 获取当前时间时间
 * @returns {string} 2020-6-6_00:00:00
 * @example getTime();
 * return "2020-6-6_00:00:00"
 */
exports.getDate = () => {
    return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
};

/**
 * @Description 处理路径
 * @param {string} path /var/www/html/test
 * @return {string} 处理后的路径
 * @example handlePath("/var/www/html/test"); 
 * return “/var/www/html/test/”
 */
exports.handlePath = (path) => {
    let reg = new RegExp("\/$");
    if (!reg.test(path)) {
        return path + "/";
    }
    return path;
}

/**
 * @Description 执行控制台命令
 * @param {string} command 命令 
 * @param {Array} args 命令参数
 * @param {string} cwd 执行路径
 * @return {Promise} 
 * @example 
 */
exports.commandSpawn = (command, args, cwd) => {
    return new Promise((resolve, reject) => {
        const result = spawn(command, args, {
            cwd,
            stdio: 'inherit',
            // 跨平台调用
            shell: process.platform === 'win32',
        });

        result.on('error', (err) => {
            reject(err);
        });

        result.on('close', (code) => {
            if (code === 0) resolve();
            else reject(code);
        });
    });
};
