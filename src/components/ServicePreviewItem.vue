<template>
    <div class="xiangmu-box">
        <p class="color-9" style="margin-bottom: 10px;">{{product.displayName}}</p>
        <p v-html="displayInfo"></p>
    </div>
</template>
<script>
  import {getServicePeriod, addMonth, showVersion} from '@/shared/utils/mixins'
  export default {
    props: ['product', 'multiple'],
    computed: {
      displayInfo: function () {
        if (!this.product || !this.product.authInfo) {
          return ''
        }
//        console.log('authInfo:', this.product.authInfo)
        let authInfo = this.product.authInfo.authItems
        let html = []
        let periodAuthItem = 12
        for (let key in authInfo) {
          console.log('key', key)
          let authItem = authInfo[key]
          if (authItem.code === 'period' || authItem.code.indexOf('CIAdata') > -1) {
            periodAuthItem = authItem
            continue
          }
          // 版本和时间不能乘以倍数
          let val = Number(authItem.value) * this.multiple;
          if (authItem.code == 'version') {
            val = authItem.value
          }
          html.push(val + authItem.unit + '，')
        }

        // 设置时间
        html.push(periodAuthItem.value + periodAuthItem.unit + ' ')
//        let now = new Date()
        var servicePeriod = getServicePeriod(periodAuthItem.value,this.product.endDate)
        let startDate = servicePeriod.startDate // now.format('yyyy-MM-dd')
        let endDate = servicePeriod.endDate // addMonth(now, periodAuthItem.value);
        console.log('endDate', endDate)
//        let endDateStr = endDate.format('yyyy-MM-dd')
        let peroidStr = startDate + '至' + endDate
        let showResult = html.join('') + '<br >' + peroidStr;
        showResult = showVersion(showResult)
        return showResult
      }
    }
  }
</script>
