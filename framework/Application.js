const EventEmitter = require("events");
const http = require("http");

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middleware = [];
  }
  addRoute(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }
  _createServer() {
    return http.createServer((req, res) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        if (body) {
          req.body = JSON.parse(body);
        }
        this.middleware.forEach((middleware) => {
          middleware(req, res);
        });
        const emitted = this.emitter.emit(
          this._getRouteMask(req.pathname, req.method),
          req,
          res
        );
        if (!emitted) {
          res.end();
        }
      });
    });
  }
  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
  listen(port, callback) {
    this.server.listen(port, callback);
  }
  use(middleware) {
    this.middleware.push(middleware);
  }
};
