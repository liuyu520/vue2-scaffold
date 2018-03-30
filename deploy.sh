#!/usr/bin/env bash
npm run build
axxx="/Users/whuanghkl/code/mygit/back/axxx/src/main/webapp/src/js"
appjs="${axxx}/package/js/app.7af8d5.js"
find dist/js -name "app.*.js" | xargs -I {}  cp {} $appjs
find dist/js -name "vendor.*.js" | xargs -I {}  cp {} ${axxx}/package/js/vendor.e17316.js
sed -i '' 's/http:\/\/store2.chanjet.com//g'  $appjs
sed -i '' 's/http:\/\/xxx.com//g'  $appjs
sed -i '' 's/https:\/\/xxx.com//g'  $appjs
sed -i '' 's/mode_debug = true/mode_debug = false/g'  $appjs
sed -i '' 's/redirectWhenError = false/redirectWhenError = true/g'  $appjs
sed -i '' '/^[^#]*alert(/d'  $appjs