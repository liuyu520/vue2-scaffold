<template>
    <div class="Tstore-infor-mid clearfloat">
        <p class="Tstore-buleTitle fl" style="line-height:28px;">服务商信息</p>
        <div class="Tcode-box fl">
            <span v-if="placeorderData.globalConfig.isPartnerBuyForEndUser" >{{placeorderData.partnerInfoBean.orgFullName}}</span>
            <input v-else type="text" id="agentCode" :value="orgFullName" @input="sharedState.inputAgentCode = $event.target.value;errorOccur = false" value="" placeholder="若您有专属服务商，请输入服务商编号">

        </div>
        <a v-if="!placeorderData.globalConfig.isPartnerBuyForEndUser" class="Tcode-btn fl" @click="queryAgent" >验证</a>
        <span style="line-height: 28px;
    padding-left: 10px;" v-show="errorOccur" class="warning fz12">{{errorMessage}}</span>
    </div>

</template>
<script>
  import examService from '@/services/examService'
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  export default {
    mixins: [sharedStateMixin],
    data: () => ({
      orgFullName: '',
      errorOccur: false,
      errorMessage: '服务商编码错误'
    }),
    props: ['placeorderData'],
    methods: {
      queryAgent: function () {
//        alert(111)
        if (!this.sharedState.inputAgentCode){
//          this.errorOccur = true
//          this.errorMessage = '请输入服务商'
          return
        }
        this.orgFullName = ''
        examService.queryAgent(this.sharedState.inputAgentCode).then(resp => {
          let agentValue = resp.value
          if (agentValue && agentValue.orgFullName) {
            this.orgFullName = agentValue.orgFullName
            console.log('agent orgFullName', this.orgFullName)
            this.sharedState.resultAgentInfo.agentCode = agentValue.partnerCode
            this.sharedState.resultAgentInfo.orgFullName = this.orgFullName
//            console.log('resultAgentInfo', this.sharedState.resultAgentInfo)
            this.errorOccur = false
//            this.errorMessage = undefined
          } else {
            // 校验失败,则清空要提交的服务商code
            console.log('校验失败')
            this.errorOccur = true
            this.resetAgent()
          }
        }
        )
      }
    }
  }
</script>
