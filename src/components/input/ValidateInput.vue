<template>
    <!-- v_validate:校验规则,例如:required,email,confirmed:{target}
     className : 自定义的class,不会覆盖,而是合并
     name2: input的name属性值
     data_vv_as: 错误提示的字段名称,即"用户名不合法"中的'用户名'
     使用说明:示例
     < ValidateInput  :v_validate="'required|mobile'" name2="invoice_phone"
                                             placeholder="请填写签收人手机号" v-model="invoice_dto.deliverPhone" >< /ValidateInput>
       注意:   v_validate前面必须加上冒号,即':'

       失去焦点才会校验
       1. 失去焦点时 重置showError 为true
       2. showError 的作用是 用户输入时不管三七二十一 都不显示错误提示,
        3.提示信息errors.first(nam) 优先级比errormessage 高
       前端校验原则: 用户在输入过程中,不显示错误提示,@input="showError = false"
     -->
    <div>
        <input
                @blur="blur2($event.target.value)"  @input="inputAction($event.target.value)"
                v-bind:name="nam" :value="value" class="inf-input" :class="className"
                type="text" :placeholder="placeholder"
                autocomplete="off"/>
        <span v-show="showError && haserror " class="warning fz12">{{ errormessage}}</span>
    </div>

</template>
<script>
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  export default {
    mixins: [sharedStateMixin],
    props: ['nam', 'className', 'value', 'v_validate', 'data_vv_as', 'placeholder', 'haserror', 'errormessage', 'clicksubmit'],
    data: () => ({
      showError: true
    }),
    /*watch: {
      'value' (newVal, oldQuery) {
//        console.log('this.$el', this.$el)
//        console.log('this.$el', $(this.$el).find('input'))
//        this.val = $(this.$el).find('input').val();
        if (oldQuery == undefined && (!this.val)) {
          this.val = newVal
        }
        console.log(oldQuery + ' , ' + newVal)
      }
    },*/
    /*created: function () {
      this.sharedState.bus.$on('invoice_submit', function () {
        // ...
        console.log('submit!!!!!!!!!!!!')
        this.showError = true
      })
    },*/
    computed: {
      /*showErrorResult: function () {
        if (!this.showError && this.clicksubmit) {
          return true;
        }
        return this.showError;
      }*/
    },
    methods: {
      inputAction: function (val2) { //keyup
//        this.val = val2
//        this.value = val2
        this.$emit('input', val2)
//        this.$emit('blur', val2)//才真正触发this.value的改变
        console.log('this.value', this.value)
        if (this.showError) {
          this.showError = false
        }
//        this.$emit('input', val2)
        /*if (window.timeoutHook) {
          clearTimeout(window.timeoutHook)
          window.timeoutHook = undefined
        }
        window.timeoutHook = setTimeout(function () {
          console.log('this.showError', this.showError)
          if (this.showError) {
            console.log('first============')
            this.value = val2
            this.first = false
          }
          this.showError = false
          console.log('this.value', this.value)
        }.bind(this),1000)*/
        console.log('val2', val2)
      },
      blur2: function (val) {
        this.showError = true
//   没用     this.val = val //如果缺少,那么ajax 设置data中的变量时,校验不通过,校验认为没有输入
//        this.value = val

        this.$emit('blur', val)
//        console.log('val', val)

        //清除二次错误提示
//        this.haserror = false
//        this.showError = false
//        this.clicksubmit = false
        /*if (this.haserror) {
          console.log('有错误')
          if (!this.errors.has(this.nam)) {
            this.haserror = false
          }
        }*/
      }/*,
      blurAction: function () {
        if (this.errors.has(this.nam)) {
          this.showError = true
        } else {
          this.showError = false
        }
        console.log('this.showError', this.showError)
      }*/
    }
  }
</script>
