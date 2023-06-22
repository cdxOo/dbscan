'use strict';
const { exec, join, removeNodeModules } = require('./test-utils');

describe('module-interface', () => {
    describe('CommonJS entrypoint', () => {
        const pkgPath = join(__dirname, './cjs-entrypoint');
        after(() => removeNodeModules(pkgPath));
        
        it('should be able to be loaded with require', async function () {
            this.timeout(30000);
            await exec(`npm test --prefix ${pkgPath}`);
        });
    });

    describe('TypeScript entrypoint', () => {
        const pkgPath = join(__dirname, './ts-entrypoint');
        after(() => removeNodeModules(pkgPath));
        
        it('should be able to be loaded with import', async function () {
            this.timeout(30000);
            await exec(`npm test --prefix ${pkgPath}`);
        });
    });

})
