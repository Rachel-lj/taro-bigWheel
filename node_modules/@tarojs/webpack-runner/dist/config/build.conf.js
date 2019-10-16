"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ sourceRoot = 'src', outputRoot = 'dist', publicPath = '/', staticDirectory = 'static', chunkDirectory = 'chunk', designWidth = 750 }) => {
    return {
        sourceRoot,
        outputRoot,
        publicPath,
        staticDirectory,
        chunkDirectory,
        designWidth
    };
};
