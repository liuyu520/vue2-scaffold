// The magic of state persistance is closure here
import Vue from 'vue';
// import WarningDialog from '@/components/dialog/WarningDialog'
export const sharedState = {
  originPrice: 0,
  multiple: 1,
  currentView: '',
  dialogShow: false,
  dialogTitle: '', // 对话框标题
  needInvoice: true, //是否开发票,默认强制开具,只有用户点击了"不开发票",才设置为false
  invoice_dto: {}, // 规定格式是: {"type":"{productId:'250'}","invoiceType":3,"invoiceContent":"服务费","deliverEmail":"1287789687@qq.com","deliverPhone":"17001098093","invoicePersonal":false,"taxNo":"aaaaaaaaaaaaaaa","receiver":"","invoiceTitle":"名称"}
  invoice_dto_input: {}, // 发票对话框用户输入的内容
  defaultOrg: {},//默认企业,结构:{orgId,orgFullName}
  popTabStyle: {},
  resultAgentInfo: {}, //agentCode,orgFullName,
  inputAgentCode: '', // 输入同步的服务商代码
  bus: new Vue(),
  errorMsg: '',
  maxCount: 9999, // 倍数购买的最大倍数
  canSubmit: true, // (能都点击提交按钮)
  multipleValidate: true, // 倍数购买输入框是否校验通过
  canClose: true,//弹出框是否可以关闭
  orgCanChange: true,
  shouldPayPrice: 0,
  discountPrice: 0,
  price: 0
}

export const resetCounter = () => sharedState.multiple = 1
export const setOrgCanChange = (bool) => sharedState.orgCanChange = bool
export const modifyCounter = (num) => sharedState.multiple = num
export const setMaxCount = (maxCount) => maxCount && (sharedState.maxCount = maxCount)
export const inc = () => {
  if (isNaN(Number(sharedState.multiple))) {
    return
  }
  // console.log('sharedState.maxCount', sharedState.maxCount)
  if (sharedState.multiple >= sharedState.maxCount){
    return
  }
  sharedState.multiple++
}
export const dec = () => {
  if (isNaN(Number(sharedState.multiple))) {
    return
  }
  if (sharedState.multiple <= 1) return;
  sharedState.multiple--
}
export const resetAgent = () => {
  delete sharedState.resultAgentInfo.agentCode
  delete sharedState.resultAgentInfo.orgFullName
}
export const setInvoice = (invoiceInfo) => {
  console.log('setInvoice', JSON.stringify(invoiceInfo))
  if (invoiceInfo && invoiceInfo.invoiceTitle) {
    sharedState.invoice_dto = invoiceInfo
  }
}
/**
 * 返回发票信息
 * @returns {sharedState.invoice_dto|{}}
 */
export const getInvoice = () => {
  return sharedState.invoice_dto
}
export const showDialog = (childComp,title) => {
  sharedState.currentView = childComp;// 'create_org_comp'
  sharedState.dialogShow = true
  sharedState.dialogTitle = title || ''
}
/*export const showWarnDialog = (title,message) => {
  showDialog(WarningDialog,title)
  sharedState.errorMsg = message
}*/
/**
 * @exports.default {Mixin}
 */
export default {
  data: () => ({
    sharedState
  }),
  methods: {
    resetCounter,
    modifyCounter,
    resetAgent,
    setMaxCount,
    inc,
    showDialog,
    setInvoice,
    getInvoice,
    dec
  }
}

