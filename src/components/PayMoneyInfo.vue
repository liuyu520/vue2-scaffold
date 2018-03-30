<template>
    <div class="Tstore-pay-jine">
        <p>订单金额：<span>¥ {{originPrice|formatMoney}}</span></p>
        <p>优惠金额：<span>¥ {{beforeDiscount|formatMoney}}</span></p>
        <p v-if="isPartnerBuyForEndUser||Number(discountPrice)>0">折扣金额：<span>¥ {{discountPrice|formatMoney}}</span></p>
        <p>应付金额：<span class="fz20">¥ {{shouldPayPrice|formatMoney}}</span></p>
    </div>
</template>
<script>
  export default {
    props: ['shouldPayPrice', 'originPrice', 'price', 'discountPrice', 'isPartnerBuyForEndUser'],
    computed: {
      beforeDiscount: function () {
        return this.originPrice - this.price
      }
    }
  }
</script>
