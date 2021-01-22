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

exports.configExample = [
    {
        "name": "name",
        "host": "127.0.0.1",
        "port": "22",
        "username": "root",
        "password": "root",
        "build": "npm run build",
        "localDist": "./dist",
        "targetDist": "/var/www/html/dist",
        "auto": "11"
    }
]

/**
 * @Description 路径解析
 * @param {String} path 路径1
 * @param {String} path_2 路径2
 * @return {String} 返回绝对路径
 * @example resolvePath("./","dist");
 */
exports.resolvePath = (path, path_2) => nodePath.resolve(path, path_2);

/**
 * @Description 获取备份文件时间
 * @returns {String} 2020-6-6_00:00:00
 * @example getBackupTime();
 * return "2020-6-6_00:00:00"
 */
exports.getBackupDate = () => {
    const time = new Date();
    return `${time.toLocaleDateString().replace(/\//g, '-')}_${time.toTimeString().split(' ')[0].replace(/\:/g, '-')}`;
};

/**
 * @Description 获取当前时间时间
 * @returns {String} 2020-6-6_00:00:00
 * @example getTime();
 * return "2020-6-6_00:00:00"
 */
exports.getDate = () => {
    return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
};

/**
 * @Description 处理路径
 * @param {String} path /var/www/html/test
 * @return {Object} 处理后的各种信息
 * @example handlePath("/var/www/html/test/"); 
 * return 
 * {
 * origin: '/var/www/html/test/',
 * handled: '/var/www/html/test',
 * dirname: '/var/www/html',
 * basename: 'test'
 * }
 */
exports.handlePath = (path) => {
    let origin = path;
    let handled = path.replace(/\/$/, "");
    let dirname = nodePath.dirname(handled);
    let basename = nodePath.basename(handled);
    return {
        origin, handled, dirname, basename
    };
}

/**
 * @Description 执行控制台命令
 * @param {String} command 命令 
 * @param {Array} args 命令参数
 * @param {String} cwd 执行路径
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

/**
 * @Description 求两个数组的差集
 * @param {Array} array
 * @param {Array} array1
 * @return {Array} 差集数组
 */
exports.except = (array, array1) => {
    let result = array.length > array1.length ? array.filter(item => array1.indexOf(item) === -1) : array1.filter(item => array.indexOf(item) === -1);
    return result;
}

/**
 * @Description 求配置文件中值为空的字段数组
 * @param {Object} object
 * @return {Array} 值为空的字段数组
 */
exports.isset = (object) => {
    let result = new Array();
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            if (!object[key] || typeof object[key] !== "string") result.push(key);
        }
    }
    return result;
}

/**
 * @Description 自动部署配置
 * @param {String} auto
 * @return {Object} 自动部署配置
 * @example 
 */
exports.autoOption = (auto) => {
    let [backup, override] = auto.split("");
    return {
        // select: select == true,
        backup: backup == true,
        override: override == true
    }
};