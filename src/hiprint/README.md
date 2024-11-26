# Hiprint 目录结构

hiprint/
├── README.md                           # 项目说明文档
├── hiprint.bundle.js                   # 打包后的主文件
├── core/                               # 核心功能目录
│   ├── CreateTarget.js                 # 创建目标元素
│   ├── DraggableHandler.js            # 拖拽处理器
│   ├── HiprintInstance.js             # Hiprint实例类
│   ├── InitializeResizableElements.js # 初始化可调整大小的元素
│   ├── LoadStyleWithHMR.js            # 样式加载和热更新
│   ├── ManageStyles.js                # 样式管理
│   └── PrintTemplateManager.js         # 打印模板管理器
├── elements/                           # 打印元素目录
│   ├── CreateBasePrintElement.js       # 创建基础打印元素
│   ├── CreateContextMenuStyles.js      # 创建右键菜单样式
│   ├── GetPrintElementOptionEntity.js  # 获取打印元素选项实体
│   ├── InitializeDroppablePlugin.js    # 初始化拖放插件
│   ├── PrintElementFactory.js          # 打印元素工厂
│   ├── PrintElementInstance.js         # 打印元素实例
│   ├── PrintLine.js                    # 打印线条
│   └── PrintPosition.js                # 打印位置
├── i18n/                               # 国际化目录
│   ├── cn.json                         # 简体中文语言包
│   ├── cn_tw.json                      # 繁体中文语言包
│   ├── de.json                         # 德语语言包
│   ├── en.json                         # 英语语言包
│   ├── es.json                         # 西班牙语语言包
│   ├── fr.json                         # 法语语言包
│   ├── it.json                         # 意大利语语言包
│   ├── ja.json                         # 日语语言包
│   └── ru.json                         # 俄语语言包
├── tables/                             # 表格相关目录
│   ├── GridColumnManager.js            # 网格列管理器
│   ├── HitableEditorModule.js          # 表格编辑器模块
│   ├── InitializeTableManagementModule.js # 表格管理初始化模块
│   ├── RowColumns.js                   # 行列管理
│   ├── SelectCellsByCoordinates.js     # 坐标选择单元格
│   ├── TableClass.js                   # 表格类
│   ├── TableExcelHelperFuc.js         # Excel辅助功能
│   ├── TableHandler.js                 # 表格处理器
│   ├── TablePrintElementFactory.js     # 表格打印元素工厂
│   └── TableRow.js                     # 表格行类
├── etypes/                             # 元素类型目录
│   └── default-etyps-provider.js       # 默认元素类型提供者
├── plugins/                            # 插件目录
│   ├── ContextMenuInitializer.js       # 右键菜单初始化器
│   ├── jquery.hiwprint.js              # jQuery打印插件
│   ├── qrcode.js                       # 二维码生成插件
│   └── watermark.js                    # 水印插件
├── webSocket/                          # WebSocket通信目录
│   └── InitializeWebSocketModule.js    # WebSocket初始化模块
└── utils/                              # 工具目录
    ├── FixCssUrls.js                  # CSS URL修复工具
    ├── GenerateCSSWithSourceMaps.js    # CSS源映射生成器
    ├── GeometryUtils.js               # 几何工具类
    ├── HiprintUtil.js                 # Hiprint核心工具类
    ├── IdGenerator.js                 # ID生成器
    ├── InitializeHiprintParser.js     # Hiprint解析器初始化
    ├── SetElementSpacing.js           # 元素间距设置
    └── Utils.js                       # 通用工具函数

## 模块说明

### core/ - 核心功能
- CreateTarget.js: 创建目标元素的功能实现,处理元素的基本属性和样式设置,提供元素的创建和初始化方法
- DraggableHandler.js: 实现元素拖拽功能,处理拖拽过程中的事件,提供拖拽相关的配置选项,支持元素对齐和吸附功能
- HiprintInstance.js: Hiprint的核心实例类,管理打印模板的创建和配置,提供事件绑定和处理机制,负责初始化整个打印系统
- InitializeResizableElements.js: 初始化可调整大小的元素,处理元素大小调整的交互,提供大小调整的配置选项,支持旋转等变换功能
- LoadStyleWithHMR.js: 处理样式内容的加载,支持样式的热更新(HMR),管理样式模块的依赖关系
- ManageStyles.js: 管理样式的插入和移除,处理样式的动态更新,提供样式操作的工具方法,支持单例模式的样式管理
- PrintTemplateManager.js: 管理打印模板,处理模板的创建和存储,提供模板相关的工具方法,支持模板的导入导出

