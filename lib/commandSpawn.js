
'use strict';

const { spawn } = require('child_process');

/**
 * @Description 执行控制台命令
 * @param {string} command 命令 
 * @param {Array} params 命令参数
 * @param {string} path 执行路径
 * @return {Promise} 
 * @example 
 */
const commandSpawn = (command, args, path) => {
    return new Promise((resolve, reject) => {
        const result = spawn(command, args, {
            path,
            stdio: 'inherit',
            shell: process.platform === 'win32',
            encoding: 'utf8',
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

module.exports = commandSpawn;