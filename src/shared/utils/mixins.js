export function mixins (...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

/***
 * 截断指定长度
 * @param input
 * @param length
 * @param showEllipsis
 * @returns {*}
 */
export function omitTooLongString (input, length, showEllipsis/** 是否显示省略号 */) {
  if (!input) {
    return input
  }
  var len = input.length
  if (len <= length) {
    return input
  } else {
    input = input.substring(0, length)
    if (showEllipsis) {
      input += '...'
    }
  }
  return input
}
/***
 * 需要注意:分支二走完之后,需要清空t_start 吗?<br>
 *   如果不清空,会有这种情况:执行完分支二之后,马上执行分支一<br>
 *     e.g:var func3=throttle3(myFunc,2000,2100)<br>
 *     需要保证:(1)连续频繁地点击,则每隔runDelay 秒,必须执行一次<br>
 *     (2)随意的乱点击,一定会执行至少一次<br>
 *     定时器执行时,需要重置t_start,否则执行完分支二之后,马上执行分支一<br>
 * @param fn
 * @param delay : 延迟执行的倒计时,如果多次调用,新的会把旧的倒计时冲掉
 * @param runDelay
 * @returns {Function}
 */
export function throttle (fn, delay, runDelay, scope) {
  var timer = null
  var t_start = null
  var first = false
  return function () {
    // 没有传递参数runDelay,但是传递scope
    if (runDelay && (typeof runDelay != 'number') && (!scope)) {
      scope = runDelay
    }
    var context = scope || this
    var args = arguments
    var t_cur = new Date()
    // console.log(context)
    timer && clearTimeout(timer)
    if (!t_start) {
      t_start = t_cur
    }
    // console.log('t_start:'+t_start)
    // console.log('t_cur:'+t_cur)
    // console.log('t_cur - t_start:'+(t_cur - t_start))
    // runDelay的类型等于'undefined',表示没有传递参数runDelay
    if (first) {
      first = false
      fn.apply(context, args)
      return
    }
    if ((typeof runDelay !== 'undefined') && (t_cur - t_start >= runDelay)) {
      fn.apply(context, args)// 分支一
      t_start = t_cur
      // console.log('一:' + new Date())
    } else {
      timer = setTimeout(function () { // 分支二
        fn.apply(context, args)
        // console.log('二:' + new Date())
        t_start = new Date()
      }, delay)
    }
  }
}
/***
 * 获取节点的标签名称,比如INPUT,SPAN,DIV,IMG
 * @param domNode
 * @returns {string|*}
 */
export function getTagName (domNode) {
  var tagNameTmp = domNode.tagName || domNode.localName
  if (!tagNameTmp) {
    tagNameTmp = domNode.nodeName// 兼容IE8
  }
  return tagNameTmp
}
/***
 * 使用sessionStorage保存数据
 * @param key
 * @param objectVal : json对象
 */
export function saveObj (key, objectVal) {
  window.sessionStorage.setItem(key, JSON.stringify(objectVal))
}
/***
 * 使用sessionStorage恢复数据
 * @param key
 */
export function getObj (key) {
  var val = window.sessionStorage.getItem(key)
  if (val) {
    return JSON.parse(val)
  } else {
    return val
  }
}
export function removeItem (key) {
  window.sessionStorage.removeItem(key)
}
export function addMonth (startDate, month) {
  if (!month) {
    console.error('month is NOT offer')
    return
  }
  if (typeof month == 'string') {
    month = Number(month);
  }
  // document.getElementById('myDiv') .innerHTML=startDate.format('yyyy-MM-dd');
  var oldDay = startDate.getDate();
  console.log('oldDay:' + oldDay)
  startDate.setMonth(startDate.getMonth() + month);
  if (startDate.getDate() != oldDay) {
    // startDate.setMonth(startDate.getMonth());
    startDate.setDate(0); // 比如startData:1.31,变为2月29
  }
  console.log(startDate.getDate())
  return startDate;
}

export function getServicePeriod (qty, licenseEndTime) {
  if (! qty) {
    console.error('qty is undefined')
    return
  }
  let format2 = 'yyyy-MM-dd'
  var startDateStr;
  var endDateStr;
  var startDate;
  if (licenseEndTime) {
    var endDateTmp = new Date(licenseEndTime);
    endDateTmp.setDate(endDateTmp.getDate() + 1);//鉴权结束时间的后一天
    startDate = endDateTmp;
  } else {
    startDate = window.globalConfig.current_datetime ? new Date(window.globalConfig.current_datetime) : new Date();
  }

  // var now=new Date();
  // var dateFormat = 'yyyy-MM-dd HH:mm:ss';
  startDateStr = startDate.format(format2);
  console.log('getServicePeriod qty:' + qty);

  endDateStr = addMonth(startDate, qty).format(format2);

  return {'startDate': startDateStr.split(' ')[0], 'endDate': endDateStr.split(' ')[0]}
}
export function clone (src) {
  var target = {};
  for (var i in src) {
    target[i] = src[i];
  }
  return target;
}

/***
 *
 * @param src
 * @param mapping : 映射
 * @returns {{}}
 */
export function cloneByMapping (src,mapping) {
  var target = {};
  for (var i in src) {
    let newColumn = mapping[i]
    target[newColumn || i] = $.trim(src[i]);
  }
  return target;
}
export function hitch (scope, method) {
  return function(){
    return method.apply(scope , arguments);
  }
}
export function mixin () {
  var target = arguments[0];

  for (var i = 1, len = arguments.length; i < len; i++) {
    var src = arguments[i];

    for (var property in src){
      if (typeof src[property] == 'object'){
        target[property] = clone(src[property])
      } else if (typeof src[property] == 'function') {
        target[property] = hitch(target, src[property]);
      } else {
        target[property] = src[property];
      }
    }
  }

  return target;
}

export function escape (a) {
  a = a || '';
  return a.replace(/</g,'\x26lt;').replace(/>/g,'\x26gt;').replace('/\x26/g','\x26amp;').replace(/'/g,'\x26quot;');
}

export function unescape (a) {
  a = a || '';
  return a.replace(/&lt;/g,
    '\x3c').replace(/&gt;/g, '\x3e').replace(/&amp;/g, '\x26').replace(/&quot;/g, '\'');
}

export function updateUrlParameter (url, key, val2) {
  if (!url) {
    return '';
  }
  console.log('------------------')
  console.log(url);
  url = url.replace(/#+$/, '');
  if (url.indexOf('?') == -1) {
    url = url + '?' + key + '=' + val2;
  } else if (url.indexOf('&' + key + '=') == -1 && url.indexOf('?' + key + '=') == -1) {
    url = url + '&' + key + '=' + val2;
  } else {
    var regExp = new RegExp('([&?]' + key + '=)[^&]*', '');
    url = url.replace(regExp, ('$1' + val2));
  }
  return url;
}
export function getQueryString (key) {
  if (!window._cache) {
    window._cache = {}
  }
  let _cache = window._cache
  if (!_cache['queryString']){
    _cache['queryString'] = {};
    let search2 = window.location.search
    console.log('search', search2)
    if (!search2) {
      let index = window.location.href.indexOf('?')
      search2 = window.location.href.substr(index + 1)
    }
    console.log('search', search2)
    var _t = search2.replace('?','').split('&');
    for (var i = 0, len = _t.length; i < len; i++){
      var _e = _t[i].split('=');
      _cache['queryString'][_e[0]] = _e[1];
    }
  }
  return _cache['queryString'][key];
}

/***
 * 调用:getInner()() ,注意有两个小括号
 * @returns {Function}
 */
export function getInner () {
  // alert(typeof window.innerWidth !== 'undefined');
  if (typeof window.innerWidth !== 'undefined') { //Notice:'undefined' is right
    return function () {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  } else {
    return function () {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}
export function getScroll () {
  return {
    top: document.documentElement.scrollTop || document.body.scrollTop,
    left: document.documentElement.scrollLeft || document.body.scrollLeft,
    height: document.documentElement.scrollHeight || document.body.scrollHeight
  };
}
export function centerY ($div22, deltaHeight/*在特殊情况,进行微调的*/) {
  console.log('$div22', $div22)
  var height = $div22.height();
  var heightIncludeScroll = getInner()().height;//浏览器可视区域的高度,不包括滚动条
  var delta = (heightIncludeScroll - height);//必须是可视区域的高度减去弹框的高度
  if (deltaHeight && delta > deltaHeight){
    delta = delta - deltaHeight;
  }
  var isSmall = false;
  var topFixBannerHeight = 60; //下单页导航的高度(薛敏做的)
  if (heightIncludeScroll < height) { //弹出框的高度大于可视区域,导致显示不了弹出框全部
    delta = 20/*delta + this.getScroll().top*/;
    isSmall = true;
  }
  var top = delta / 2;//注意:top没有单位
  /*var nagetive=false;
  if (top < 0) {//解决由于可视区域过小,导致弹出框的top为负数的问题
      top = '10px';
   nagetive=true;
  } else {
   if(heightIncludeScroll<height){
   heightIncludeScroll=height;
   }else{
   heightIncludeScroll=heightIncludeScroll+this.getScroll().top;
   }*/
  var minTop = getScroll().height - height - topFixBannerHeight;//本来应该是this.getScroll().height-height
  var topNew = top + getScroll().top;
  if (isSmall) {
    if (topNew > minTop) { //minTop 表示弹出框最下最下时的top值
      topNew = minTop;
    }
  } else {
    if ((topNew > minTop) && (heightIncludeScroll - height) < topFixBannerHeight / 2) { //如果可视区域高度大于弹出框高度,但是差量小于topFixBannerHeight
      //为什么要这样?因为topFixBannerHeight,导致弹出框底部超过了footer底部
      topNew = topNew - topFixBannerHeight / 2;
    }
  }

  console.log('top:' + topNew);
  if (topNew > 0) {
    top = (topNew * 100) / getScroll().height + '%';//百分比的优点是自适应
  } else {
    top = 0
  }
  // }
  var param = {};
  param['top'] = top;
  $div22.css(param);
}

/***
 * 设置发票信息
 * @param data
 * @param target
 * @returns {*}
 */
export function render2 (data, target) {
  // console.log('data', JSON.stringify(data))
  if (!data || !data.title) {
    return
  }
  if (!target){
    target = {}
  }
  target.deliverPhone = $.trim(data.phone)
  target.deliverEmail = data.email
  target.invoicePersonal = data.personal
  target.taxNo = data.taxNo
  target.receiver = data.receiver
  target.invoiceTitle = data.title
  return target;
}
export function showVersion (origin) {
  if (window.globalConfig.HKJVERSION_DISPLAYNAME_MAP) {
    for (var i in window.globalConfig.HKJVERSION_DISPLAYNAME_MAP){
      origin = origin.replace(i,window.globalConfig.HKJVERSION_DISPLAYNAME_MAP[i]);
    }
  }
  return origin
}
