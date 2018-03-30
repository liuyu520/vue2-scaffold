<template>
    <div class="Tstore-infor-mid clearfloat">
        <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
        <p class="Tstore-buleTitle fl" style="line-height:28px; margin-right:30px;">发票信息</p>
        <div class="fz12 fl clearfloat invoice-Tcolor">
            <span class="fl">电子发票（普票） </span>
            <span class="fl">{{sharedState.invoice_dto.invoiceTitle}}</span>
            <span class="fl" style="padding:0 10px 0 4px;">服务费</span>
            <span class="fl"><a class="btn-xg"  @click="openInvoiceDialog">修改</a></span>
        </div>
    </div>
</template>
<script>
  import UpdateInvoiceComp from '@/components/dialog/UpdateInvoiceComp'
  import sharedStateMixin,{showDialog} from '@/services/status/sharedState.mixin'
  export default {
    mixins: [sharedStateMixin],
    components: { UpdateInvoiceComp },

    methods: {
      openInvoiceDialog:function () {
//        let GlobalEmptyDialog = new GlobalEmptyDialog();
//        this.sharedState.currentView = UpdateInvoiceComp;// 'create_org_comp'
//        this.sharedState.dialogShow = true
//        this.sharedState.dialogTitle = '发票信息'
        showDialog(UpdateInvoiceComp,'发票信息')
      }
    }
  }
</script>
