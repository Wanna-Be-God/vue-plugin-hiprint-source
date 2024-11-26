export default function (module, exports) {
  class HiWebSocket {
    constructor() {
      this.opened = false;
      this.name = "webSockets";
      this.host = "http://localhost:17521";
      this.token = "vue-plugin-hiprint";
      this.reconnectTimeout = 60000;
      this.reconnectWindowSetTimeout = null;
      this.reconnectDelay = 2000;
      this.state = "connected";
      this.socket = null;
      this.printerList = [];
      this.clients = [];
      this.clientInfo = [];
      this.paperSize = [];
    }

    supportsKeepAlive() {
      return true;
    }

    hasIo() {
      return window.io;
    }

    send(data) {
      try {
        this.socket.emit("news", data);
      } catch (error) {
        console.log("send data error:" + (data || "") + JSON.stringify(error));
      }
    }

    sendByFragments(content) {
      try {
        const {
          fragmentSize = 50000,
          sendInterval = 10,
          html,
          generateHTMLInterval,
          printByFragments,
          ...otherFields
        } = content;
        const contentToSplit = content.html;
        const charsCount = contentToSplit.length;
        const fragmentsCount = Math.ceil(charsCount / fragmentSize);
        Array.apply(undefined, { length: fragmentsCount }).forEach(
          (item, index) => {
            const startIndex = index * fragmentSize;
            const endIndex =
              index + 1 === fragmentSize
                ? charsCount
                : (index + 1) * fragmentSize;
            setTimeout(() => {
              this.socket.emit("printByFragments", {
                ...otherFields,
                index,
                total: fragmentsCount,
                htmlFragment: html.slice(startIndex, endIndex),
              });
            }, sendInterval * index);
          }
        );
      } catch (error) {
        console.log(
          "send data fragment error:" + (content || "") + JSON.stringify(error)
        );
      }
    }

    getPrinterList() {
      return this.printerList;
    }

    refreshPrinterList() {
      try {
        this.socket.emit("refreshPrinterList");
      } catch (error) {
        console.log("refreshPrinterList error:" + JSON.stringify(error));
      }
    }

    getPaperSizeInfo(printer) {
      try {
        console.warn("getPaperSizeInfo 是一个测试功能，仅win客户端支持该api！");
        this.socket.emit("getPaperSizeInfo", printer);
      } catch (error) {
        console.log("getPaperSizeInfo error:" + JSON.stringify(error));
      }
    }

    getClients() {
      try {
        this.socket.emit("getClients");
      } catch (error) {
        console.log("getClients error:" + JSON.stringify(error));
      }
    }

    getClientInfo() {
      try {
        this.socket.emit("getClientInfo");
      } catch (error) {
        console.log("getClientInfo error:" + JSON.stringify(error));
      }
    }

    getAddress(type, ...args) {
      try {
        this.socket.emit("address", type, ...args);
      } catch (error) {
        console.log("getAddress error:" + JSON.stringify(error));
      }
    }

    ippPrint(options) {
      try {
        this.socket.emit("ippPrint", options);
      } catch (error) {
        console.log("ippPrint error:" + JSON.stringify(error));
      }
    }

    ippRequest(options) {
      try {
        this.socket.emit("ippRequest", options);
      } catch (error) {
        console.log("ippRequest error:" + JSON.stringify(error));
      }
    }

    setHost(host, token, callback) {
      if (typeof token === "function") {
        callback = token;
        token = undefined;
      }
      this.host = host;
      this.token = token;
      this.stop();
      this.start(callback);
    }

    start(callback) {
      const self = this;
      if (window.WebSocket) {
        if (!this.socket) {
          this.socket = window.io(this.host, {
            transports: ["websocket"],
            reconnectionAttempts: 5,
            auth: {
              token: this.token,
            },
          });

          this.socket.on("connect", function (event) {
            self.opened = true;
            console.log("Websocket opened.");
            self.state = "connected";
            self.setupSocketListeners();
            callback && callback(true, event);
          });

          this.socket.on("connect_error", function (error) {
            console.error(error);
            hinnn.event.trigger("connect_error", error);
          });

          this.socket.on("disconnect", function () {
            self.opened = false;
            callback && callback(false);
          });
        }
      } else {
        console.log("WebSocket start fail");
        callback && callback(false);
      }
    }

    setupSocketListeners() {
      const self = this;
      const events = {
        success: (data) =>
          hinnn.event.trigger("printSuccess_" + data.templateId, data),
        error: (data) =>
          hinnn.event.trigger("printError_" + data.templateId, data),
        clients: (clients) => {
          self.clients = clients;
          hinnn.event.trigger("clients", clients);
        },
        clientInfo: (clientInfo) => {
          self.clientInfo = clientInfo;
          hinnn.event.trigger("clientInfo", clientInfo);
        },
        printerList: (data) => {
          self.printerList = data;
          hinnn.event.trigger("printerList", data);
        },
        paperSizeInfo: (data) => {
          self.paperSize = Array.isArray(data) ? data : [data];
          hinnn.event.trigger("paperSizeInfo", self.paperSize);
        },
        address: (type, addr, data) => {
          hinnn.event.trigger("address_" + type, { addr, data });
        },
        ippPrinterConnected: (printer) =>
          hinnn.event.trigger("ippPrinterConnected", printer),
        ippPrinterCallback: (error, response) => {
          hinnn.event.trigger("ippPrinterCallback", { error, response });
        },
        ippRequestCallback: (error, response) => {
          hinnn.event.trigger("ippRequestCallback", { error, response });
        },
      };

      Object.keys(events).forEach((event) => {
        this.socket.on(event, events[event]);
      });
    }

    reconnect() {
      if (this.state === "connected" || this.state === "reconnecting") {
        this.stop();
        if (this.ensureReconnectingState()) {
          console.log("Websocket reconnecting.");
          this.start();
        }
      }
    }

    stop() {
      if (this.socket) {
        console.log("Closing the Websocket.");
        this.socket.close();
        this.socket = null;
        this.printerList = [];
      }
    }

    ensureReconnectingState() {
      this.state = "reconnecting";
      return this.state === "reconnecting";
    }
  }

  window.hiwebSocket = new HiWebSocket();
}
