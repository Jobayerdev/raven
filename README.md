
![image info](https://raw.githubusercontent.com/jobayer977/tossify/master/docs/tossify-logo.png)
 
  

## Installation  

To install run the following script from the root of your project's directory:

Using Npm
```
npm install tossify 
```
Useing Yarn
```
yarn add tossify 
```
  

# Tossify

  

**Description**: Promise-based HTTP Client using Browser native fetch.  inspired by axios.

Browser Most Popular Http clients are using XHR requests. Where native fetch is a cleaner API. 
It's built with browser native fetch which enables a clearer and simpler API. And Tossify wrapper is enabled to intercept the request and respond to a simple logger.

**Example**
```
import {
    ITossifyResponse
} from 'tossify/dist/types'
import {
    Tossify
} from 'tossify'


const tossifyClient = new Tossify({
    baseURL: 'https://yoursite.com',
})
const get = async () => {
    try {
        const response: ITossifyResponse < {} > = await tossifyClient.get('/posts')
    } catch (error) {
        console.log(error)
    } finally {}
}
const delete = async (id: number) => {
    try {
        await tossifyClient.delete(`/posts/${id}`)
    } catch (error) {} finally {}
}
const post = async (payload) => {
    try {
        const res = await tossifyClient.post('/posts', payload)
    } catch (error) {
        console.log(error)
    } finally {}
}
```
  
  

## Dependencies

  ```
"@types/node":  "^17.0.42",
"ts-node":  "^10.8.1",
"tslib":  "^2.4.0",
"typescript":  "^4.7.3"
  ```

 

  

## Configuration

```
new Tossify({
	// base url
	baseURL:  'https://jsonplaceholder.typicode.com', 
	// Enable Built in Logger
	enableLogger:  true, 
	// Initial Headers
	headers:  {
		'Content-Type':  'application/json',
	},
})
```

## Exmaple

[Svelte CURD Example  ](https://github.com/jobayer977/tossify/tree/master/examples/svelte)
  



 



  