### elements/ - 打印元素
- CreateBasePrintElement.js: 负责创建基础打印元素,处理元素的基本属性和行为
- CreateContextMenuStyles.js: 定义右键菜单的样式,包含菜单项的布局和外观,处理菜单的悬浮效果,支持子菜单样式
- GetPrintElementOptionEntity.js: 获取打印元素选项的实体类,管理元素的配置选项,处理列的选择状态,提供选项实体的转换方法
- InitializeDroppablePlugin.js: jQuery插件形式的拖放功能实现,提供拖放相关的事件处理,支持元素的拖放交互,主要功能包括拖放事件绑定和拖放状态管理
- PrintElementFactory.js: 打印元素的工厂类,负责创建和管理打印元素,处理元素的属性和行为,主要功能包括元素创建、默认选项设置、尺寸初始化、位置计算、旋转变换和选项实体生成
- PrintElementInstance.js: 打印元素具体的实现,管理元素的实例属性,处理模板和元素的关联,主要属性包括模板ID、元素选项和元素类型
- PrintLine.js: 打印线条元素的实现,管理线条的属性和行为,处理线条的渲染
- PrintPosition.js: 处理打印元素的位置信息,提供位置计算和判断方法,主要功能包括位置属性管理、位置范围判断和打印位置计算

### i18n/ - 国际化
- cn.json: 简体中文语言包
- cn_tw.json: 繁体中文语言包
- de.json: 德语语言包
- en.json: 英语语言包
- es.json: 西班牙语语言包
- fr.json: 法语语言包
- it.json: 意大利语语言包
- ja.json: 日语语言包
- ru.json: 俄语语言包

### tables/ - 表格功能
- SelectCellsByCoordinates.js: 通过坐标选择表格单元格

### etypes/ - 元素类型模块说明

#### default-etyps-provider.js
- 提供默认打印元素类型的定义和配置
- 主要功能:
  1. 常规元素类型定义:
     - 文本元素(text)
       - 基本文本显示
       - 支持自定义文本
     - 图片元素(image) 
       - 图片显示和处理
     - 长文本元素(longText)
       - 支持长文本自动换行
     - 表格元素(table)
       - 支持多级表头
       - 支持列配置(宽度、对齐等)
       - 支持分组统计
       - 支持单元格合并
       - 支持列显示编辑
       - 支持列顺序调整
       - 支持列标题编辑
       - 支持列宽调整
       - 支持右键菜单操作
     - 空白表格(emptyTable)
       - 提供基础表格模板
     - HTML元素(html)
       - 支持自定义HTML内容
       - 支持格式化函数
     - 自定义文本(customText)
       - 支持完全自定义的文本元素

  2. 辅助元素类型定义:
     - 横线元素(hline)
       - 水平分隔线
     - 竖线元素(vline) 
       - 垂直分隔线
     - 矩形元素(rect)
       - 矩形框
     - 椭圆元素(oval)
       - 椭圆/圆形
     - 条形码(barcode)
       - 支持多种条码格式
     - 二维码(qrcode)
       - 支持二维码生成

  3. 元素分组管理:
     - 通过 PrintElementTypeGroup 进行分组
     - 支持"常规"和"辅助"两大类分组
     - 每个分组包含相关的元素类型

  4. 元素类型注册机制:
     - 提供 addElementTypes 方法注册元素类型
     - 支持移除和添加元素类型
     - 支持模块化管理

  5. 元素配置项:
     - tid: 元素类型唯一标识
     - title: 元素显示标题
     - type: 元素类型
     - data: 默认数据
     - formatter: 格式化函数
     - 其他特定元素的专属配置

