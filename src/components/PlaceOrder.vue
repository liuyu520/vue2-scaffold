<template>
    <div class="Tstore-main clearfloat">
        <Header2 :orgId="placeorderData.orgId" :userInfo="placeorderData.userInfo"></Header2>
        <div class="Tstore-left fl">
            <Usedlicense :licenceInfoList="placeorderData.license"></Usedlicense>
            <ServiceItemInputPanel :package-data="placeorderData.package"></ServiceItemInputPanel>
            <AgentCode v-if="!placeorderData.package.allHasAgent && showAgent" :placeorderData="placeorderData"></AgentCode>
            <Invoice v-if="!placeorderData.globalConfig.isPartnerBuyForEndUser"></Invoice>

        </div>
        <div class="Tstore-right fr">

            <div class="Tstore-payTitle">请确认订单信息</div>
            <ServicePreview :packageData="placeorderData.package" :multiple="multiple2" :isPartnerBuyForEndUser="placeorderData.globalConfig.isPartnerBuyForEndUser"></ServicePreview>
            <div style="margin-left: 44px;">
                <span style="text-align: center;display: none" id="globalError" class="warning fz12 icon-store_icon_forbid erro-f-img"></span>
            </div>
            <a class="Tstore-buyBtn" :style="submitBtnStyle" @click="submitOrder">立即购买</a>
            <div class="xy-style" style="margin:14px auto 40px">
                <label for="porder_agreement_box">
                    <input class="txt-check fl"  v-model="sharedState.canSubmit" type="checkbox"  id="porder_agreement_box">
                    <p class="fz12 fl"> 同意<a class="clickable" target="_blank" href="http://www.chanjet.com/terms/account">《畅捷通租赁服务协议》</a></p>
                </label>
            </div>

        </div>
        <GlobalEmptyDialog :currentView="sharedState.currentView"></GlobalEmptyDialog>
        <div class="bg" :style="bgStyle"></div>

    </div>
