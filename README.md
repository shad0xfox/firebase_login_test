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

不確定 https://35.221.156.56:3000 在您們測試時會不會有意外
如果 api 不能打請跟我說一聲, 我再去 gcp 的 vm 上確認一下, 不好意思

改完後請 firebase deploy, 至 firebase 託管

## db init
node init_fixtures.js

## run api server
node src/bin/server.js

## demo 網站
https://jerrywen.web.app/

## 流程

登入後會看是要更新 user 或是新增 user 至 db,  
並取得 idToken, refreshToken,

如果 idToken expired 時點擊 get user info, 會取得 401  
接著會打 refresh 取得新的 idToken, refreshToken

點擊 revoke id token 後, 會將此 idToken 加進 redis 黑名單,  
這時再去點 get user info 會得到 403, 並清除瀏覽器上的 token,
需再重新登入

## 延伸問題

因應安全需求，我們想要提前將 idToken revoke，建議的方案是？
> 目前做法是加進黑名單管理, 並設置 3hr 的ttl, 但可能改成 revoke refresh token 會比較合適  
> 將 idToken expire 時間設短, 雖然封鎖會比較不即時, 但就不需要每次都先檢查 id token 有沒有在黑名單內

欲支援 Refresh Token 來維持 Token 更新，持續運行的話，建議的方案是？
> 如果 idToken 過期, 打 api 會得到 401, 接下來會帶著 refreshToken 去拿新的 idToken 跟 refreshToken, 如果又失敗那就將 client 端的資料清掉, 請 user 重新走 firebase 的登入。