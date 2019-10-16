"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Chain = require("webpack-chain");
const util_1 = require("../util");
exports.default = (appPath) => {
    const chain = new Chain();
    chain.merge({
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            mainFields: ['main:h5', 'browser', 'module', 'main'],
            symlinks: true,
            modules: [
                path.join(appPath, 'node_modules'),
                'node_modules'
            ]
        },
        resolveLoader: {
            modules: [
                path.join(util_1.getRootPath(), 'node_modules'),
                'node_modules'
            ]
        }
    });
    return chain;
};
