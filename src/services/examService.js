import xhr,{mode_debug, rootPath} from './xhr/'

/**
 * 留言板所用到的 API
 */
class ExamService {

  /**
   * 获取所有发布者
   * @resolve {String[]} authors
   */
  fetchPackageAuth (orgId, packageId,businessType) {
    console.log('mode_debug', mode_debug)
    let param = {'orgId': orgId, 'packageId': packageId, 'queryString': JSON.stringify(window._cache['queryString'])}
    if (rootPath && (rootPath.indexOf('store2.aaa.com') != -1 || rootPath.indexOf('xxx.com') != -1)) {
      param.request_cd = 'afba7ca5de117080ef792ea4228926b4'
    }
    if (businessType) {
      param.businessType = businessType
    }
    return xhr({
      url: mode_debug ? '/package/purchase' : '/package/purchase',
      body: param
    })
  }

  /**
   * 查询当前用户发票信息
   * @returns {*}
   */
  getInvoiceInfo () {
    return xhr({
      method: 'get',
      origin: true,
      url: '/order/getInvoiceInfo',
        body: {'request_cd': window.cd}
    })
  }
  getUserInfo () {
    return xhr({
      method: 'get',
      origin: true,
      url: 'http://stub.yhskyc.com/stub_test2/stub/user/getUserInfo'
    })
  }

  /**
   * 发票更新接口
   * @param   {String} msgBody.title
   * @param   {String} msgBody.content
   * @resolve {Object} msg
   */
  updateInvoice (params) {
      params.request_cd = window.cd
    return xhr({
      method: 'post',
      url: '/order/updateInvoice',
      origin: true,
      body: params
    })
  }

  // 查询服务商编码
  queryAgent (agentCode) {
    return xhr({
      method: 'get',
      origin: true,
      url: '/order/checkPartner?partnerCode=' + agentCode
      // body: '' + agentCode
    })
  }

  submitOrder (productPackageSubmitDto) {
    return xhr({
      method: 'post',
        url: '/submitOrder',
        body: {'productPackageSubmitDto': productPackageSubmitDto, 'request_cd': window.cd}
    })
  }

  /*licenceInfoList (agentCode) {
    return xhr({
      method: 'get',
      url: '/packageAndLicenceInfoList?partnerCode=' + agentCode,
      origin: true
      // body: '' + agentCode
    })
  }*/
  orgList (orgId,businessType) {
      let param = {'request_cd': window.cd, 'orgId': orgId};
    if (businessType) {
      param.businessType = businessType
    }
    return xhr({
      method: 'get',
      url: mode_debug ? '/package/orgList2' : '/package/orgList',
      origin: true,
      body: param
    })
  }

  /***
   * 创建企业
   * @param orgFullName
   * @returns {*}
   */
  createOrg (orgFullName) {
    return xhr({
      method: 'post',
      url: '/test/createOrg',
      origin: true,
        body: {'request_cd': window.cd, 'orgName': orgFullName}
    })
  }
}

// 实例化后导出，全局单例
export default new ExamService()
