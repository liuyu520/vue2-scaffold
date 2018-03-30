/* 启动文件 */
import Vue from 'vue'
// import router from '@/routes/'
// import App from '@/components/App'
import PlaceOrder from '@/components/PlaceOrder'
import CreateOrgGuide from '@/components/CreateOrgGuide'
import Main from '@/components/demo/Main'
import examService from '@/services/examService'
// import TestValidate from '@/components/TestValidate'
import {getQueryString, render2} from '@/shared/utils/mixins'
import {getInvoice, setMaxCount, setOrgCanChange} from '@/services/status/sharedState.mixin'
/* eslint-disable no-new */

//注意:placeorderData 中新增一个配置对象({})
//名称及格式规范:
//globalConfig:{
//cid:'',
//current_datetime:'',
//PASSPORT_DOMAIN:'',
//还有应用商店,工作台
//}
// window.location.href = 'www.baidu.com'
var debug = false
if (debug) {
  new Vue({
    el: '#app',
    render: h => h(Main)
  })
} else {
  let currenturl = window.location.href
  console.log('currenturl', currenturl)
  let orgId = getQueryString('orgId')
  let packageId = getQueryString('packageId')
//校验参数
  if (!packageId) {
    window.location.href = '/error.html?errorMessage=' + encodeURIComponent('请指定购买的产品')
  }
  packageId && examService.fetchPackageAuth(orgId, packageId,getQueryString('businessType')).then(placeorderData => {
    if (placeorderData) {
      if (placeorderData.hasNoAnyOrg) {
        new Vue({
          el: '#app',
          render: h => h(CreateOrgGuide)
        })
        return
      }
      // console.log('placeorderData', JSON.stringify(placeorderData))
      window.cid = placeorderData.cid // 设置全局cid
      window.globalConfig = placeorderData.globalConfig || {}
      window.globalConfig.businessType = getQueryString('businessType')
      window.globalConfig.partnerOrgId = getQueryString('partnerOrgId')
      if (!window.globalConfig.HKJVERSION_DISPLAYNAME_MAP) {
        window.globalConfig.HKJVERSION_DISPLAYNAME_MAP = {
          '0版本': '精英版',
          '1版本': '普及版',
          '2版本': '标准版',
          '3版本': '专业版',

          '0版': '精英版',
          '1版': '普及版',
          '2版': '标准版',
          '3版': '专业版'
        }
      }
      if (window.globalConfig.orgfixed) {
        setOrgCanChange(false)
      }
      window.PASSPORT_DOMAIN = window.globalConfig.HOST_LOGIN || '//inte-passport.chanjet.com'
      window.HOST_WORKBENCH = window.globalConfig.HOST_WORKBENCH || '//inte-workbench.chanjet.com'
      const data = PlaceOrder.data // data 属性是一个函数
      PlaceOrder.data = () => ({...data(), placeorderData})// 注意:这是不是覆盖,而是把placeorderData 合并到原data 属性中
      render2(placeorderData.invoiceInfo, getInvoice())
      // console.log('placeorderData.maxCount', placeorderData.package.maxCount)
      setMaxCount(placeorderData.package.maxCount)
    }
    // 挂载到 DOM，自此外部就可通过 router.app 访问到根组件
    new Vue({
      el: '#app',
      render: h => h(PlaceOrder)
    })
  })
}

if (__DEV__) {
  console.info('[当前环境] 开发环境')
  Vue.config.devtools = true
  Vue.config.productionTip = false
}

if (__PROD__) {
  console.info('[当前环境] 生产环境')
  Vue.config.devtools = false
}
