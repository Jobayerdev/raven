import { ITossifyInstance, ITossifyRequest, ITossifyRequestHeaders, ITossifyResponse, RavenSend } from './types';
export declare class Tossify {
    baseURL: string;
    headers: ITossifyRequestHeaders;
    enableLogger: boolean;
    constructor(options: ITossifyInstance);
    get(url: string, config?: ITossifyRequest): Promise<ITossifyResponse<{}>>;
    post(url: string, data: any, config?: ITossifyRequest): Promise<ITossifyResponse<{}>>;
    put(url: string, data: any, config?: ITossifyRequest): Promise<ITossifyResponse<{}>>;
    delete(url: string, config?: ITossifyRequest): Promise<ITossifyResponse<{}>>;
    interceptors: {
        request: (config: ITossifyRequest) => Promise<ITossifyRequest>;
        response: (response: ITossifyResponse) => Promise<ITossifyResponse>;
    };
    build({ method, url, data, config }: RavenSend): Promise<ITossifyResponse<{}>>;
    private logger;
}
