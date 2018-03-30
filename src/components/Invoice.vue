<template>
    <div class="Tstore-infor-mid clearfloat">
        <p class="Tstore-buleTitle fl" style="line-height:28px; margin-right:30px;">发票信息</p>
        <a class="Tcode-btn fl" style="width:110px;" :class="{'inf-active':sharedState.needInvoice}" @click="needInvoice2">电子发票（普票）</a>
        <a class="Tcode-btn fl" style="width:110px;" :class="{'inf-active':!sharedState.needInvoice}"  @click="sharedState.needInvoice = false">不要发票</a>
        <a class="Tcode-btn-bule fl" @click="openInvoiceDialog" v-show="!showDesc">填写发票信息</a>

        <div class="fz12 fl clearfloat invoice-Tcolor" v-if="showDesc">
        <span class="fl">电子发票（普票） </span>
        <span class="fl" >{{sharedState.invoice_dto.invoiceTitle}}</span>
        <span class="fl"  style="padding:0 10px 0 4px;">服务费</span>
        <span class="fl"  ><a class="btn-xg"  @click="openInvoiceDialog">修改</a></span>
        </div>
    </div>

</template>
<script>
  import GlobalEmptyDialog from '@/components/dialog/GlobalEmptyDialog'
  import UpdateInvoiceComp from '@/components/dialog/UpdateInvoiceComp'
  import {render2} from '@/shared/utils/mixins'
  import sharedStateMixin,{showDialog} from '@/services/status/sharedState.mixin'
  import examService from '@/services/examService'
  export default {
    mixins: [sharedStateMixin],
    components: { GlobalEmptyDialog, UpdateInvoiceComp },
    /*data: () => ({
      selectedClass: ''
    }),*/
    props: ['shouldPayPrice', 'originPrice'],
    computed: {
      discount: function () {
        return this.originPrice - this.shouldPayPrice
      },
      showDesc:function () {
        return this.sharedState.needInvoice && this.sharedState.invoice_dto && this.sharedState.invoice_dto.invoiceTitle;
      }
    },
    methods: {
      needInvoice2:function () {
        this.sharedState.needInvoice = true
//        let GlobalEmptyDialog = new GlobalEmptyDialog();
//        this.sharedState.currentView = UpdateInvoiceComp;// 'create_org_comp'
//        this.sharedState.dialogShow = true
//        this.sharedState.dialogTitle = '发票信息'
//        showDialog(UpdateInvoiceComp,'发票信息')
      },
      openInvoiceDialog:function () {
        let me = this
        examService.getInvoiceInfo().then(resp => {
          console.log('请求结果',JSON.stringify(resp))
          let data = render2(resp.dto);
//          this.originAjaxInvoice = resp.dto;
          me.sharedState.invoice_dto_input = data
//        this.completeShow = true
//          let popTab = $('.pop-box div.pop-tab')
//          centerY(popTab);
          showDialog(UpdateInvoiceComp,'发票信息')
        })
      }
    }
  }
</script>
