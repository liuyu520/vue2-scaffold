<template>

  <div class="main-content">
      <header2></header2>
    <router-link to="/">/home</router-link>&emsp;
    <router-link to="/page1">/page1</router-link>&emsp;
    <router-link to="/page1/hello">/page1/hello</router-link>&emsp;
    <router-link to="/page2">/page2</router-link>&emsp;
    <router-link to="/page2/world">/page2/world</router-link>&emsp;
    <router-link to="/whatever">404</router-link><hr>
    <router-view></router-view>
  </div>
</template>
<script>
import header2 from '@/components/header2'
export default {
  name: 'App2',
  components: { header2 }
}

</script>
<style>
.main-content {
  margin: 30px;
}
</style>
