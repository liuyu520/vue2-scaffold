<template>
    <input type="text" name="custom" v-model="innerValue" placeholder="请输入内容" @input="$emit('input',$event.target.value)" >
</template>
<script>
  export default {
    data: () => ({
      innerValue: ''
    })
  }
</script>
