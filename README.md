# jerrywen_demo

## create mongodb
docker run --name mongodb -d -p 27017:27017 mongo

## create redis
docker run --name redis -p 6379:6379 -d redis

## copy env
mv .env.sample .env

再將裡面的值填上

## service-account-key
請在 secret folder 內建立 service-account-key.json 檔案

為 firebase 服務帳戶的私鑰文件, Admin SDK 會需要用到

## html
index.html #60

axios.defaults.baseURL = 'https://35.221.156.56:3000'

如果是 run local server, 這邊請改成 local server 的 host, localhost:3000 之類的

已註銷, 目前無架設測試的 api server

~~不確定 https://35.221.156.56:3000 在您們測試時會不會有意外~~

~~如果 api 不能打請跟我說一聲, 我再去 gcp 的 vm 上確認一下, 不好意思~~  
~~改完後請 firebase deploy, 至 firebase 託管~~

## db init
node init_fixtures.js

## run api server
node src/bin/server.js

## demo 網站
~~https://jerrywen.web.app/~~

目前無架設測試的 api server,僅保存 firebase 的測試頁面

## 流程

登入後會看是要更新 user 或是新增 user 至 db,  
並取得 idToken, refreshToken,

如果 idToken expired 時點擊 get user info, 會取得 401  
接著會打 refresh 取得新的 idToken, refreshToken

點擊 revoke id token 後, 會將此 idToken 加進 redis 黑名單,  
這時再去點 get user info 會得到 403, 並清除瀏覽器上的 token,
需再重新登入
