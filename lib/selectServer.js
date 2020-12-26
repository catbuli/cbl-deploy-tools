/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-26 20:47:21
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-26 20:47:21
 */
'use strict';

const inquirer = require('inquirer');

/**
 * @Description 选择部署服务器
 * @param {Array} _CONFIG 配置文件数据
 * @return {object} 选中的服务器配置
 * @example 
 */
async function selectServer(_CONFIG) {
    let select;
    await inquirer.prompt({
        type: "list",
        name: "serverName",
        message: "请选择要部署的目标服务器：",
        choices: _CONFIG.map((item, index) => ({
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
    return select;
}

module.exports = selectServer;