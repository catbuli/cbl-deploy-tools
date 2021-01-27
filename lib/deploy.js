/*
 * @Description 项目部署
 * @Author Catbuli
 * @Date 2020-12-27 00:20:32
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-27 00:20:32
 */
'use strict'

const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const AdmZip = require('adm-zip');
const { NodeSSH } = require("node-ssh");
const { msgError, msgSuccess, msgInfo } = require("./consoleMsg");
const { resolvePath, handlePath, getBackupDate, autoOption } = require("./utils");
const { async } = require("regenerator-runtime");

const conn = new NodeSSH();

/**
 * @Description 连接服务器函数
 * @param {object} args {host,port,username,password}
 * @return {Promise}
 */
async function connectServer(args) {
    let spinner = ora(chalk.rgb(255, 150, 0)("连接服务器...")).start();
    return await conn.connect(args).then(() => {
        spinner.succeed(chalk.green("服务器连接成功!"));
        msgInfo("");
    }).catch((err) => {
        msgError(err);
        process.exit(1);
    });
}

/**
 * @Description 替换目标文件夹
 * @param {String} targetDist 目标路径
 * @return {*}
 * @example 
 */
async function replaceDist(targetDist) {
    await sshCommand(`rm -r ${targetDist}`, targetDist);
}

/**
 * @Description zip压缩项目打包文件
 * @param {Object} localDist 经过handlePath处理的对象
 * @param {Object} targetDist 经过handlePath处理的对象
 * @return {String} 压缩后的zip文件路径
 */
async function compress(localDist, targetDist) {
    let zipFilePath = resolvePath("./", localDist.origin);
    let file = new AdmZip();
    file.addLocalFolder(zipFilePath, targetDist.basename);
    file.writeZip(zipFilePath + ".zip");
    return resolvePath("./", zipFilePath + ".zip");
}

/**
 * @Description 解压服务器打包文件压缩包 并且清理压缩包
 * @param {Object} targetZipPath 经过handlePath处理的对象
 * @param {Object} targetDist 经过handlePath处理的对象
 * @return {*} 
 */
async function decompress(targetZipPath, targetDist) {
    let spinner = ora(chalk.rgb(255, 150, 0)("解压中...")).start();
    try {
        // 修改压缩文件权限
        await sshCommand(`chmod 777 ${targetZipPath}`);
        // 解压缩文件
        await sshCommand(`unzip -o ${targetZipPath}`, targetDist.dirname);
        // 清除压缩文件
        await sshCommand(`rm -f ${targetZipPath}`);
    } catch (error) {
        spinner.fail(chalk.red("解压失败!"))
    }
    spinner.succeed(chalk.green("解压成功!"));
    msgInfo("");
}

/**
 * @Description 上传部署后的打包文件
 * @param {string} zipPath 本地路径
 * @param {string} targetDist 目标路径
 * @return {*}
 */
async function upload(zipPath, targetDist) {
    let spinner = ora(chalk.rgb(255, 150, 0)("文件上传中...")).start();
    await conn.putFile(zipPath, targetDist).then(() => {
        spinner.succeed(chalk.green("文件上传成功!"));
    }).catch((err) => {
        msgError(err);
        spinner.fail(chalk.red("文件上传失败!"));
        process.exit(1);
    });
    msgInfo("");
}


/**
 * @Description 备份函数
 * @param {string} targetDist 
 * @return {string} 目标服务器路径
 */
async function targetDistBackup(targetDist) {
    let spinner = ora(chalk.rgb(255, 150, 0)("备份中...")).start();
    let path = handlePath(targetDist);
    let backupName = `${path.basename}_${getBackupDate()}`;
    try {
        await sshCommand("mkdir -p cbl-dt-backup", path.dirname);
        await sshCommand(`cp -r ${path.handled} ${backupName}`, path.dirname);
        await sshCommand(`mv ${backupName} cbl-dt-backup`, path.dirname);
    } catch (error) {
        spinner.fail(chalk.red("备份失败!"))
    }
    spinner.succeed(chalk.green("备份成功!"))
    msgInfo("");

    return `${path.dirname}/cbl-dt-backup/${backupName}`;
}

/**
 * @Description 服务器命令函数
 * @param {*} command 命令
 * @param {*} cwd 执行路径
 * @return {Promise}
 */
async function sshCommand(command, cwd) {
    return await conn.execCommand(command, {
        cwd,
        onChannel(chunk) {
        },
        onStderr(chunk) {
            msgError(chunk.toString('utf8'));
            process.exit(1);
        },
    });
}

/**
 * @Description 部署函数
 * @param {object} _CONFIG 选择的服务器配置信息
 * @return {*}
 */
async function deploy(_CONFIG) {
    // ----------------部署开始----------------
    let { host, port, username, password, localDist, targetDist, auto } = _CONFIG;
    let targetDistIsExist = false;
    let _autoOption = autoOption(auto);
    localDist = handlePath(localDist);
    targetDist = handlePath(targetDist);

    // 连接服务器
    await connectServer({
        host,
        port,
        username,
        password
    });

    // 压缩本地打包项目打包文件
    let zipPath = await compress(localDist, targetDist);

    // 创建空文件夹防止错误信息
    await conn.mkdir(targetDist.handled);

    // 判断目标文件夹是否存在
    await sshCommand(`ls -a ${targetDist.handled}`, targetDist.handled).then((data) => {
        targetDistIsExist = !(data.stdout === ".\n..");
    });

    if (targetDistIsExist) {

        // 备份逻辑
        if (!_autoOption.backup) {
            var { backup } = await inquirer.prompt({
                type: "confirm",
                name: "backup",
                message: "是否备份?",
            })
            msgInfo("");
        }
        if (backup || _autoOption.backup) {
            var backupPath = await targetDistBackup(targetDist.handled);
        }

        // 是否覆盖部署
        var override = true;
        if (!_autoOption.override) {
            var { override } = await inquirer.prompt({
                type: "confirm",
                name: "override",
                message: "是否覆盖目标文件夹?(y:覆盖，n:替换)",
            });
            msgInfo("");
        }
        if (!override) {
            replaceDist(targetDist.handled);
        }
    }

    // 打包文件上传
    await upload(zipPath, targetDist.dirname + "/" + handlePath(zipPath).basename);

    // 解压缩服务器中的压缩文件
    await decompress(targetDist.dirname + "/" + handlePath(zipPath).basename, targetDist);

    // 关闭连接
    conn.dispose();

    // ----------------部署结束----------------
    msgSuccess(`项目已成功部署到目标服务器:${_CONFIG.name}`);
    msgSuccess(`部署路径:${_CONFIG.targetDist}`);
    if (targetDistIsExist && (backup || _autoOption.backup)) {
        msgSuccess(`备份文件路径:${backupPath}`);
    }
}

module.exports = {
    deploy,
    connectServer,
    sshCommand,
    targetDistBackup,
    upload
}