<template>
    <table class="createOrgTable" width="120%" style="margin-left: 100px;" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td> {{sharedState.errorMsg}} </td>
        </tr>
        <tr>
            <td><a class="pop-btn btn-qx  jq-pop-btn-createorg-cancel" @click="close">取消</a> <a id="editInvoice" href="javascript:;"
                                                                                 class="pop-btn btn-bc jq-create-org"  @click="ok">确定</a>
            </td>
        </tr>
    </table>
</template>
<script>
  import sharedStateMixin,{showDialog} from '@/services/status/sharedState.mixin'
  import UpdateInvoiceComp from '@/components/dialog/UpdateInvoiceComp'
  import {centerY} from '@/shared/utils/mixins'
  export default {
    mixins: [sharedStateMixin],
    components: {UpdateInvoiceComp},
//    props: ['errorMsg'],
    mounted: function () {
      centerY($('.pop-box div.pop-tab'));
      //为什么要主动调用show,为什么UpdateInvoiceComp 不用?
      $('.pop-box').show()
//      this.sharedState.popTabStyle = {top: '100px'}
    },
    methods: {
      close: function () {
        this.sharedState.dialogShow = false
      },
      ok: function () {
        this.sharedState.dialogShow = false
        console.log('this.sharedState.title', this.sharedState.dialogTitle)
        if (this.sharedState.dialogTitle == '发票信息'){
          showDialog(UpdateInvoiceComp,'发票信息')
        }
      }
    }
  }
</script>
