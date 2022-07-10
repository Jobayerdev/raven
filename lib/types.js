"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITossifyError = void 0;
var ITossifyError = /** @class */ (function () {
    function ITossifyError(response) {
        this.name = 'RavenError';
        this.message = response.statusText;
        this.headers = response.headers;
        this.ok = response.ok;
        this.redirected = response.redirected;
        this.status = response.status;
        this.statusText = response.statusText;
        this.type = response.type;
        this.url = response.url;
        this.body = response.body;
        this.bodyUsed = response.bodyUsed;
        this.data = response.data;
    }
    return ITossifyError;
}());
exports.ITossifyError = ITossifyError;
