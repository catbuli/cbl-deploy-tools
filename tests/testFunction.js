/*
 * @Description
 * @Author Catbuli
 * @Date 2021-01-12 13:56:28
 * @LastEditors Catbuli
 * @LastEditTime 2021-01-12 13:56:28
 */

const inquirer = require('inquirer');
const fs = require('fs');
const { msgError } = require('../lib/consoleMsg');
const { resolvePath, commandSpawn } = require("../lib/utils");

function handleConfig(configPath) {
    if (!fs.existsSync(configPath)) {
        process.exit(1);
    }
    let _CONFIG = fs.readFileSync(configPath);
    try {
        _CONFIG = JSON.parse(_CONFIG);
        _CONFIG.forEach((item) => {
            let { name, host, port, username, password, build, localDist, targetDist } = item;
            if (!name || !host || !port || !username || !password || !build || !localDist || !targetDist) {
                process.exit(1);
            }
        })
    } catch (error) {
        msgError(error);
    }
    return _CONFIG;
}

async function selectServer(_CONFIG) {
    let select;
    await inquirer.prompt({
        type: "list",
        name: "serverName",
        message: "请选择要部署的目标服务器：",
        choices: _CONFIG.map((item) => ({
            name: item.name,
        }))
    }).then((choice) => {
        try {
            select = _CONFIG.filter((item) =>
                item.name == choice.serverName
            )[0];
        } catch (error) {
            throw error;
        }
    });
    console.log('', '')
    return select;
}

async function projectBuild(command) {
    let [cmd, ...args] = command.split(' ');
    await commandSpawn(cmd, args);
    await commandSpawn("touch", [`${resolvePath("./", args[0])}/test.txt`]);
}

module.exports = {
    handleConfig,
    selectServer,
    projectBuild
}