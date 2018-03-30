<template>
    <div class="Tstore-main clearfloat">
        <GlobalEmptyDialog :currentView="sharedState.currentView"></GlobalEmptyDialog>
        <div class="bg" style="display: block"></div>
    </div>
</template>
<script>
  import GlobalEmptyDialog from '@/components/dialog/GlobalEmptyDialog'
  import CreateOrgComp from '@/components/dialog/CreateOrgComp'
  import sharedStateMixin,{showWarnDialog,showDialog} from '@/services/status/sharedState.mixin'

  export default {
    mixins: [sharedStateMixin],
    components: {GlobalEmptyDialog, CreateOrgComp},
    mounted: function () {
      this.sharedState.canClose = false
      showDialog(CreateOrgComp,'新增订购企业')
    }
  }
</script>
