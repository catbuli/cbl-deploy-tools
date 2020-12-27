/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-27 00:20:32
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-27 00:20:32
 */
'use strict'

const { NodeSSH } = require("node-ssh");
const { msgError, msgSuccess } = require("./consoleMsg");
const { getTime, pathHandle } = require("./utils");

const conn = new NodeSSH();

async function connectServer(args) {
    await conn.connect(args).then(() => {
        msgSuccess("服务器连接成功!")
    }).catch((err) => {
        msgError(err);
        process.exit(1);
    });
}

async function backup(targetDist) {
    await sshCommand("mkdir -p ../cbl-dt-backup", targetDist);
    await sshCommand(`mv ${targetDist} ${targetDist}../cbl-dt-backup/backup_${getTime()}`, targetDist)
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
    let { host, port, username, password, targetDist } = _CONFIG;
    await connectServer({
        host: host,
        port: port,
        username: username,
        password: password
    });

    await backup(targetDist);

}

module.exports = deploy;