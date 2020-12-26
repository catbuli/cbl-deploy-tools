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
 * 路径解析
 * @param {*} path
 * @param {*} file
 */
exports.resolvePath = (path, file) => nodePath.resolve(path, file);
