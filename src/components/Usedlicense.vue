<template>
    <div class="Tstore-infor">
        <p class="Tstore-buleTitle">已购买服务</p>
        <UsedlicenseItemProduct  v-show="showAll || index==0" v-for="(option, index) in licenceInfoList" :licenceInfo="option"></UsedlicenseItemProduct>
        <a v-if="licenceInfoList!=undefined && licenceInfoList.length>1" class="btn-zhankai" @click="showAll=!showAll">{{expandLable}}</a>
    </div>
</template>
<script>
//  import examService from '@/services/examService'
  import UsedlicenseItemProduct from '@/components/UsedlicenseItemProduct'
  export default {
    components: { UsedlicenseItemProduct },
    props: [ 'licenceInfoList' ],
    data: () => ({
      showAll: false
    }),
    computed: {
      expandLable: function () {
        if (this.showAll) {
          return ' 收起'
        } else {
          return '展开更多'
        }
      }
    },
    created () {
      /*examService.licenceInfoList().then(licenceInfoList => {
        this.licenceInfoList = licenceInfoList
      })*/
    }
  }
</script>
