import {
	IRavenInstance,
	RavenRequest,
	RavenRequestHeaders,
	RavenResponse,
	RavenSend,
} from "./model"
export class Raven {
	baseURL: string
	headers: RavenRequestHeaders = {}
	enableLogger: boolean = false
	constructor(options: IRavenInstance) {
		this.baseURL = options.baseURL
		this.headers = options.headers
		this.enableLogger = options.enableLogger
	}
	get(url: string, config?: RavenRequest) {
		return this.build({ method: "GET", url, config })
	}
	post(url: string, data: any, config?: RavenRequest) {
		return this.build({ method: "POST", url, config, data })
	}
	put(url: string, data: any, config?: RavenRequest) {
		return this.build({ method: "PUT", data, url, config })
	}
	delete(url: string, config?: RavenRequest) {
		return this.build({ method: "DELETE", url, config })
	}
	interceptors = {
		request: async (config: RavenRequest): Promise<RavenRequest> => {
			return Promise.resolve(config)
		},
		response: async (response: RavenResponse): Promise<RavenResponse> => {
			return Promise.resolve(response)
		},
	}
	async build({ method, url, data, config }: RavenSend) {
		try {
			const options: RavenRequest = {
				method,
				headers: {},
				...config,
			}
			if (isFormData(data)) {
				options.body = data
				options.headers = {
					"Content-Type": "multipart/form-data",
					...toSafeObject(this.headers),
					...toSafeObject(options.headers),
				}
			} else {
				options.body = JSON.stringify(data)
				options.headers = {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
					...toSafeObject(this.headers),
					...toSafeObject(options.headers),
				}
			}
			const uri = new URL(`${this.baseURL}${url}`).toString()
			const requestOptions = await this.interceptors.request(options)
			const buildFetch = await fetch(uri, requestOptions)
			const json = await buildFetch.text()
			const buildResponse = await this.interceptors.response({
				data: isJson(json) ? JSON.parse(json) : json,
				status: buildFetch.status,
				statusText: buildFetch.statusText,
				headers: buildFetch.headers,
				ok: buildFetch.ok,
				redirected: buildFetch.redirected,
				type: buildFetch.type,
				url: buildFetch.url,
			} as RavenResponse)
			if (this.enableLogger) {
				this.logger(options, buildResponse)
			}
			if (buildFetch.ok) {
				return buildResponse
			} else {
				throw buildResponse
			}
		} catch (error) {
			throw {
				message: error.message,
			}
		}
	}
	private logger(options: RavenRequest, result: RavenResponse) {
		const method = options.method || "GET"
		const name = method + " " + result?.url
		console.groupCollapsed(name)
		console.time(name)
		if (options.headers) {
			console.groupCollapsed("Request headers")
			Object.entries(options.headers).forEach((key) => {
				console.log(key[0] + ": " + key[1])
			})
			console.groupEnd()
		}
		console.group("Response")
		console.timeEnd(name)
		if (!result.status) {
			console.log(result)
			console.groupEnd()
			console.groupEnd()
			throw result
		}
		console.info("Status: " + result.status + " " + result.statusText)
		console.info(result.url)
		if (result.headers) {
			console.group("Response headers")
			result.headers.forEach(function (h) {
				console.log(h)
			})
			console.groupEnd()
		}
		//@ts-ignore
		if (options._processBody !== false) {
			console.groupCollapsed("Response body")
			console.log(result?.data)
			console.groupEnd()
		}
		console.groupEnd()
		console.groupEnd()
	}
}
const isFormData = (data: any): data is FormData => {
	return data instanceof FormData
}
const isJson = (data: any): data is string => {
	return typeof data === "string" && JSON.parse(data)
}
const toSafeObject = (value: any) => {
	const isValid = typeof value === "object" && value !== null
	if (isValid) {
		return value
	}
	return {}
}
