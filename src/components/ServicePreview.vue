<template>
    <div class="Tstore-payBox">
        <p>购买企业：<strong style="color:#333;" :title="sharedState.defaultOrg.orgFullName">{{sharedState.defaultOrg.orgFullName | omitTooLongString}}</strong></p>

        <div class="Tstore-payBor"><p>服务项</p></div>

        <ServicePreviewItem :multiple="multiple" v-for="option in packageData.products" :product="option"></ServicePreviewItem>

        <div class="Tstore-payBor"><p>支付信息</p></div>
        <PayMoneyInfo  :shouldPayPrice="shouldPayPrice"  :originPrice="originPrice"
                       :discountPrice="discountPrice"
         :price="price" :isPartnerBuyForEndUser="isPartnerBuyForEndUser"></PayMoneyInfo>
    </div><!--Tstore-payBox-->
</template>
<script>
  import PayMoneyInfo from '@/components/PayMoneyInfo'
  import ServicePreviewItem from '@/components/ServicePreviewItem'
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  export default {
    mixins: [sharedStateMixin],
    components: { PayMoneyInfo, ServicePreviewItem },
    props: ['packageData', 'multiple', 'isPartnerBuyForEndUser'],
    computed: {
      shouldPayPrice: function () {
        this.sharedState.shouldPayPrice = this.packageData.shouldPayPrice * this.multiple
        return this.sharedState.shouldPayPrice
      },
      discountPrice: function () {
        this.sharedState.discountPrice = this.packageData.discountPrice * this.multiple
        return this.sharedState.discountPrice
      },
      price: function () {
        this.sharedState.price = this.packageData.price * this.multiple
        return this.sharedState.price
      },
      originPrice: function () {
//        console.log('this.packageData.realPrice', this.packageData.realPrice)
        this.sharedState.originPrice = this.packageData.originPrice * this.multiple
        return this.sharedState.originPrice
      }
    }
  }
</script>
