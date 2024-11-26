export default function (module, exports) {
  /**
   * HiWebSocket 类 - 用于处理打印服务的WebSocket连接
   * 主要功能:
   * 1. 建立和维护与打印服务器的WebSocket连接
   * 2. 发送打印数据和获取打印机信息
   * 3. 处理打印任务的分片发送
   * 4. 管理打印机列表和客户端信息
   */
  class HiWebSocket {
    constructor() {
      // WebSocket连接状态
      this.opened = false; // 表示WebSocket是否已打开
      this.name = "webSockets"; // WebSocket的名称
      // 默认连接配置
      this.host = "http://localhost:17521"; // WebSocket服务器地址
      this.token = "vue-plugin-hiprint"; // 认证令牌
      this.reconnectTimeout = 60000; // 重连超时时间
      this.reconnectWindowSetTimeout = null; // 重连定时器
      this.reconnectDelay = 2000; // 重连延迟
      this.state = "connected"; // 当前连接状态
      this.socket = null; // WebSocket实例
      
      // 存储数据的属性
      this.printerList = []; // 打印机列表
      this.clients = []; // 客户端列表
      this.clientInfo = []; // 客户端详细信息
      this.paperSize = []; // 纸张尺寸信息
    }

    /**
     * 检查是否支持保持连接
     * @returns {boolean} 始终返回true
     */
    supportsKeepAlive() {
      return true;
    }

    /**
     * 检查是否存在Socket.io客户端
     * @returns {boolean} 是否存在window.io对象
     */
    hasIo() {
      return window.io;
    }

    /**
     * 发送数据到服务器
     * @param {Object} data 要发送的数据
     */
    send(data) {
      try {
        this.socket.emit("news", data); // 通过WebSocket发送数据
      } catch (error) {
        console.log("send data error:" + (data || "") + JSON.stringify(error)); // 发送错误日志
      }
    }

    /**
     * 分片发送大量数据
     * @param {Object} content 包含html内容和配置的对象
     * @param {number} content.fragmentSize 每个分片的大小，默认50000
     * @param {number} content.sendInterval 发送间隔，默认10ms
     * @param {string} content.html HTML内容
     */
    sendByFragments(content) {
      try {
        const {
          fragmentSize = 50000, // 每个分片的大小
          sendInterval = 10, // 发送间隔
          html, // HTML内容
          generateHTMLInterval,
          printByFragments,
          ...otherFields
        } = content;
        const contentToSplit = content.html;
        const charsCount = contentToSplit.length; // HTML内容的字符数
        const fragmentsCount = Math.ceil(charsCount / fragmentSize); // 计算分片数量
        Array.apply(undefined, { length: fragmentsCount }).forEach(
          (item, index) => {
            const startIndex = index * fragmentSize; // 分片起始索引
            const endIndex =
              index + 1 === fragmentSize
                ? charsCount
                : (index + 1) * fragmentSize; // 分片结束索引
            setTimeout(() => {
              this.socket.emit("printByFragments", {
                ...otherFields,
                index, // 当前分片索引
                total: fragmentsCount, // 总分片数
                htmlFragment: html.slice(startIndex, endIndex), // 当前分片内容
              });
            }, sendInterval * index); // 按间隔发送分片
          }
        );
      } catch (error) {
        console.log(
          "send data fragment error:" + (content || "") + JSON.stringify(error)
        ); // 分片发送错误日志
      }
    }

    // 获取打印机列表
    getPrinterList() {
      return this.printerList;
    }

    // 刷新打印机列表
    refreshPrinterList() {
      try {
        this.socket.emit("refreshPrinterList"); // 请求刷新打印机列表
      } catch (error) {
        console.log("refreshPrinterList error:" + JSON.stringify(error)); // 刷新错误日志
      }
    }

    // 获取纸张尺寸信息
    getPaperSizeInfo(printer) {
      try {
        console.warn("getPaperSizeInfo 是一个测试功能，仅win客户端支持该api！");
        this.socket.emit("getPaperSizeInfo", printer); // 请求纸张尺寸信息
      } catch (error) {
        console.log("getPaperSizeInfo error:" + JSON.stringify(error)); // 获取错误日志
      }
    }

    // 获取客户端列表
    getClients() {
      try {
        this.socket.emit("getClients"); // 请求客户端列表
      } catch (error) {
        console.log("getClients error:" + JSON.stringify(error)); // 获取错误日志
      }
    }

    // 获取客户端详细信息
    getClientInfo() {
      try {
        this.socket.emit("getClientInfo"); // 请求客户端信息
      } catch (error) {
        console.log("getClientInfo error:" + JSON.stringify(error)); // 获取错误日志
      }
    }

    // 获取地址信息
    getAddress(type, ...args) {
      try {
        this.socket.emit("address", type, ...args); // 请求地址信息
      } catch (error) {
        console.log("getAddress error:" + JSON.stringify(error)); // 获取错误日志
      }
    }

    // 发送IPP打印请求
    ippPrint(options) {
      try {
        this.socket.emit("ippPrint", options); // 发送IPP打印请求
      } catch (error) {
        console.log("ippPrint error:" + JSON.stringify(error)); // 发送错误日志
      }
    }

    // 发送IPP请求
    ippRequest(options) {
      try {
        this.socket.emit("ippRequest", options); // 发送IPP请求
      } catch (error) {
        console.log("ippRequest error:" + JSON.stringify(error)); // 发送错误日志
      }
    }

    /**
     * 设置WebSocket服务器地址和认证令牌
     * @param {string} host 服务器地址
     * @param {string} [token] 认证令牌
     * @param {Function} [callback] 连接回调函数
     */
    setHost(host, token, callback) {
      if (typeof token === "function") {
        callback = token;
        token = undefined;
      }
      this.host = host; // 设置服务器地址
      this.token = token; // 设置认证令牌
      this.stop(); // 停止当前连接
      this.start(callback); // 启动新连接
    }

    /**
     * 启动WebSocket连接
     * @param {Function} callback 连接状态回调函数
     */
    start(callback) {
      const self = this;
      if (window.WebSocket) {
        if (!this.socket) {
          this.socket = window.io(this.host, {
            transports: ["websocket"], // 使用WebSocket传输
            reconnectionAttempts: 5, // 重连尝试次数
            auth: {
              token: this.token, // 认证令牌
            },
          });

          this.socket.on("connect", function (event) {
            self.opened = true; // 设置连接状态为打开
            console.log("Websocket opened.");
            self.state = "connected"; // 更新连接状态
            self.setupSocketListeners(); // 设置事件监听器
            callback && callback(true, event); // 调用回调函数
          });

          this.socket.on("connect_error", function (error) {
            console.error(error); // 连接错误日志
            hinnn.event.trigger("connect_error", error); // 触发连接错误事件
          });

          this.socket.on("disconnect", function () {
            self.opened = false; // 设置连接状态为关闭
            callback && callback(false); // 调用回调函数
          });
        }
      } else {
        console.log("WebSocket start fail"); // WebSocket不支持日志
        callback && callback(false); // 调用回调函数
      }
    }

    /**
     * 设置Socket事件监听器
     * 处理打印成功、错误、客户端信息等事件
     * @private
     */
    setupSocketListeners() {
      const self = this;
      const events = {
        success: (data) =>
          hinnn.event.trigger("printSuccess_" + data.templateId, data), // 打印成功事件
        error: (data) =>
          hinnn.event.trigger("printError_" + data.templateId, data), // 打印错误事件
        clients: (clients) => {
          self.clients = clients; // 更新客户端列表
          hinnn.event.trigger("clients", clients); // 触发客户端事件
        },
        clientInfo: (clientInfo) => {
          self.clientInfo = clientInfo; // 更新客户端信息
          hinnn.event.trigger("clientInfo", clientInfo); // 触发客户端信息事件
        },
        printerList: (data) => {
          self.printerList = data; // 更新打印机列表
          hinnn.event.trigger("printerList", data); // 触发打印机列表事件
        },
        paperSizeInfo: (data) => {
          self.paperSize = Array.isArray(data) ? data : [data]; // 更新纸张尺寸信息
          hinnn.event.trigger("paperSizeInfo", self.paperSize); // 触发纸张尺寸事件
        },
        address: (type, addr, data) => {
          hinnn.event.trigger("address_" + type, { addr, data }); // 触发地址事件
        },
        ippPrinterConnected: (printer) =>
          hinnn.event.trigger("ippPrinterConnected", printer), // IPP打印机连接事件
        ippPrinterCallback: (error, response) => {
          hinnn.event.trigger("ippPrinterCallback", { error, response }); // IPP打印机回调事件
        },
        ippRequestCallback: (error, response) => {
          hinnn.event.trigger("ippRequestCallback", { error, response }); // IPP请求回调事件
        },
      };

      Object.keys(events).forEach((event) => {
        this.socket.on(event, events[event]); // 为每个事件设置监听器
      });
    }

    /**
     * 重新连接WebSocket服务器
     */
    reconnect() {
      if (this.state === "connected" || this.state === "reconnecting") {
        this.stop(); // 停止当前连接
        if (this.ensureReconnectingState()) {
          console.log("Websocket reconnecting."); // 重连日志
          this.start(); // 启动新连接
        }
      }
    }

    /**
     * 停止WebSocket连接
     */
    stop() {
      if (this.socket) {
        console.log("Closing the Websocket."); // 关闭连接日志
        this.socket.close(); // 关闭WebSocket
        this.socket = null; // 清空WebSocket实例
        this.printerList = []; // 清空打印机列表
      }
    }

    /**
     * 确保重连状态
     * @private
     * @returns {boolean} 是否处于重连状态
     */
    ensureReconnectingState() {
      this.state = "reconnecting"; // 设置状态为重连中
      return this.state === "reconnecting"; // 返回重连状态
    }
  }

  // 创建全局实例
  window.hiwebSocket = new HiWebSocket(); // 将HiWebSocket实例挂载到全局window对象
}