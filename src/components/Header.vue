<template>
    <div class="header clearfloat">
        <div class="logo-box fl"></div>
        <div class="conmpany-name conmpany-dropbottom fl" id="org_current_name" @click="changeShowOrgList">
            <span :title="defaultOrg">{{defaultOrg | omitTooLongString}}</span>
            <div class="conmpany-pop" v-show="showOrgList"  id="org_select_items"><div class="company-name-ul">


                <div v-if="sharedState.orgCanChange && orgList.length>1" @click="changeOrg(option.orgId)" v-for="option in orgList"  class="conmpany-text clearfloat jq-conmpany-text" :data-orgid="option.orgId">
                    <div class="fl company-title  jq-company-title" :title="option.orgFullName">{{option.orgFullName | omitTooLongString}}</div>
                </div>


            </div>
                <div  v-if="sharedState.orgCanChange" class="add-company " @click="openOrgDialog" >
                    <a href="#" >
                        <span class="icon-cjt_icon_newadd add-company-img fl"></span>
                        <span class="fl">新建企业</span>
                    </a>
                </div></div>
        </div>

        <div class="user fr  jq-header-common">
            <img :src="userInfo.userHeadPicture" width="100%" alt="" onerror="this.src='/release/imgs/s09.jpg'">
            <div class="user-pop">
                <ul>
                    <li><a :href="passwordUrl + '/password/revisePassword'" target="_blank"><span class="user-pop-img icon-icon_edit fl"></span><span class="fl">修改密码</span></a></li>
                    <li><a href="#" @click="logout" id="header_logout"><span class="user-pop-img icon-icon_quit fl"></span><span class="fl">退出登录</span></a></li>
                </ul>
            </div>
        </div><!--user-->

        <div class="header-other fr clearfloat">
            <div class="work-store fz12 fl">
                <a  :href="workbenchUrl">
                    <span class="icon-icon_manage_n fl"></span>
                    <span class="fl">管理后台</span>
                </a>
            </div>
            <div class="style-line fl"></div>
            <a href="http://service.chanjet.com/zx"><div class="help-box fl icon-icon_help_n" title="服务社区">

            </div></a>
            <div class="download-wap fl">
                <div class="icon-icon_mobile_n" title="下载工作圈客户端">  </div>

                <div class="phone-pop  qrcode-pop"><!--手机二维码图片的弹出层已隐藏-->
                    <img src="/release/imgs/qr_code.jpg" width="100%" alt="">

                    <p class="fz12">iPhone&amp;Android</p>
                </div>


            </div>
        </div><!--header-other-->

    </div>
</template>
<script>
  import examService from '@/services/examService'
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  import CreateOrgComp from '@/components/dialog/CreateOrgComp'
  import {updateUrlParameter} from '@/shared/utils/mixins'
  export default {
    mixins: [sharedStateMixin],
    props: {'orgId':[Number, String],
      'userInfo':{
        default: {userHeadPicture: 'https://sto.chanapp.chanjet.com/90001660099/cia/headpicture/2017/05/18/33b64b57-1071-49f4-af3f-3e0626cbf1bc61639307.jpgcut.jpg'}
      }
    },
    data: () => ({
      showOrgList: false,
      orgIdNameMap: {},
      orgList: []
    }),
    computed: {
      workbenchUrl: function () {
        return window.globalConfig.HOST_WORKBENCH
      },
      passwordUrl:function () {
        return window.globalConfig.HOST_LOGIN
      },
      discount: function () {
        return this.originPrice - this.shouldPayPrice
      },
      defaultOrg: function () {
        let defaultOrg2 = this.sharedState.defaultOrg.orgFullName
        return defaultOrg2;
      }
    },
    methods: {
      changeShowOrgList: function () {
        if (!this.sharedState.orgCanChange) {
          return
        }
        this.showOrgList = !this.showOrgList;
      },
      changeOrg: function (orgid) {
        this.sharedState.defaultOrg = this.orgIdNameMap[orgid]
        let currHref = location.href;
//        window.alert(currHref + ',' + orgid)
        window.location.href = updateUrlParameter(currHref, 'orgId', orgid);
        return
      },
      openOrgDialog: function () {
        this.sharedState.currentView = CreateOrgComp;// 'create_org_comp'
        this.sharedState.dialogShow = true
        this.sharedState.dialogTitle = '新增订购企业'
      },
      logout: function () {
        $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: '/logout.do',
          data: JSON.stringify({}),
          dataType: 'json',
          success: function (data) {
            if (data && data['result'] == true) {
              window.location.href = data['location'];
            }
          },
          error: function (data) {
            if (window.console && console.error) {
              console.error('logout error!');
            }
          }
        });
      }
    },
    created () {
      examService.orgList(window.globalConfig.orgId, window.globalConfig.businessType || '').then(orgList => {
//        orgList[0].orgName = orgList[0].orgName.replace(/&lt;/,'<')
        this.orgList = orgList
        let hasFind = false
        this.orgList.map((item2,index) => {
//          console.log('index', index)
//          console.log('item2', item2)
          this.orgIdNameMap[item2.orgId] = item2;
          if (!hasFind && (item2.orgId == this.orgId || item2.defaultSelect == '1')) {
            hasFind = true
            this.sharedState.defaultOrg = item2;
//            defaultOrg2 = item2.orgFullName
            return false
          }
        });
      })
    }/*,
    filters: {
      omitTooLongString: function (value) {
        return value.length > 14 ? value.substr(0,14) + '..' : value
      }
    }*/
  }
</script>
