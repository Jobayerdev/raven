export class ITossifyError {
    constructor(response) {
        this.name = "RavenError";
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
}
//# sourceMappingURL=model.js.map