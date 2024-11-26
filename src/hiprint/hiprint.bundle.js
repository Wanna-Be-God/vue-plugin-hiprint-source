/* eslint-disable */
/**
 * jQuery Hiprint 2.5.4
 *
 * Copyright (c) 2016-2021 www.hinnn.com. All rights reserved.
 *
 * Licensed under the LGPL or commercial licenses
 * To use it on other terms please contact us: hinnn.com@gmail.com
 *
 */

"use strict";

/**
 * import 相关资源
 */
import $ from "jquery";
// js颜色选择
import "@claviska/jquery-minicolors/jquery.minicolors.min";
// 直接打印需要
import { io } from "socket.io-client";
// 默认自定义拖拽列表
import defaultTypeProvider from "./etypes/default-etyps-provider";

window.$ = window.jQuery = $;
window.autoConnect = true;
window.io = io;

import {
  CreateTarget,
  DraggableHandler,
  HiprintInstance,
  InitializeResizableElements,
  LoadStyleWithHMR,
  ManageStyles,
  PrintTemplateManager,
} from "./core/index.js";

import {
  CreateBasePrintElement,
  CreateContextMenuStyles,
  GetPrintElementOptionEntity,
  InitializeDroppablePlugin,
  PrintElementFactory,
  PrintElementInstance,
  PrintLine,
  PrintPosition,
} from "./elements/index.js";

import {
  FixCssUrls,
  GenerateCSSWithSourceMaps,
  GeometryUtils,
  HiprintUtil,
  IdGenerator,
  InitializeHiprintParser,
  SetElementSpacing,
  _instanceof,
  _typeof,
} from "./utils/index.js";

import {
  GridColumnManager,
  HitableEditorModule,
  RowColumns,
  SelectCellsByCoordinates,
  TableClass,
  TableExcelHelperFuc,
  TableHandler,
  TablePrintElementFactory,
  TableRow,
} from "./tables/index.js";

import InitializeWebSocketModule from "./webSocket/InitializeWebSocketModule.js";
import ContextMenuInitializer from "./plugins/ContextMenuInitializer.js";

var hiprint = (function (modules) {
  // 存储已安装（加载）的模块
  var installedModules = {};

  // 定义模块加载的函数 `require`
  function require(moduleId) {
    // 如果该模块已经加载过，直接返回缓存的模块内容
    if (installedModules[moduleId]) return installedModules[moduleId].exports;

    // 创建一个新的模块对象，并初始化其属性
    var module = (installedModules[moduleId] = {
      i: moduleId, // 模块ID
      l: false, // 模块加载状态
      exports: {}, // 模块的导出对象
    });

    // 调用模块代码（从 modules 对象中获取并执行）
    // 注意：这里的 modules[moduleId] 是一个函数，执行时将 module 和 exports 传给它
    modules[moduleId].call(module.exports, module, module.exports, require);

    // 标记模块为已加载
    module.l = true;

    // 返回模块的导出对象（这就是最终能被其他模块引用的部分）
    return module.exports;
  }

  // 保存所有模块的代码
  require.m = modules;

  // 保存已安装（加载）的模块缓存
  require.c = installedModules;

  // 定义一个方法，用于确保模块的 `exports` 对象拥有特定属性（避免重复定义）
  require.d = function (exports, name, getter) {
    if (!require.o(exports, name)) {
      // 使用 Object.defineProperty 定义属性
      Object.defineProperty(exports, name, {
        enumerable: true, // 属性可枚举
        get: getter, // getter 函数，动态返回属性值
      });
    }
  };

  // 标记模块为 ES6 模块
  require.r = function (exports) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      // 给模块添加 Symbol.toStringTag 属性，标记为 "Module"
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module",
      });
    }
    // 在模块的 exports 上添加 __esModule 属性，表明这是一个 ES6 模块
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
  };

  // 处理模块转化的函数，支持不同的模块加载模式
  require.t = function (module, mode) {
    if (1 & mode && (module = require(module))) {
      // 如果需要递归加载模块（通过 mode 判断）
      return module;
    }
    if (8 & mode) {
      // 直接返回模块对象（不进行解包）
      return module;
    }
    if (4 & mode && typeof module === "object" && module && module.__esModule) {
      // 如果是 ES6 模块，返回默认导出
      return module.default;
    }
    if (2 & mode && typeof module === "string") {
      // 如果是字符串类型，返回模块本身
      return module;
    }
    // 返回模块的完整内容
    return module;
  };

  // 确保模块的默认导出存在，并返回默认导出的 getter 函数
  require.n = function (module) {
    var getter =
      module && module.__esModule
        ? function () {
            return module.default; // 返回默认导出
          }
        : function () {
            return module; // 返回整个模块
          };
    // 为 getter 定义一个 "a" 属性，兼容模块导出
    return require.d(getter, "a", getter), getter;
  };

  // 判断对象是否具有特定的属性（类似 Object.hasOwnProperty）
  require.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // 设置模块路径前缀，通常用于模块资源的路径查找
  require.p = "/";

  // 启动程序，加载入口模块（模块 ID 为 21）
  return require((require.s = 21));
})([
  HiprintUtil,
  HiprintInstance,
  PrintTemplateManager,
  PrintElementFactory,
  CreateBasePrintElement,
  HitableEditorModule,
  PrintLine,
  TableExcelHelperFuc,
  PrintPosition,
  CreateTarget,
  SelectCellsByCoordinates,
  IdGenerator,
  GetPrintElementOptionEntity,
  TableRow,
  GeometryUtils,
  TablePrintElementFactory,
  TableHandler,
  PrintElementInstance,
  TableClass,
  RowColumns,
  GridColumnManager,
  function (t, e, n) {
    t.exports = n(33);
  },
  DraggableHandler,
  InitializeDroppablePlugin,
  InitializeHiprintParser,
  InitializeResizableElements,
  InitializeWebSocketModule,
  LoadStyleWithHMR,
  CreateContextMenuStyles,
  GenerateCSSWithSourceMaps,
  ManageStyles,
  FixCssUrls,
  ContextMenuInitializer,
  SetElementSpacing,
]);

var defaultElementTypeProvider = defaultTypeProvider(hiprint);

export { hiprint, defaultElementTypeProvider };
