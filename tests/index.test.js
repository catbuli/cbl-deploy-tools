/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-30 16:23:44
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-30 16:23:44
 */

const testConfig = [{
    "name": "test",
    "host": "127.0.0.1",
    "port": "22",
    "username": "hengyi",
    "password": "123",
    "build": "mkdir ./_testLocalDist",
    "localDist": "./_testLocalDist",
    "targetDist": "./_testTargetDist"
},
{
    "name": "test1",
    "host": "0.0.0.0",
    "port": "22",
    "username": "hengyi",
    "password": "123",
    "build": "mkdir ./_testLocalDist",
    "localDist": "./_testLocalDist",
    "targetDist": "./_testTargetDist"
}];

const { handleConfig, selectServer, projectBuild } = require("./testFunction");
const { resolvePath, commandSpawn, handlePath } = require("../lib/utils");
const { connectServer, sshCommand, targetDistBackup, upload } = require("../lib/deploy");
const { NodeSSH } = require("node-ssh");

describe("======= cbl-deploy-tools test =======", () => {
    let _CONFIG;
    it('======= handleConfig test =======', async () => {
        let configPath = resolvePath("tests", "./cbl-dt-config.json")
        _CONFIG = await handleConfig(configPath);
        expect(_CONFIG).toEqual(testConfig);
    })

    it('======= selectServer test =======', async () => {
        _CONFIG = await selectServer(_CONFIG);
        expect(_CONFIG).toEqual(testConfig[0]);
        expect(_CONFIG).not.toEqual(testConfig[1]);
    })

    it('======= projectBuild test =======', async () => {
        await projectBuild(_CONFIG.build);
    })

    // it('======= deploy test =======', async (done) => {
    //     const conn = new NodeSSH();
    //     let { host, port, username, password, localDist, targetDist } = _CONFIG;
    //     let targetDistIsExist = false;

    //     await connectServer({
    //         host,
    //         port,
    //         username,
    //         password
    //     });

    //     // 创建空文件夹防止错误信息
    //     await conn.mkdir(targetDist);

    //     // 判断目标文件夹是否存在
    //     await sshCommand(`ls -a ${targetDist}`, targetDist).then((data) => {
    //         targetDistIsExist = !(data.stdout === ".\n..");
    //     });

    //     if (targetDistIsExist) {
    //         // 备份逻辑
    //         var { backup } = await inquirer.prompt({
    //             type: "confirm",
    //             name: "backup",
    //             message: "是否备份?",
    //         })
    //         msgInfo("");
    //         if (backup) {
    //             var backupPath = await targetDistBackup(targetDist);
    //         }

    //         // 是否覆盖部署
    //         let { override } = await inquirer.prompt({
    //             type: "confirm",
    //             name: "override",
    //             message: "是否覆盖目标文件夹?(y:覆盖，n:替换)",
    //         })
    //         msgInfo("");
    //         if (override) {
    //             await sshCommand(`rm -r ${targetDist}`, targetDist);
    //         }
    //     }

    //     // 打包文件上传
    //     await upload(resolvePath("./", localDist), `${handlePath(targetDist)}`);
    // })

    it('======= clear test file =======', async () => {
        await commandSpawn("rm", ["-rf", `${_CONFIG.localDist}`], resolvePath("./", "./"));
    })
})

describe("======= cbl-deploy-tools utils test =======", () => {
    it('======= projectBuild test =======', async () => {
        expect(handlePath("/var/www")).toEqual("/var/www/");
        expect(handlePath("/var/www/")).toEqual("/var/www/");
        expect(handlePath("/var/www//")).toEqual("/var/www//");
    })
})

