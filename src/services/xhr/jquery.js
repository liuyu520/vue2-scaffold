export const mode_debug = true
export const redirectWhenError = false
export const rootPath = mode_debug ? 'http://stub.yhskyc.com/stub' : 'http://inte-xxx.com'// 后端 API 根路径

const xhr = ({method = 'get', url, body = null, origin = false}) => {
  // 由于引入了 es6-shim，因此这里完全可以使用原生 Promise
  const defer = $.Deferred()

  $.ajax({
    type: method,
    url: url.indexOf('http') == 0 ? url : (rootPath + url),
    data: body
    // crossDomain: true, // 跨域
    // xhrFields: { withCredentials: true } // 跨域允许带上 cookie
  })
    .done(res => {
      if (origin){
        defer.resolve(res)
      } else {
        const {result, value} = res
        if (!result) {
          let deferReject = defer.reject(res)
          if (res.errorCode == '401') {
            window.location.href = '/codeLogin.do?callback=' + encodeURIComponent(window.location.href)
            return deferReject
          }
          if (res.msgOfError && res.msgOfError.indexOf('未知错误') != -1) {
            res.msgOfError = ''
          }
          if (res.codeOfError == 5201 || res.codeOfError == '5201'){
            $('#globalError').text('您好，购买的有效使用时间不能超过3年').show();
            return deferReject;
          }
          if (window.dealPackageSubmitError){
            window.dealPackageSubmitError(redirectWhenError,res,url)
          }
          if (redirectWhenError) {
              window.location.href = 'https://xxx.com/error.html?errorMessage=' + encodeURIComponent(res.msgOfError) + '&error=' + res.codeOfError
          } else {
            $.toast({heading: '操作失败' , text: res.msgOfError, icon: 'warning'})
          }
          return deferReject
        }
        defer.resolve(value)
      }
    })
    .fail(err => {
      $.toast({heading: '请求 API 失败', icon: 'error', stack: false})
      console.warn(err)
    })

  return defer.promise()
}

export default xhr
