export interface ITossifyRequest {
    body?: BodyInit | null;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    headers?: {
        [header: string]: any;
    };
    integrity?: string;
    keepalive?: boolean;
    method?: string;
    mode?: RequestMode;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal | null;
    window?: null;
}
export interface ITossifyResponse<T = {}> {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): ITossifyResponse;
    readonly body: ReadableStream<Uint8Array> | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
    data: Partial<T>;
}
export declare type Method = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'purge' | 'PURGE' | 'link' | 'LINK' | 'unlink' | 'UNLINK';
export interface ITossifyInstance {
    baseURL?: string;
    headers?: ITossifyRequestHeaders;
    enableLogger?: boolean;
}
export declare type ITossifyRequestHeaders = Record<string, string | number | boolean>;
export interface RavenSend {
    method?: Method;
    url?: string;
    data?: any;
    config?: ITossifyRequest;
}
export declare class ITossifyError implements Error, Partial<ITossifyResponse> {
    name: string;
    message: string;
    stack?: string;
    cause?: Error;
    headers: Headers;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: ResponseType;
    url: string;
    body: ReadableStream<Uint8Array>;
    bodyUsed: boolean;
    data: any;
    constructor(response: ITossifyResponse);
}
export interface ITossifyLogger {
    request?: ITossifyRequest;
    response?: ITossifyResponse;
}
