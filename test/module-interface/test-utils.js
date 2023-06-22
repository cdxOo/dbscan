'use strict';
const util = require('util');
const childprocess = require('child_process');
const fs = require('fs-extra');
const { join } = require('path');

const exec = util.promisify(childprocess.exec);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const remove = async (path) => {
    process.stdout.write(`Removing path "${path}" ... `);
    try {
        await sleep(500);
        await fs.remove(path);
        console.log('done!');
    }
    catch (e) {
        console.warn(err.message);
    }
}
const removeNodeModules = async (pkgPath) => {
    await remove(join(pkgPath, './node_modules'));
}

module.exports = {
    exec,
    join,
    remove,
    removeNodeModules,
}
