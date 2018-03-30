<template>
    <div >
        <div class="Tstore-proName" v-if="licenceInfo.hasLicense || licenceInfo.partnerFullName" ><p>{{licenceInfo.displayName}}</p></div>
        <UsedlicenseItemProductItem v-if="licenceInfo.hasLicense"  v-for="option in licenceInfo.licenceInfoList" :licenceInfoItem="option" ></UsedlicenseItemProductItem>
        <p v-if="licenceInfo.partnerFullName" class="text-padding"><span>已绑定服务商：</span><strong>{{licenceInfo.partnerFullName}}</strong></p>

    </div>
</template>
<script>
  import UsedlicenseItemProductItem from '@/components/UsedlicenseItemProductItem'
  export default {
    components: { UsedlicenseItemProductItem },
    props: ['licenceInfo'],
    /* data: () => ({
      licenceInfo: {'agentInfo': {}, 'licenceInfoList': {}}
    }) */
    computed: {
    }
  }
</script>