### plugins/ - 插件模块说明

### ContextMenuInitializer.js
- 右键菜单初始化器
- 主要功能:
  1. 菜单创建和渲染
     - 支持多级菜单
     - 支持菜单项禁用
     - 支持分隔线
     - 自定义菜单样式
  
  2. 事件处理
     - 菜单项点击回调
     - 菜单显示/隐藏控制
     - 位置自动调整
  
  3. 配置选项
     - 菜单宽度
     - 项目高度
     - 背景颜色
     - 字体颜色和大小
     - 悬停效果

### jquery.hiwprint.js
- jQuery打印插件
- 主要功能:
  1. 打印功能实现
     - 创建打印iframe
     - 复制目标内容
     - 应用打印样式
     - 执行打印操作
  
  2. 样式处理
     - 支持导入CSS
     - 支持打印专用样式
     - 样式隔离处理
  
  3. 兼容性处理
     - 支持不同浏览器
     - 图片加载检查
     - 特殊情况处理

### qrcode.js
- 二维码生成插件
- 主要功能:
  1. 二维码生成
     - 支持多种编码方式
     - 错误纠正级别
     - 自定义大小
     - 自定义颜色
  
  2. 渲染方式
     - Canvas渲染
     - SVG渲染
     - Table渲染
  
  3. 特性支持
     - UTF-8字符支持
     - 自动类型判断
     - 边界检查
     - 性能优化

### watermark.js
- 水印插件
- 主要功能:
  1. 水印生成
     - 文本水印
     - 时间戳水印
     - 自定义样式
     - Canvas绘制
  
  2. 水印配置
     - 内容设置
     - 大小位置
     - 旋转角度
     - 透明度
     - 字体样式
  
  3. 高级特性
     - DOM监视
     - 自动更新
     - 防篡改
     - 打印适配

## 主要功能模块依赖关系

1. 核心依赖
- HiprintInstance.js 依赖于:
  - PrintTemplateManager
  - CreateTarget
  - ManageStyles

2. 打印元素依赖
- CreateBasePrintElement.js 依赖于:
  - BasePrintElementFuc.js
  - Utils.js

3. DraggableHandler 依赖于:
  - HiprintInstance
  - InitializeResizableElements

4. PrintTemplateManager 依赖于:
  - CreateTarget
  - ManageStyles

5. LoadStyleWithHMR 依赖于:
  - ManageStyles

这些核心模块共同构成了hiprint的基础框架,提供了打印设计与预览的核心功能。每个模块都有其特定的职责,通过相互配合实现完整的功能。

## 元素类型模块依赖关系

1. default-etyps-provider.js 依赖于:
   - hiprint 核心模块
   - PrintElementTypeGroup 类
   - 各种元素类型的实现类

2. 元素类型与其他模块的关系:
   - 被 PrintElementFactory 使用来创建具体的打印元素
   - 被 HiprintInstance 用于初始化可用的元素类型
   - 与 CreateBasePrintElement 配合实现元素的具体行为

这个模块为整个打印系统提供了元素类型的定义,是实现各种打印元素的基础。通过这些预定义的元素类型,用户可以方便地在打印设计中使用各种元素。

## i18n/ - 国际化模块说明

### 支持的语言
1. 简体中文 (cn.json)
   - 默认语言
   - 包含所有界面文本的中文翻译
   - 作为其他语言包的基准版本

2. 繁体中文 (cn_tw.json)
   - 针对港澳台地区用户
   - 将简体字转换为繁体字
   - 部分用语本地化处理

3. 英语 (en.json)
   - 英语国际化支持
   - 标准的英文翻译
   - 适合国际用户使用

4. 德语 (de.json)
   - 德语本地化支持
   - 符合德语语言习惯
   - 专业术语准确翻译

5. 西班牙语 (es.json)
   - 西班牙语支持
   - 覆盖西语国家用户
   - 地区用语本地化

6. 法语 (fr.json)
   - 法语本地化支持
   - 符合法语语言规范
   - 专业术语准确翻译

