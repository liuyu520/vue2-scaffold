#!/usr/bin/env bash
npm run build
chanjet_web_store="/Users/whuanghkl/code/mygit/back/chanjet_web_store/src/main/webapp/src/js"
appjs="${chanjet_web_store}/package/js/app.7af8d5.js"
find dist/js -name "app.*.js" | xargs -I {}  cp {} $appjs
find dist/js -name "vendor.*.js" | xargs -I {}  cp {} ${chanjet_web_store}/package/js/vendor.e17316.js
sed -i '' 's/http:\/\/store2.chanjet.com//g'  $appjs
sed -i '' 's/http:\/\/inte-store.chanjet.com//g'  $appjs
sed -i '' 's/https:\/\/inte-store.chanjet.com//g'  $appjs
sed -i '' 's/mode_debug = true/mode_debug = false/g'  $appjs
sed -i '' 's/redirectWhenError = false/redirectWhenError = true/g'  $appjs
sed -i '' '/^[^#]*alert(/d'  $appjs