</template>
<script>
import GlobalEmptyDialog from '@/components/dialog/GlobalEmptyDialog'
import UpdateInvoiceComp from '@/components/dialog/UpdateInvoiceComp'
//import UpdateInvoiceComp from '@/components/dialog/UpdateInvoiceComp'
import Usedlicense from '@/components/Usedlicense'
import Header2 from '@/components/Header'
import ServiceItemInputPanel from '@/components/ServiceItemInputPanel'
import AgentCode from '@/components/AgentCode'
import Invoice from '@/components/Invoice'
import InvoiceDisplay from '@/components/InvoiceDisplay'
import WarningDialog from '@/components/dialog/WarningDialog'
import ServicePreview from '@/components/ServicePreview'
import sharedStateMixin,{showWarnDialog,showDialog} from '@/services/status/sharedState.mixin'
//import ValidateInputSimple2 from '@/components/input/ValidateInputSimple2'
import examService from '@/services/examService'
import {getServicePeriod, mixin, getQueryString} from '@/shared/utils/mixins'
import Vue from 'vue';
Vue.filter('omitTooLongString', function (value) {
  if (!value) {
    return value
  }
  return value.length > 14 ? (value.substr(0,14) + '..') : value
})
Vue.filter('formatMoney', function (value) {
  if (!value) {
    return '00.00'
  }
  let str = String(value)
  if (str.indexOf('.') == -1){
    str += '.00'
  } else if (str.length - str.lastIndexOf('.') < 3) {
    str += '0';
  }
  return str
})
export default {
  mixins: [sharedStateMixin],
  components: { Usedlicense, ServiceItemInputPanel, AgentCode, Invoice, ServicePreview, sharedStateMixin, Header2 ,GlobalEmptyDialog ,UpdateInvoiceComp,InvoiceDisplay },
  computed: {
    showAgent: function () {
      let agentCode = getQueryString('agentCode') || getQueryString('a') || getQueryString('svrCode');
      return (!agentCode || agentCode == 'undefined' || agentCode == 'null')
    },
    multiple2: function () {
      if (this.sharedState.multipleValidate) {
        return this.sharedState.multiple
      } else {
        return 1
      }
    },
    submitBtnStyle: function () {
      if (this.enable){
        return {}
      } else {
        return {backgroundColor: '#ccc', cursor: 'not-allowed'}
//        return {'backgroundColor': 'red', 'cursor': 'not-allowed'}
      }
    },
    bgStyle: function () {
      console.log('bgStyle',this.sharedState.dialogShow)
      if (this.sharedState.dialogShow) {
        console.log('显示')
        return { display: 'block' }
      } else {
        console.log('隐藏')
        return {}
      }
    },
    enable: function () {
      return this.sharedState.canSubmit && this.sharedState.multipleValidate
    }
  },
  methods: {
    validateMultiple: function (bool) {
      this.sharedState.multipleValidate = bool
    },
    buildProductsPriceAmountsList: function (products) {
      let length = products.length;
      let submitProducts = [];
      for (let i = 0; i < length; i ++) {
        let product2 = products[i];

        // 组装priceOptionAmounts
        let authInfo = product2.authInfo.authItems
        let priceOptionAmounts = []
        let periodAuthItem = {}
        for (let key in authInfo) {
          console.log('key', key)
          let authItem = authInfo[key]
          if (authItem.code === 'period' || authItem.code.indexOf('CIAdata') > -1) {
            periodAuthItem = authItem
//            priceOptionAmounts.push({priceOptionId: authItem.id,ciaAuthCode: authItem.ciaAuthCode})
//            continue
          }
          // 版本和时间不能乘以倍数
          let val = Number(authItem.value) * this.sharedState.multiple;
          if (authItem.code == 'version' || authItem.code === 'period' || authItem.code.indexOf('CIAdata') > -1) {
            val = authItem.value
          }
          priceOptionAmounts.push({priceOptionId: authItem.id, qty: val,ciaAuthCode: authItem.ciaAuthCode})
        }
        var servicePeriod = getServicePeriod(periodAuthItem.value,product2.endDate)
        let oneProduct = mixin({
          buyType: 1,
          couponCode: '',
          productId: product2.productId,
          // priceId: 1,
          priceOptionAmounts: priceOptionAmounts,
          buyTypeCode: product2.buyTypeCode
        }, servicePeriod)
        let json = JSON.stringify(priceOptionAmounts)
        oneProduct.priceOptionAmountsJson = json
        submitProducts.push(oneProduct)
      }
      return submitProducts
    },
    validate2: function () {
      if (isNaN(this.sharedState.multiple)) {
        return
      }
      if (this.sharedState.multiple < 1 || this.sharedState.multiple > this.sharedState.maxCount){
        return false;
      }
      if ((!this.placeorderData.globalConfig.isPartnerBuyForEndUser) && this.sharedState.needInvoice) {
        if (!this.sharedState.invoice_dto || !this.sharedState.invoice_dto.invoiceTitle) {
          console.log('aa', JSON.stringify(this.sharedState.dialogShow))
          showDialog(WarningDialog,'发票信息')
          /*this.sharedState.currentView = WarningDialog;// 'create_org_comp'
          this.sharedState.dialogShow = true
          this.sharedState.dialogTitle = '发票信息'*/
          this.sharedState.errorMsg = '请先输入申请电子发票（普票）必填信息'
          console.log('aa', JSON.stringify(this.sharedState.dialogShow))
          return false
        }
//        showWarnDialog('发票信息','纳税人识别号长度必须为15、18、20个字符')
        let taxNo = this.sharedState.invoice_dto.taxNo
//        console.log('person',this.sharedState.invoice_dto.invoicePersonal)
        if (this.sharedState.invoice_dto.invoicePersonal) {
          return true;
        }
        if (this.sharedState.needInvoice) {
          if (!taxNo) {
            showDialog(WarningDialog,'发票信息')
            this.sharedState.errorMsg = '纳税人识别号不能为空'
            return false
          } else if (taxNo.length != 15 && taxNo.length != 18 && taxNo.length != 20) {
            showDialog(WarningDialog,'发票信息')
            this.sharedState.errorMsg = '纳税人识别号长度必须为15、18、20个字符'
            return false
          }
        }
      }
      return true;
    },
    buildSubmitData: function () {
      let products = this.placeorderData.package.products;
      let submitProducts = this.buildProductsPriceAmountsList(products)
      let orderSubmitData = {}
      orderSubmitData.originPrice = this.sharedState.originPrice
      orderSubmitData.shouldPayPrice = this.sharedState.shouldPayPrice
      orderSubmitData.products = submitProducts
      // 设置产品包id
      orderSubmitData.packageId = this.placeorderData.packageId
      orderSubmitData.packageDisplayName = this.placeorderData.package.displayName
      // 设置企业id
      orderSubmitData.orgId = this.placeorderData.orgId
      if (this.sharedState.needInvoice && this.sharedState.invoice_dto && this.sharedState.invoice_dto.invoiceTitle) {
        orderSubmitData.needInvoice = true
        orderSubmitData.invoiceDetail = this.sharedState.invoice_dto
      } else {
        orderSubmitData.needInvoice = false
      }
      orderSubmitData.phone = this.placeorderData.userInfo.mobile

      // 前端不用单独设置各个product中的agentCode
      orderSubmitData.agentCode = this.sharedState.inputAgentCode
      if (this.sharedState.resultAgentInfo &&
        this.sharedState.resultAgentInfo.agentCode &&
        orderSubmitData.agentCode == this.sharedState.resultAgentInfo.orgFullName){
        orderSubmitData.agentCode = this.sharedState.resultAgentInfo.agentCode
      }
      // 增加浏览器url链接中的参数
      if (window._cache) {
        orderSubmitData.queryStringMap = window._cache['queryString']
      }
      orderSubmitData.multiple = this.sharedState.multiple;
      orderSubmitData.partnerOrgId = getQueryString('partnerOrgId')
      orderSubmitData.businessType = getQueryString('businessType')
      return orderSubmitData
    },
    submitOrder: function () {
//      this.canSubmit = !this.canSubmit;
      console.log('invoice:', JSON.stringify(this.sharedState.invoice_dto))
      if (!this.enable){
        console.error('校验不通过')
        return
      }
      //校验
      if (!this.validate2()){
        return;
      }
      console.log('提交订单')
        // 组装提交订单的表单数据
      let orderSubmitData = this.buildSubmitData()
      if (window.packageSubmitCallback) {
        window.packageSubmitCallback(orderSubmitData,this.placeorderData);
      }
        // 组装完成
      let json = JSON.stringify(orderSubmitData)
      console.log('组装完成', json)
//      this.sharedState.multipleValidate = false
      examService.submitOrder(json).then(resp => {
        console.log('请求结果订单号',resp)
        let payOrderUrl = '/order/payOrder?orderId=' + resp + '&orgId=' + orderSubmitData.orgId + '&businessType=' + (orderSubmitData.businessType || '')
        if (orderSubmitData.partnerOrgId) {
          payOrderUrl = payOrderUrl + ('&partnerOrgId=' + orderSubmitData.partnerOrgId)
        }
        window.location.href = payOrderUrl
        setTimeout(function () {
          this.sharedState.multipleValidate = true
        },2000)
      })
//      console.log('发票', JSON.stringify(this.sharedState.invoice_dto))
    }
  },
  // 注意：顶级变量必须设置默认值方能引入 observer
  data: () => ({

//    currentView: '',
    placeorderData: {'license':[{'agentCode':'1234','partnerFullName':'1231231313','displayName':'好会计','licenceInfoList':[[{'val':'2017-09-25至2017-09-28','title':'起止时间'},{'val':'153','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'49','title':'存储空间'}],[{'val':'2017-09-29至2017-09-29','title':'起止时间'},{'val':'139','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'35','title':'存储空间'}],[{'val':'2017-09-30至2017-09-30','title':'起止时间'},{'val':'139','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'23','title':'存储空间'}],[{'val':'2017-10-01至2017-10-31','title':'起止时间'},{'val':'24','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'28','title':'存储空间'}],[{'val':'2017-11-01至2018-08-31','title':'起止时间'},{'val':'17','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'23','title':'存储空间'}],[{'val':'2018-09-01至2018-09-10','title':'起止时间'},{'val':'5','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'23','title':'存储空间'}],[{'val':'2018-09-11至2018-09-16','title':'起止时间'},{'val':'1','title':'会计数'},{'val':'精英版','title':'版本'}]]},{'agentCode':'w','partnerFullName':'内部(无单位)','displayName':'客户管家','licenceInfoList':[[{'val':'2017-09-25至2017-09-28','title':'起止时间'},{'val':'153','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'49','title':'存储空间'}],[{'val':'2017-09-29至2017-09-29','title':'起止时间'},{'val':'139','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'35','title':'存储空间'}],[{'val':'2017-09-30至2017-09-30','title':'起止时间'},{'val':'139','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'23','title':'存储空间'}],[{'val':'2017-10-01至2017-10-31','title':'起止时间'},{'val':'24','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'28','title':'存储空间'}],[{'val':'2017-11-01至2018-08-31','title':'起止时间'},{'val':'17','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'23','title':'存储空间'}],[{'val':'2018-09-01至2018-09-10','title':'起止时间'},{'val':'5','title':'会计数'},{'val':'精英版','title':'版本'},{'val':'23','title':'存储空间'}],[{'val':'2018-09-11至2018-09-16','title':'起止时间'},{'val':'1','title':'会计数'},{'val':'精英版','title':'版本'}]]}],'package':{'slogon':'','displayName':'包1','price':1000,'channel':'','logo':'https:....','description':'','id':900000000,'originPrice':1200,'canBuyMore':1,'maxCount':10,'promoteImages':['','',''],'products':[{'displayName':'客户管家','price':100,'id':'7','authInfo':{'authItems':[{'unit':'月','code':'period','id':23,'value':'12'},{'unit':'个人','code':'CIAuser','id':7,'value':'4'}],'displayinfo':''},'realPrice':88},{'displayName':'购买好会计普及版','price':300,'id':'3128','authInfo':{'authItems':[{'unit':'月','code':'period','id':23,'value':'12'},{'unit':'个人','code':'CIAuser','id':7,'value':'120'},{'unit':'账套','code':'ud1','id':34,'value':'3'},{'unit':'版本','code':'version','id':28,'value':'1'}],'displayinfo':'有效期:12月##帐套:3套##版本:普及版'},'realPrice':288}]}}
//    submitBtnStyle: {color: '#ccc'}
  }),
  mounted: function () {
    if (window.packageCallback) {
      window.packageCallback(this.placeorderData);
    }
  },
  created: function () {
//    console.log('create placeorder', JSON.stringify(this.placeorderData))
    //做一些初始化操作
    if (!this.placeorderData.userInfo){
      this.placeorderData.userInfo = {}
    }
    this.sharedState.bus.$on('validatemultiple',this.validateMultiple)
  }
}
</script>
