<template>
    <div>
        <h1>入口</h1>
        <a href="javascript:void(0)" @click="show = true">显示弹框</a>
        <!--<test-input-form v-if="show" ></test-input-form>-->
        <UpdateInvoiceComp  v-if="show"></UpdateInvoiceComp>
    </div>
</template>
<script>
  import TestInputForm from '@/components/demo/TestInputForm'
  import UpdateInvoiceComp from '@/components/dialog/UpdateInvoiceComp'
  export default {
    components: {TestInputForm, UpdateInvoiceComp},
    data: () => ({
      show: false
    })
  }
</script>
