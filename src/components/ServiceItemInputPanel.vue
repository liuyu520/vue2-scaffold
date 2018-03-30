<template>
    <div class="Tstore-infor">
        <p class="Tstore-buleTitle">要购买服务</p>
        <div class="Tstore-proName"><p>{{packageDisplayName}}</p></div>
        <div class="Tstore-jiage"  v-if="originPriceTotal!=payPriceTotal"> <span class="yuanjia">原价 ¥{{originPriceTotal}}.00</span><span class="fz14">优惠价</span><span class="fz16">￥{{payPriceTotalFormat}}</span></div>
        <div v-else  class="Tstore-jiage" >
            <span style="font-weight: bolder;">总价 ¥{{originPriceTotal}}.00</span>
        </div>
        <ProductAuthlist :products="packageData.products"></ProductAuthlist>
        <div class="Tstore-num-box clearfloat" v-if="packageData.canBuyMore">
            <div class="fl fz12">请选择购买数量</div>
            <div class="Tstore-num-input fl"><input v-validate="'required|numeric|multiple'" data-vv-as="购买数量" data-vv-validate-on="input"  @input="modifyCounter($event.target.value);validate2($validator,sharedState)" name="multiple2" :value="sharedState.multiple" type="text" ></div>
            <div class="fl input-choice"><i class="i-choice-t"  @click="inc();validate2($validator,sharedState)"></i><i class="i-choice-b" @click="dec();validate2($validator,sharedState)" ></i></div>
            <span v-show="errors.has('multiple2') " class="warning fz12">{{ errors.first('multiple2')}}</span>
        </div>
    </div>
</template>
<script>
import ProductAuthlist from '@/components/ProductAuthList'
import sharedStateMixin from '@/services/status/sharedState.mixin'
import {throttle} from '@/shared/utils/mixins'
import Vue from 'vue';
import VeeValidate from 'vee-validate';
VeeValidate.Validator.extend('multiple', {
  getMessage: field => field + '过大或过小',
  validate: value => {
    if (Number(value) > 9999) {
//      sharedStateMixin.sharedState.bus.$emit('validatemultiple');
      return false;
    } else if (Number(value) < 1) {
//      sharedStateMixin.bus.sharedState.$emit('validatemultiple');
      return false;
    }
//    sharedStateMixin.bus.sharedState.$emit('validatemultiple');
    return true
  }
});
export default {
  mixins: [sharedStateMixin],
  components: { ProductAuthlist },
  props: ['packageData'],
  data: () => ({
    originPrice: 300
  }),
  methods: {
    validate2: throttle(function ($validator2,sharedState) {
      console.log('updated 111');
//      console.log('this', this);
      $validator2.validate('multiple2').then((validateFlag) => {
        console.log('validateFlag', validateFlag)
        sharedState.bus.$emit('validatemultiple',validateFlag);
      }, err => {
        console.log('校验报错!!!!!')
        console.log(err)
      });
      /*if (that.errors.has('multiple2')) {
        this.sharedState.bus.$emit('validatemultiple',false);
      } else {
        this.sharedState.bus.$emit('validatemultiple',true);
      }*/
    },500)
  },
  mounted: function () {
  },
  computed: {
    originPriceTotal: function () {
      let realPrice = 0
      if (this.packageData) {
        realPrice = this.packageData.originPrice
      } else {
        realPrice = 33
      }
      console.log('realPrice', realPrice)
      return realPrice * (this.sharedState.multipleValidate ? this.sharedState.multiple : 1)
    },
    payPriceTotal: function () {
      let price = 0
      if (this.packageData) {
        price = this.packageData.price
      }
      price = price * (this.sharedState.multipleValidate ? this.sharedState.multiple : 1);
      return price;
    },
    payPriceTotalFormat: function () {
      let price = this.payPriceTotal;
      if (String(price).indexOf('.') == -1) {
        price += '.00'
      }
      return price;
    },
    packageDisplayName: function () {
      if (this.packageData) {
        return this.packageData.displayName
      } else {
        return '正在加载'
      }
    }
  }
}
</script>

