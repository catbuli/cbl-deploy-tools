/*
 * @Description
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
const { msgError, msgSuccess } = require("./consoleMsg");
const { getTime, pathHandle, resolvePath } = require("./utils");

const conn = new NodeSSH();

async function connectServer(args) {
    let spinner = ora(chalk.yellow("连接服务器...")).start();
    await conn.connect(args).then(() => {
        spinner.succeed(chalk.green("服务器连接成功!"));
    }).catch((err) => {
        msgError(err);
        process.exit(1);
    });

}

async function targetDistBackup(targetDist) {
    await sshCommand("mkdir -p ../cbl-dt-backup", targetDist);
    await sshCommand(`mv ${targetDist} ${targetDist}_${getTime()}`, targetDist);
}

async function upload(localDist, targetDist) {
    let spinner = ora(chalk.yellow("文件上传中...")).start();
    await conn.putDirectory(localDist, targetDist);
    spinner.succeed(chalk.green("文件上传成功!"));
}

async function sshCommand(command, cwd) {
    await conn.execCommand(command, {
        cwd,
        onStderr(chunk) {
            msgError(chunk.toString('utf8'));
        }
    });
}

async function deploy(_CONFIG) {
    let { host, port, username, password, localDist, targetDist, backup } = _CONFIG;
    await connectServer({
        host,
        port,
        username,
        password
    });

    if (backup) {
        await targetDistBackup(targetDist);
    }

    var { override } = await inquirer.prompt({
        type: "confirm",
        name: "override",
        message: "是否覆盖目标文件夹?",
    })

    if (override) {
        await sshCommand(`rm -r ${targetDist}`, targetDist);
    }

    await upload(resolvePath("./", localDist), targetDist);

}

module.exports = deploy;