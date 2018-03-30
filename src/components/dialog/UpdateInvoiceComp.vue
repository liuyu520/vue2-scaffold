<template>
    <div>
        <form class="modal-content" id="bill-form">
            <table class="changeInvoiceTable" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="120" align="right">发票类型：</td>
                    <td>
                        <div class="fl inp-radio mg-r40"><label><a class="fl inf-style inf-active">电子发票</a></label></div>
                        <!--<div class="fl inp-radio"><label><input class="fl" name="invoiceType" type="radio" value="1"><span
                                class="p-font">增值税普通发票</span></label></div>-->
                    </td>
                </tr>
                <tr id="electronic_invoic_desc">
                    <td colspan="2" style="padding:0;">
                        <div class="ts-fp fz12 dropright-list">
                            电子发票是经过国家税务局机关认可的有效凭证，同样具有售后维权的效力。发票信息填写完毕一经确认则无法修改，请仔细核对，以免造成不必要的麻烦。
                            如需申请纸质发票，您可以咨询客服，服务电话：4006-600-566
                        </div>
                    </td>
                </tr>
                <tr>
                    <td width="120" align="right">发票内容：</td>
                    <td><p class="p-font">服务费</p></td>
                </tr>
                <tr >
                    <td width="120" align="right"><i class="mh-red">*</i>发票抬头：</td>
                    <td> <a class="inf-style company " :class="{ 'inf-active': !invoice_dto.invoicePersonal }" @click="invoice_dto.invoicePersonal = false">企业</a> <a  :class="{ 'inf-active': invoice_dto.invoicePersonal }" class="inf-style personal"  @click="invoice_dto.invoicePersonal = true">个人</a></td>
                </tr>
                <tr v-show="!invoice_dto.invoicePersonal" id="trCompany">
                    <td width="120" align="right"><i class="mh-red">*</i>企业名称：</td>
                    <td>
                        <validate-input :haserror="errors.has('invoiceTitle')" :errormessage="errors.first('invoiceTitle')"
                                        data-vv-name="invoiceTitle" nam="invoiceTitle"
                                        data-vv-value-path="value"
                                        v-validate="'required'"
                                        data-vv-as="企业名称"
                                        placeholder="请填写企业名称" v-model="invoice_dto.invoiceTitle" className="jq-bill-title"></validate-input>
                        <ul class="invoice-company-select"></ul>
                    </td>
                </tr>
                <tr v-show="!invoice_dto.invoicePersonal" id="trtaxNo">
                    <td width="120" align="right"><i class="mh-red">*</i>纳税人识别号：</td>
                    <td>
                        <validate-input :haserror="errors.has('taxNo')" :errormessage="errors.first('taxNo')"
                                        data-vv-name="taxNo" nam="taxNo"
                                        data-vv-value-path="value"
                                        v-validate="'required|taxNoVal'"
                                        data-vv-as="纳税人识别号"
                                        placeholder="请填写企业的纳税人识别号" v-model="invoice_dto.taxNo" ></validate-input>
                         </td>
                </tr>
                <tr style="display: none;">
                    <td width="120" align="right" valign="top" style="padding-top: 19px;"><i class="mh-red">*</i>寄送地址：</td>
                    <td>
                        <div id="uboxstyle" class="fl"><select v-model="invoice_dto.invoice_provinc"> </select></div>
                        <div id="tmstyle" class="fl"><select v-model="invoice_dto.invoice_city"> </select></div>
                        <div id="macstyle" class="fl"><select v-model="invoice_dto.invoice_county"> </select></div>
                        <input class="inf-input" v-model.trim="invoice_dto.detail" name="detail" id="bill-detail" type="text" placeholder="请输入详细地址" value=""
                               autocomplete="off"/></td>
                </tr>
                <tr  style="display: none;">
                    <td width="120" align="right"><i class="mh-red">*</i>收件人姓名：</td>
                    <td><input class="inf-input" id="bill-receiver" v-model.trim="invoice_dto.deliverReceiver" name="receiver" type="text" placeholder="请填写签收人姓名"
                               value="" autocomplete="off"/></td>
                </tr>
                <tr>
                    <td colspan="2">
                    <span style="font-weight: bolder;font-weight: bolder;
    margin-left: 24px;">接收电子发票信息渠道：</span>
                    </td>
                </tr>
                <tr>
                    <td width="120" align="right"><i class="mh-red">*</i>手机号：</td>
                    <td>
                        <validate-input :haserror="errors.has('invoice_phone')" :errormessage="errors.first('invoice_phone')"
                                        data-vv-name="invoice_phone" nam="invoice_phone"
                                        data-vv-value-path="value"
                                        v-validate="'required|mobile'"
                                        data-vv-as="手机号"
                                             placeholder="请填写签收人手机号" v-model="invoice_dto.deliverPhone" ></validate-input>

                    </td>
                </tr>
                <tr>
                    <td width="120" align="right">收件人邮箱：</td>
                    <td><input   class="inf-input" name="invoice_email" v-model.trim="invoice_dto.deliverEmail" id="bill-email" type="text" placeholder="请填写收件人邮箱"
                               value="" autocomplete="off"/>
                    </td>
                </tr>
                <tr>
                    <td width="120" align="right"></td>
                    <td><a class="pop-btn btn-qx jq-pop-invoice-cancel"  @click="close">取消</a> <a @click="save" id="bill-save-btn" class="pop-btn btn-bc">保存发票信息</a></td>
                </tr>
            </table>
            <input type="hidden" id="bill-type" name="type" value="{productId:'250'}"> <input type="hidden"
                                                                                              name="invoiceContent"
                                                                                              value="服务费">

        </form>
        <div style="margin-left: 40px;margin-right: 54px;margin-top: 30px;">
            <label >温馨提示：</label>
            <div class="fz12">
                1、企业申请电子发票普票请填写纳税人识别号<br>
                2、电子发票申请后可从企业工作台我的订单详情页查看发票开具的状态，针对已经开具的电子发票可以进行下载查看。 <br>
            </div>
        </div>
    </div>