7. 意大利语 (it.json)
   - 意大利语支持
   - 符合意语语言习惯
   - 专业术语本地化

8. 日语 (ja.json)
   - 日语本地化支持
   - 符合日语语言习惯
   - 汉字假名混合使用

9. 俄语 (ru.json)
   - 俄语本地化支持
   - 符合俄语语言规范
   - 西里尔字母支持

### 主要翻译内容类别

1. 界面元素
   - 按钮文本
   - 菜单项
   - 提示信息
   - 错误消息

2. 打印元素属性
   - 字体设置
   - 对齐方式
   - 边框样式
   - 页面设置

3. 表格相关
   - 表头设置
   - 单元格属性
   - 合计选项
   - 分页设置

4. 特殊元素
   - 条形码设置
   - 二维码选项
   - 图片属性
   - 水印设置

5. 样式设置
   - 颜色选择
   - 边框设置
   - 间距设置
   - 字体样式

### 语言包特点

1. 统一的键值对格式
   - 使用 JSON 格式存储
   - 键名保持一致
   - 便于维护和更新

2. 完整的翻译覆盖
   - 包含所有界面文本
   - 确保无缺失翻译
   - 保持各语言同步

3. 本地化处理
   - 符合各语言习惯
   - 专业术语准确
   - 考虑文化差异

4. 易于扩展
   - 标准的文件结构
   - 简单的添加流程
   - 支持动态切换

### 使用方式

1. 语言切换
   - 支持运行时切换
   - 自动加载语言包
   - 即时更新界面

2. 默认语言
   - 默认使用简体中文
   - 可配置默认语言
   - 支持浏览器语言检测

3. 语言包加载
   - 按需加载机制
   - 缓存已加载语言
   - 优化加载性能

这个国际化模块为整个打印系统提供了多语言支持,使得系统可以服务于不同语言地区的用户。通过统一的语言包管理和灵活的切换机制,确保了良好的国际化体验。

## 插件模块依赖关系

1. ContextMenuInitializer.js 依赖:
   - jQuery库
   - 样式模块

2. jquery.hiwprint.js 依赖:
   - jQuery库
   - 浏览器打印API

3. qrcode.js 依赖:
   - Canvas/SVG支持
   - UTF-8编码支持

4. watermark.js 依赖:
   - Canvas API
   - DOM操作支持
   - MutationObserver API

## 插件使用方式

1. ContextMenuInitializer

## tables/ - 表格模块说明

### GridColumnManager.js
- 网格列管理器
- 主要���能:
  - 管理表格的网格列结构
  - 提供列索引查找
  - 处理列的显示和隐藏

### HitableEditorModule.js
- 表格编辑器模块
- 主要功能:
  1. 编辑器管理
     - 文本编辑器
     - 选择编辑器
     - 编辑器工厂
  
  2. 单元格编辑
     - 单元格值编辑
     - 格式化处理
     - 事件处理

  3. 表格列管理
     - 列属性设置
     - 列样式处理
     - 列对齐方式

### InitializeTableManagementModule.js
- 表格管理初始化模块
- 主要功能:
  1. 表格选项管理
     - 编辑权限控制
     - 行列操作权限
     - 合并单元格权限
  
  2. 上下文菜单
     - 插入行列
     - 删除行列
     - 对齐方式设置
     - 合并拆分单元格

  3. 表格操作
     - 大小调整
     - 位置移动
     - 样式设置

### RowColumns.js
- 行列管理类
- 主要功能:
  - 管理表格的行列数据
  - 提供行列操作接口
  - 维护行列关系

### SelectCellsByCoordinates.js
- 坐标选择单元格
- 主要功能:
  1. 选择功能
     - 单选功能
     - 多选功能
     - 区域选择
  
  2. 坐标处理
     - 坐标计算
     - 位置判断
     - 选择区域合并

  3. 选择状态管理
     - 清除选择
     - 获取选���单元格
     - 选择状态维护

### TableClass.js
- 表格核心类
- 主要功能:
  1. 表格初始化
     - 列定义
     - 属性设置
     - 事件绑定
  
  2. 列管理
     - 列属性管理
     - 列显示控制
     - 列样式设置

  3. 数据处理
     - 选项实体获取
     - 网格列处理
     - 列对象管理

