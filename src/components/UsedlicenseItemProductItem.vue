<template>
    <p class="text-padding"><span>起止时间：</span>{{licenseDetail}}</p>
</template>
<script>
  export default {
    props: {licenceInfoItem: { default: [] }},
    /* data: () => ({
      licenceInfo: {'agentInfo': {}, 'licenceInfoList': {}}
    }) */
    computed: {
      licenseDetail: function () {
        let licenseDetail = [];
        let length = this.licenceInfoItem.length
        console.log('licenceInfoItem length :', length)
        for (let i = 0; i < length; i ++) {
          if (i == 0) {
            licenseDetail.push(this.licenceInfoItem[i].val)
          } else {
            licenseDetail.push(this.licenceInfoItem[i].title + '：' + this.licenceInfoItem[i].val)
          }
        }
        return licenseDetail.join('，')
      }
    }
  }
</script>
