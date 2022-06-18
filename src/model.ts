export interface TossifyRequest {
	body?: BodyInit | null
	cache?: RequestCache
	credentials?: RequestCredentials
	headers?: {
		[header: string]: any
	}
	integrity?: string
	keepalive?: boolean
	method?: string
	mode?: RequestMode
	redirect?: RequestRedirect
	referrer?: string
	referrerPolicy?: ReferrerPolicy
	signal?: AbortSignal | null
	window?: null
}
export interface TossifyResponse<T = {}> {
	readonly headers: Headers
	readonly ok: boolean
	readonly redirected: boolean
	readonly status: number
	readonly statusText: string
	readonly type: ResponseType
	readonly url: string
	clone(): TossifyResponse
	readonly body: ReadableStream<Uint8Array> | null
	readonly bodyUsed: boolean
	arrayBuffer(): Promise<ArrayBuffer>
	blob(): Promise<Blob>
	formData(): Promise<FormData>
	json(): Promise<any>
	text(): Promise<string>
	data: T
}
export type Method =
	| 'get'
	| 'GET'
	| 'delete'
	| 'DELETE'
	| 'head'
	| 'HEAD'
	| 'options'
	| 'OPTIONS'
	| 'post'
	| 'POST'
	| 'put'
	| 'PUT'
	| 'patch'
	| 'PATCH'
	| 'purge'
	| 'PURGE'
	| 'link'
	| 'LINK'
	| 'unlink'
	| 'UNLINK'
export interface ITossifyInstance {
	baseURL?: string
	headers?: TossifyRequestHeaders
	enableLogger?: boolean
}
export type TossifyRequestHeaders = Record<string, string | number | boolean>
export interface TossifySend {
	method?: Method
	url?: string
	data?: any
	config?: TossifyRequest
}
export class TossifyError implements Error, Partial<TossifyResponse> {
	name: string
	message: string
	stack?: string
	cause?: Error
	headers: Headers
	ok: boolean
	redirected: boolean
	status: number
	statusText: string
	type: ResponseType
	url: string
	body: ReadableStream<Uint8Array>
	bodyUsed: boolean
	data: any
	constructor(response: TossifyResponse) {
		this.name = 'TossifyError'
		this.message = response.statusText
		this.headers = response.headers
		this.ok = response.ok
		this.redirected = response.redirected
		this.status = response.status
		this.statusText = response.statusText
		this.type = response.type
		this.url = response.url
		this.body = response.body
		this.bodyUsed = response.bodyUsed
		this.data = response.data
	}
}
export interface ILogger {
	request?: TossifyRequest
	response?: TossifyResponse
}