### TableExcelHelperFuc.js
- Excel辅助功能
- 主要功能:
  1. 表格创建
     - 创建表头
     - 创建表体
     - 创建表尾
  
  2. 数据处理
     - 格式化处理
     - 分组统计
     - 合计功能

  3. 样式处理
     - 单元格样式
     - 对齐方式
     - 边框设置

### TableHandler.js
- 表格处理器
- 主要功能:
  1. 表格操作
     - 插入行列
     - 删除行列
     - 合并拆分单元格
  
  2. 右键菜单
     - 菜单项配置
     - 事件处理
     - 操作权限控制

  3. 大小调整
     - 行高调整
     - 列宽调整
     - 拖拽功能

### TablePrintElementFactory.js
- 表格打印元素工厂
- 主要功能:
  1. 元素创建
     - 创建表格元素
     - 设置属性
     - 初始化事件
  
  2. 打印处理
     - 分页处理
     - 高度计算
     - 内容渲染

  3. 样式管理
     - CSS处理
     - 样式更新
     - 设计视图更新

### TableRow.js
- 表格行类
- 主要功能:
  1. 行管理
     - 行初始化
     - 单元格管理
     - 行操作接口
  
  2. 单元格操作
     - 创建单元格
     - 插入单元格
     - 移除单元格

  3. 选项处理
     - 获取选项实体
     - 初始化选中状态
     - 目标元素管理

## 表格模块依赖关系

1. TableClass 依赖:
   - GridColumnManager
   - TableRow
   - TableHandler

2. TableHandler 依赖:
   - SelectCellsByCoordinates
   - TableExcelHelperFuc
   - HitableEditorModule

3. TablePrintElementFactory 依赖:
   - TableClass
   - TableExcelHelperFuc
   - TableHandler

4. HitableEditorModule 依赖:
   - TableRow
   - RowColumns
   - GridColumnManager

这些模块共同构成了hiprint的表格处理系统,提供了完整的表格创建、编辑、打印等功能。每个模块都有其特定的职责,通过相互配合实现复杂的表格操作功能。

## utils/ - 工具模块说明

### FixCssUrls.js
- CSS URL修复工具
- 主要功能:
  1. URL处理
     - 相对路径转绝对路径
     - 处理数据URI
     - 处理协议相关URL
  
  2. 路径解析
     - 基础URL提取
     - 路径合并
     - 清理URL格式

### GenerateCSSWithSourceMaps.js
- CSS源映射生成器
- 主要功能:
  1. 源映射生成
     - 创建源映射信息
     - 处理媒体查询
     - 合并CSS模块
  
  2. CSS处理
     - 模块导入
     - 样式去重
     - 内容转换

### GeometryUtils.js
- 几何工具类
- 主要功能:
  1. 矩形处理
     - 矩形合并
     - 坐标计算
     - 尺寸调整
  
  2. 坐标系统
     - 坐标转换
     - 位置计算
     - 边界检查

### HiprintUtil.js
- Hiprint核心工具类
- 主要功能:
  1. 事件处理
     - 事件注册
     - 事件触发
     - 事件清理
  
  2. 单位转换
     - pt/px/mm转换
     - DPI计算
     - 尺寸换算
  
  3. 格式化工具
     - 日期格式化
     - 数字格式化
     - 中文大写转换
  
  4. 通用功能
     - 表单序列化
     - 函数节流防抖
     - UTF-8编码转换
     - 数组分组排序

### IdGenerator.js
- ID生成器
- 主要功能:
  - 生成唯一标识符
  - 维护ID计数器
  - 确保ID唯一性

### InitializeHiprintParser.js
- Hiprint解析器初始化
- 主要功能:
  1. 选项解析
     - 数据属性解析
     - 选项合并
     - 类型转换
  
  2. 拖拽计算
     - 长度计算
     - 单位转换
     - 最小移动距离