</template>
<script>
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  import InvoiceInputBox from '@/components/InvoiceInputBox.vue'
  import ValidateInput from '@/components/input/ValidateInput.vue'
  import examService from '@/services/examService'
  import {centerY, render2, mixin, cloneByMapping} from '@/shared/utils/mixins'
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  Vue.use(VeeValidate, {
    events: 'blur',
    // 指定locale为中文
    locale: 'zh_CN'
//    inject: false
  });
  import cn from 'vee-validate/dist/locale/zh_CN'
  // 默认是en，这里添加中文的lang包
  VeeValidate.Validator.addLocale(cn)
  // 修改vee-validate默认的提示文案
  VeeValidate.Validator.updateDictionary({
    zh_CN: {
      messages: {
        required: field => field + '不能为空'
      }
    },
    cn: {
      messages: {
        required: field => field + '不能为空'
      }
    }
  });
  // 增加自定义校验
  VeeValidate.Validator.extend('mobile', {
    getMessage: field => '请输入正确格式的手机号码',
    validate: value => {
      if (value.length != 11 || value.charAt(0) != '1') {
        return false;
      }
      return true
    }
  });
  VeeValidate.Validator.extend('taxNoVal', {
    getMessage: field => '纳税人识别号长度必须为15、18、20个字符',
    validate: value => {
      if (value == 'aaa') {
        return true;
      }
      if (value.length != 15 && value.length != 18 && value.length != 20) {
        return false;
      }
      return true
    }
  });
  export default {
    mixins: [sharedStateMixin],
    name: 'createOrgComp',
    components: { InvoiceInputBox, ValidateInput },
    data: () => ({
      invoice_dto: {
        type: '{productId:\'250\'}',
        invoiceType: 3,
        invoiceContent: '服务费',
        deliverEmail: '',
        invoicePersonal: false
      },
      originAjaxInvoice: {}
    }),
    /*watch: {
      'sharedState.dialogShow' (newVal, oldQuery) {
//        console.log('this.$el', this.$el)
//        console.log('this.$el', $(this.$el).find('input'))
//        this.val = $(this.$el).find('input').val();
        console.log(oldQuery + ' , ' + newVal)
        if (oldQuery && (!newVal)){
          console.log('originAjaxInvoice', JSON.stringify(this.originAjaxInvoice))
          this.render2(this.originAjaxInvoice)
        } else {
          this.render2(this.originAjaxInvoice)
        }
      }
    },*/
    methods: {
      close: function () {
        this.sharedState.dialogShow = false
      },
      // 保存发票
      save: function () {
        let validateResult
        if (this.invoice_dto.invoicePersonal) {
          validateResult = this.$validator.validate('invoice_phone')
        } else {
          validateResult = this.$validator.validateAll();
        }
        validateResult.then((validateFlag) => {
          console.log('validateFlag', validateFlag)
          if (!validateFlag && (!this.invoice_dto.invoicePersonal)) {
            console.log('校验失败!!!')
            return
          }
          console.log('校验通过...')
//          this.$validator.reset()
          //校验成功,则发送http请求
          this.updateInvoice(this.invoice_dto)
        }, err => {
          console.log('校验报错!!!!!')
          console.log(err)
        });
        console.log('发票信息',JSON.stringify(this.invoice_dto))
//        console.log('invoicePersonal', this.invoicePersonal)
        //为什么v-model不直接使用 this.sharedState.invoice_dto,
        // 因为如果不点击保存,就不应该生效
//        this.sharedState.invoice_dto = this.invoice_dto
        mixin(this.sharedState.invoice_dto, this.invoice_dto)
        if (this.invoice_dto.invoicePersonal) {
          delete this.sharedState.invoice_dto.taxNo
        }
        /*if (!this.invoicePersonal) {
//          this.$validator.fields.push()
        }*/
      },
      updateInvoice: function (params) {
        let formData = cloneByMapping(this.invoice_dto, {'deliverPhone':'phone', 'deliverEmail':'email', 'invoicePersonal':'personal', 'invoiceTitle':'title'})
        /*formData.type = this.invoice_dto.type
        formData.phone = $.trim(this.invoice_dto.deliverPhone)
        formData.email = $.trim(this.invoice_dto.deliverEmail)
        formData.personal = this.invoice_dto.invoicePersonal*/
        if (formData.personal == 'false'){
          formData.personal = false
        }
        if (formData.personal) {
          formData.title = '个人'
          delete formData.taxNo
        }
        /*formData.invoiceType = this.invoice_dto.invoiceType
        formData.receiver = this.invoice_dto.receiver
        formData.invoiceContent = this.invoice_dto.invoiceContent*/
        console.log('提交的数据',JSON.stringify(formData))
        examService.updateInvoice(formData).then(licenceInfoList => {
//          alert('更新成功')
          this.close() // 关闭弹框
        })
      }/*,
      render2: function (data) {
        if (!data) {
          return
        }
        this.invoice_dto.deliverPhone = $.trim(data.phone)
        this.invoice_dto.deliverEmail = data.email
        this.invoice_dto.invoicePersonal = data.personal
        this.invoice_dto.taxNo = data.taxNo
        this.invoice_dto.receiver = data.receiver
        this.invoice_dto.invoiceTitle = data.title
      }*/
    },

    created: function () {
      this.sharedState.invoice_dto_input.invoiceType = this.invoice_dto.invoiceType
      this.sharedState.invoice_dto_input.type = this.invoice_dto.type
      this.invoice_dto = this.sharedState.invoice_dto_input
      console.log('created')
      //获取发票信息
      /*examService.getInvoiceInfo().then(resp => {
        console.log('请求结果',JSON.stringify(resp))
        let data = render2(resp.dto);
        data.invoiceType = this.invoice_dto.invoiceType
        data.type = this.invoice_dto.type
        this.originAjaxInvoice = resp.dto;
        this.invoice_dto = data
//        this.completeShow = true
        let popTab = $('.pop-box div.pop-tab')
        centerY(popTab);
      })*/
      this.sharedState.bus.$on('clearInputError',function (name) {
        console.log('clear error:',name)
        this.errors && this.errors.remove(name)
      }.bind(this))
    },
    beforeUpdate: function () {
      console.log('beforeUpdate')
    },
    ready: function () {
      console.log('ready')
    },
    mounted: function () {
      console.log('mounted')
//      setTimeout(function () {
      let popTab = $('.pop-box div.pop-tab')
      centerY(popTab);
//      }, 1000)
    },
    updated: function () {
      console.log('updated')
    },
    deactivated: function () {
      alert('deactivated')
    },
    beforeDestroy: function () {
      console.log('beforeDestroy')
    },
    destroyed: function () {
      console.log('destroyed')
    }
  }
</script>
