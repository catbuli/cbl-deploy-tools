/*
 * @Description 项目部署函数
 * @Author Catbuli
 * @Date 2020-12-27 00:20:32
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-27 00:20:32
 */
'use strict'

const chalk = require("chalk");
const inquirer = require("inquirer");
const { NodeSSH } = require("node-ssh");
const ora = require("ora");
const { msgError, msgSuccess, msgInfo } = require("./consoleMsg");
const { getTime, pathHandle, resolvePath, handlePath } = require("./utils");

const conn = new NodeSSH();

async function connectServer(args) {
    let spinner = ora(chalk.yellow("连接服务器...")).start();
    await conn.connect(args).then(() => {
        spinner.succeed(chalk.green("服务器连接成功!"));
        msgInfo("");
    }).catch((err) => {
        msgError(err);
        process.exit(1);
    });

}

async function targetDistBackup(targetDist) {
    await sshCommand("mkdir -p ../cbl-dt-backup", targetDist);
    await sshCommand(`cp -r ${targetDist} ${targetDist}_${getTime()}`, targetDist);
}

async function upload(localDist, targetDist) {
    let spinner = ora(chalk.yellow("文件上传中...")).start();
    await conn.putDirectory(localDist, targetDist);
    spinner.succeed(chalk.green("文件上传成功!"));
    msgInfo("");
}

/**
 * @Description 服务器命令函数
 * @param {*} command 命令
 * @param {*} cwd
 * @return {*}
 */
async function sshCommand(command, cwd) {
    return await conn.execCommand(command, {
        cwd,
        onChannel(chunk) {
            // resolve(chunk.toString('utf8'));
        },
        onStderr(chunk) {
            msgError(chunk.toString('utf8'));
            // reject(chunk.toString('utf8'));
        },
    });
}

/**
 * @Description 部署函数
 * @param {object} _CONFIG 选择的服务器配置信息
 * @return {*}
 */
module.exports = async function deploy(_CONFIG) {
    // ----------------部署开始----------------

    let { host, port, username, password, localDist, targetDist } = _CONFIG;
    let targetDistIsExist = false;

    // 连接服务器
    await connectServer({
        host,
        port,
        username,
        password
    });

    // 判断目标文件夹是否存在
    await sshCommand(`ls ${targetDist}`, targetDist).then((data) => {
        data.code ? targetDistIsExist = false : targetDistIsExist = true;
    });

    // 创建空文件夹防止错误信息
    await conn.mkdir(targetDist);

    if (targetDistIsExist) {
        // 备份逻辑
        let { backup } = await inquirer.prompt({
            type: "confirm",
            name: "backup",
            message: "是否备份?",
        })
        msgInfo("");
        if (backup) {
            await targetDistBackup(targetDist);
        }

        // 是否覆盖部署
        let { override } = await inquirer.prompt({
            type: "confirm",
            name: "override",
            message: "是否覆盖目标文件夹?",
        })
        msgInfo("");
        if (override) {
            await sshCommand(`rm -r ${targetDist}`, targetDist);
        }
    }

    // 打包文件上传
    await upload(resolvePath("./", localDist), `${handlePath(targetDist)}`);

    // ----------------部署结束----------------
    msgSuccess(`项目已成功部署到目标服务器:${_CONFIG.name}`);
    msgSuccess(`路径:${_CONFIG.targetDist}`);
}