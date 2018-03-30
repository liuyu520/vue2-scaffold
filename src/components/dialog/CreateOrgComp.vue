<template>
    <table class="createOrgTable" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td width="100"align="right">企业名称：</td>
            <td>
                <validate-input :haserror="errors.has('orgName') || hasError" :errormessage="errors.first('orgName') || errorMessage"
                                data-vv-name="orgName" nam="orgName"
                                data-vv-value-path="val"
                                v-validate="'required'"
                                data-vv-as="企业名称"
                                placeholder="请填写企业名称" v-model.trim="orgFullName" ></validate-input>
            </td>
        </tr>
        <tr>
        <td width="100"align="right"></td>
        <td>
            <a v-if="sharedState.canClose" class="pop-btn btn-qx  jq-pop-btn-createorg-cancel" @click="close">取消</a>
            <a id="create-org" @click="createOrg" href="javascript:;" class="pop-btn btn-bc jq-create-org">创建新企业</a>
        </td>
        </tr>
    </table>
</template>
<script>
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  import ValidateInput from '@/components/input/ValidateInput.vue'
  import examService from '@/services/examService'
  import {updateUrlParameter, centerY} from '@/shared/utils/mixins'
  export default {
    mixins: [sharedStateMixin],
    components: { ValidateInput },
    methods: {
      close: function () {
        this.sharedState.dialogShow = false
      },
      createOrg: function () {
        console.log('创建企业');
        this.$validator.validateAll().then((validateFlag) => {
          console.log('validateFlag', validateFlag)
          if (!validateFlag) {
            console.log('校验失败!!!')
            return
          }
          console.log('校验通过...')
          console.log('企业名称:', this.orgFullName)
//          this.$validator.reset()
          //校验成功,则发送http请求
          examService.createOrg(this.orgFullName).then(resp => {
            console.log('请求结果',JSON.stringify(resp))
            if (!resp.result) {
              this.hasError = true
              this.errorMessage = resp.errorMessage;
              setTimeout(function () {
                this.hasError = false
                this.errorMessage = ''
              }.bind(this),4000)
              return
            }
            this.sharedState.defaultOrg.orgId = resp.orgId
            this.sharedState.defaultOrg.orgFullName = this.orgFullName
            this.close()
            let currHref = location.href;
//        window.alert(currHref)
            window.location.href = updateUrlParameter(currHref, 'orgId', resp.orgId);
          })
        }, err => {
          console.log('校验报错!!!!!')
          console.log(err)
        });
      }
    },
    data: () => ({
      orgFullName: '',
      hasError: false,
      errorMessage: ''
    }),
    mounted: function () {
      centerY($('.pop-box div.pop-tab'));
//      this.sharedState.popTabStyle = {top: '100px'}
    }
  }
</script>
