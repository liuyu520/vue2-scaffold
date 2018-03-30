/***
 * get custom attribute
 * is same as jquery attr().eg:var inputId=$(this).attr('targetTF');
 * @param htmlNode22
 * @param attr
 * @returns {*}
 */
var getCustomAttr = function (htmlNode22, attr) {
  if (!htmlNode22) {
    return;
  }
  if ('length' in htmlNode22) {//jquery 对象
    htmlNode22 = htmlNode22[0];
  }
  var hospitalId = htmlNode22[attr];
  if (hospitalId == undefined || hospitalId == null) {
    hospitalId = htmlNode22.getAttribute(attr);
  }
  if (hospitalId == undefined || hospitalId == null) {
    if (htmlNode22.attributes) {
      hospitalId = htmlNode22.attributes[attr].nodeValue;
    }
  }
  return hospitalId;
};
if(!Array.prototype.indexOf){
  Array.prototype.indexOf = function(key){
    return Util.indexOf(this , key);
  }
}


if(!String.prototype.indexOf){
  String.prototype.indexOf = function(key){
    return Util.indexOf(this , key);
  }
}

if(!Date.prototype.format){
  console.log('add format')
  Date.prototype.format = function (format) {
    var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "H+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
          ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  };
}
