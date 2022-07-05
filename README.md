<a href="https://www.npmjs.com/package/tossify">NPM</a>

## tossify 

Promise-based HTTP Client using Browser native fetch. Highly inspired by axios.


## Usage

 npm:
```
$ npm install tossify
```
 Yarn:
```
$ yarn add tossify
```
## Example
```
import { Tossify } from 'tossify';

const tossifyClient = new Tossify({
	baseURL: ENV.CORE_END_POINT,
	headers: {
		'x-client-name': 'WEB'
	},
	enableLogger: !ENV.IS_PRODUCTION
});
tossifyClient.interceptors.request = async (config: RavenRequest) => {
  // Here you can intercept each request.
	return config;
};
tossifyClient.interceptors.response = async (response: RavenResponse) => {
  // Here you can intercept each response.
	return response;
};

```


<!-- CONTACT -->
## Contact

 [@jobayerdev](https://twitter.com/jobayerdev) - jobayerhossain977@gmail.com

Project Link: [https://github.com/jobayer977/tossify](https://github.com/jobayer977/tossify)


