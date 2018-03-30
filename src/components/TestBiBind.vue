<template>
    <div class="Tstore-infor-mid clearfloat">
        <p class="Tstore-buleTitle fl" style="line-height:28px;">测试 双向绑定</p>
        <div class="Tcode-box fl">
            <input type="text" id="agentCode" :value="multiple222" placeholder="若您有专属服务商，请输入服务商编号"></div>
        <a class="Tcode-btn fl" @click="queryAgent" >验证</a>
    </div>

</template>
<script>
  let count = 3
  export default {
    props: ['multiple222'],
    methods: {
      queryAgent: function () {
        this.$emit('update:multiple222', count++)
      }
    }
  }
</script>
