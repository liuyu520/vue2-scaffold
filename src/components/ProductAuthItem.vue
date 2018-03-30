<template>
<li>
          <div class="Taocan-title clearfloat">
            <p class="fl">{{displayName}}</p><p class="fr">￥{{payPrice | formatMoney}}</p>
          </div>
          <div class="Taocan-text">
            <p  v-for="option in displayInfoList">{{option}}</p>
          </div>
        </li>
</template>
<script>
  import {showVersion} from '@/shared/utils/mixins'
  export default {
    props: ['product'],
    computed: {
      displayName: function () {
        if (this.product) {
          return this.product.displayName
        } else {
          return '正在加载'
        }
      },
      displayInfoList: function () {
        let displayinfo = this.product.authInfo.displayinfo
        /*if (window.globalConfig.HKJVERSION_DISPLAYNAME_MAP) {
          for (var i in window.globalConfig.HKJVERSION_DISPLAYNAME_MAP){
            displayinfo = displayinfo.replace(i,window.globalConfig.HKJVERSION_DISPLAYNAME_MAP[i]);
          }
        }*/
        displayinfo = showVersion(displayinfo)
        console.log('displayinfo', displayinfo)
        if (!displayinfo) {
          return []
        }
        return displayinfo.split('##')
      },
      payPrice: function () {
        if (this.product) {
          return this.product.price
        } else {
          return '正在加载'
        }
      }
    }
  }
</script>
