
'use strict';

const { spawn } = require('child_process');

/**
 * commandSpawn 执行命令
 * @param {*} command 命令 string
 * @param {*} params 参数 array
 * @param {*} path 路径
 * @example commandSpawn('npm', ['run','serve'], process.cwd())
 */
const commandSpawn = (command, params, path) => {
    return new Promise((resolve, reject) => {
        const result = spawn(command, params, {
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