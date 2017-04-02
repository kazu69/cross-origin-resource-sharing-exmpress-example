## Cross-Origin Resource Sharing Example

It is a sample to try Cross Origin Resource Sharing using Express.

### Start Up

```sh
yarn
yarn run build:keys
yarn start # server up with port 3000
PORT=3001 yarn start # server up with port 3001

open http://127.0.01:3001
```

### CORS

url | status
--- | ---
http://127.0.01:3001/no-cors | no cors request
http://127.0.01:3001/cors | cors request
http://127.0.01:3001/cros-with-credentials | cors request with credentials

```no cors request``` can not access resources acquired by http request.
When you make a ```cors request```, you can operate on acquired resources.
And if you also manipulate cookies please use ```ros-with-credentials request```.

#### Request with CORS

HTTP Request Header and HTTP Response Header

```
# Request Header
OPTIONS /cros/ HTTP/1.1
Host: 127.0.0.1:3000
Connection: keep-alive
Access-Control-Request-Method: GET
Origin: https://127.0.0.1:3001
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36
Access-Control-Request-Headers: x-custom-header
Accept: */*
DNT: 1
Referer: https://127.0.0.1:3001/cros/
Accept-Encoding: gzip, deflate, sdch, br
Accept-Language: ja,en-US;q=0.8,en;q=0.6

# Response Header
HTTP/1.1 200 OK
X-Powered-By: Express
set-cookie: example=0.6767570391231008; Max-Age=86; Path=/; Expires=Thu, 23 Mar 2017 13:49:13 GMT; HttpOnly
set-cookie: connect.sid=s%3AebdnoA5XfiJBSma9g9i-PMzsTbTzHH16.dlGmLYU26FIAgP8SYyhV9cOWJ%2FP0caflOexh5%2FmkZkk; Path=/; HttpOnly
Access-Control-Allow-Origin: https://127.0.0.1:3001
Access-Control-Max-Age:86400
Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS
Access-Control-Allow-Headers: Content-type,Accept,X-Custom-Header
Content-Type: text/plain; charset=utf-8
Content-Length: 2
ETag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"
Date: Thu, 23 Mar 2017 13:47:47 GMT
Connection: keep-alive
```

#### Credentials Request with CORS

HTTP Request Header and HTTP Response Header

```
# Request
OPTIONS /cros-with-credentials/ HTTP/1.1
Host: 127.0.0.1:3000
Connection: keep-alive
Access-Control-Request-Method: GET
Origin: https://127.0.0.1:3001
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36
Access-Control-Request-Headers: x-custom-header
Accept: */*
DNT: 1
Referer: https://127.0.0.1:3001/cros-with-credentials/
Accept-Encoding: gzip, deflate, sdch, br
Accept-Language: ja,en-US;q=0.8,en;q=0.6

# Response
HTTP/1.1 200 OK
X-Powered-By: Express
set-cookie: example=0.654153584678103; Max-Age=86; Path=/; Expires=Thu, 23 Mar 2017 16:10:43 GMT; HttpOnly
set-cookie: connect.sid=s%3AM9NQy3hz5cLb3kW6htuybWE6nEX1_iL6.ENXqiTfVPMQVyP%2FGFZ9pshnC87D7rX5%2BM48mjVqwR7s; Path=/; HttpOnly
Access-Control-Allow-Origin: https://127.0.0.1:3001
Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS
Access-Control-Max-Age: 86400
Access-Control-Allow-Headers: Content-type,Accept,X-Custom-Header
Access-Control-Allow-Credentials: true
Content-Type: text/plain; charset=utf-8
Content-Length: 2
ETag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"
Date: Thu, 23 Mar 2017 16:09:17 GMT
Connection: keep-alive
```
