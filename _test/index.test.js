/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-30 16:23:44
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-30 16:23:44
 */

const deploy = require("../lib/deploy");
const selectServer = require("../lib/selectServer");
const handleConfig = require("../lib/handleConfig");
const projectBuild = require("../lib/projectBuild");
const { async } = require("regenerator-runtime");
const { resolvePath } = require("../lib/utils");
const fs = require('fs');

test('测试', async () => {


    let configPath = resolvePath("./", "_test/cbl-dt-config.json");

    let _CONFIG = await fs.readFileSync(configPath);

    _CONFIG = JSON.parse(_CONFIG)[0];

    await projectBuild(_CONFIG.build);

})