### SetElementSpacing.js
- 元素间距设置
- 主要功能:
  1. 间距控制
     - 水平间距设置
     - 垂直间距设置
     - 元素对齐
  
  2. 布局调整
     - 元素分布
     - 位置更新
     - 样式应用

### Utils.js
- 通用工具函数
- 主要功能:
  1. 类型判断
     - instanceof实现
     - typeof增强
  
  2. 兼容处理
     - Symbol支持
     - 类型转换
     - 特性检测

## 工具模块依赖关系

1. HiprintUtil 依赖:
   - IdGenerator
   - GeometryUtils
   - Utils

2. InitializeHiprintParser 依赖:
   - HiprintUtil
   - Utils

3. SetElementSpacing 依赖:
   - GeometryUtils
   - Utils

4. FixCssUrls 和 GenerateCSSWithSourceMaps 相互独立

## 工具模块使用场景

1. 样式处理
   - FixCssUrls: 处理CSS中的URL路径
   - GenerateCSSWithSourceMaps: 生成带有源映射的CSS

2. 布局计算
   - GeometryUtils: 处理元素的几何关系
   - SetElementSpacing: 控制元素间距和对齐

3. 核心功能支持
   - HiprintUtil: 提供核心工具方法
   - IdGenerator: 生成唯一标识符
   - InitializeHiprintParser: 解析配置选项
   - Utils: 提供基础工具函数

这些工具模块为整个打印系统提供了基础的工具支持,包括样式处理、布局计算、事件处理等功能,是整个系统正常运行的重要基础设施。

## webSocket/ - WebSocket模块说明

### InitializeWebSocketModule.js
- WebSocket通信初始化模块
- 主要功能:
  1. 连接管理
     - WebSocket连接建立
     - 自动重连机制
     - 连接状态监控
     - 认证token支持
  
  2. 数据通信
     - 数据发送
     - 分片传输
     - 错误处理
     - 事件触发
  
  3. 打印功能
     - 获取打印机列表
     - 刷新打印机状态
     - 获取纸张信息
     - IPP打印支持
  
  4. 客户端管理
     - 获取客户端列表
     - 获取客户端信息
     - 地址信息获取
     - 客户端状态监控

### 主要属性
1. 连接属性
   - opened: 连接状态
   - host: 服务器地址
   - token: 认证令牌
   - state: 连接状态
   - socket: WebSocket实例

2. 重连配置
   - reconnectTimeout: 重连超时时间
   - reconnectDelay: 重连延迟时间
   - reconnectWindowSetTimeout: 重连定时器

3. 数据缓存
   - printerList: 打印机列表
   - clients: 客户端列表
   - clientInfo: 客户端信息
   - paperSize: 纸张尺寸信息

### 核心方法
1. 连接控制   ```javascript
   start(callback) // 启动连接
   stop() // 停止连接
   reconnect() // 重新连接
   setHost(host, token, callback) // 设置服务器   ```

2. 数据发送   ```javascript
   send(data) // 发送数据
   sendByFragments(content) // 分片发送   ```

3. 打印相关   ```javascript
   getPrinterList() // 获取打印机列表
   refreshPrinterList() // 刷新打印机列表
   getPaperSizeInfo(printer) // 获取纸张信息
   ippPrint(options) // IPP打印
   ippRequest(options) // IPP请求   ```

4. 客户端管理   ```javascript
   getClients() // 获取客户端列表
   getClientInfo() // 获取客户端信息
   getAddress(type, ...args) // 获取地址信息   ```

### 事件处理
1. 连接事件
   - connect: 连接成功
   - connect_error: 连接错误
   - disconnect: 连接断开

2. 打印事件
   - success: 打印成功
   - error: 打印错误
   - printerList: 打印机列表更新
   - paperSizeInfo: 纸张信息更新

3. 客户端事件
   - clients: 客户端列表更新
   - clientInfo: 客户端信息更新
   - address: 地址信息更新

4. IPP事件
   - ippPrinterConnected: IPP打印机连接
   - ippPrinterCallback: IPP打印回调
   - ippRequestCallback: IPP请求回调

### 使用示例
1. 初始化连接
