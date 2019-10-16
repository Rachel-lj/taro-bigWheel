"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autoprefixer = require("autoprefixer");
const path = require("path");
const constparse = require("postcss-plugin-constparse");
const pxtransform = require("postcss-pxtransform");
const resolve_1 = require("resolve");
const util_1 = require("../util");
const defaultAutoprefixerOption = {
    enable: true,
    config: {
        browsers: [
            'Android >= 4',
            'iOS >= 6'
        ],
        flexbox: 'no-2009'
    }
};
const defaultPxtransformOption = {
    enable: true,
    config: {
        platform: 'h5'
    }
};
// const defaultCssModulesOption = {
//   enable: false,
//   config: {}
// }
const defaultConstparseOption = {
    constants: [{
            key: 'taro-tabbar-height',
            val: '50PX'
        }],
    platform: 'h5'
};
const optionsWithDefaults = ['autoprefixer', 'pxtransform', 'cssModules'];
const plugins = [];
exports.getPostcssPlugins = function (appPath, { designWidth, deviceRatio, postcssOption = {} }) {
    if (designWidth) {
        defaultPxtransformOption.config.designWidth = designWidth;
    }
    if (deviceRatio) {
        defaultPxtransformOption.config.deviceRatio = deviceRatio;
    }
    const autoprefixerOption = util_1.recursiveMerge({}, defaultAutoprefixerOption, postcssOption.autoprefixer);
    const pxtransformOption = util_1.recursiveMerge({}, defaultPxtransformOption, postcssOption.pxtransform);
    // const cssModulesOption = recursiveMerge({}, defaultCssModulesOption, postcssOption.cssModules)
    if (autoprefixerOption.enable) {
        plugins.push(autoprefixer(autoprefixerOption.config));
    }
    if (pxtransformOption.enable) {
        plugins.push(pxtransform(pxtransformOption.config));
    }
    // if (cssModulesOption.enable) {
    //   plugins.push(modules(cssModulesOption.config))
    // }
    plugins.push(constparse(defaultConstparseOption));
    Object.entries(postcssOption).forEach(([pluginName, pluginOption]) => {
        if (optionsWithDefaults.indexOf(pluginName) > -1)
            return;
        if (!pluginOption || !pluginOption.enable)
            return;
        if (!util_1.isNpmPackage(pluginName)) { // local plugin
            pluginName = path.join(appPath, pluginName);
        }
        try {
            const pluginPath = resolve_1.sync(pluginName, { basedir: appPath });
            plugins.push(require(pluginPath)(pluginOption.config || {}));
        }
        catch (e) {
            const msg = e.code === 'MODULE_NOT_FOUND' ? `缺少postcss插件${pluginName}, 已忽略` : e;
            console.log(msg);
        }
    });
    return plugins;
};
