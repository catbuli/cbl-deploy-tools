/*
 * @Description
 * @Author Catbuli
 * @Date 2020-12-24 12:01:04
 * @LastEditors Catbuli
 * @LastEditTime 2020-12-24 12:01:04
 */
'use strict';

const nodePath = require('path');

/**
 * @Description 路径解析
 * @param {string} path 路径
 * @param {string} path_2 路径
 * @return {string} 返回连接的绝对路径
 */
exports.resolvePath = (path, path_2) => nodePath.resolve(path, path_2);