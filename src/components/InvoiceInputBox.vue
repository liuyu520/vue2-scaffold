<template>
    <input    data-vv-as="手机号" class="inf-input" v-bind:name="name2" v-model="vmodelVar" id="bill-phone" type="text" :placeholder="placeholder"
            value="" autocomplete="off"/>
</template>
<script>
  import InvoiceInputBox from '@/components/InvoiceInputBox.vue'
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  Vue.use(VeeValidate, {
    events: 'blur',
    // 指定locale为中文
    locale: 'zh_CN'
  });
  import cn from 'vee-validate/dist/locale/zh_CN'
  // 默认是en，这里添加中文的lang包
  VeeValidate.Validator.addLocale(cn)
  export default {
    props: ['validateRule', 'name2', 'placeholder', 'vmodelVar']
  }
</script>
