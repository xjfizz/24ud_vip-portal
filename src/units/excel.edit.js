export default {
  receiveSite: {
    prop: 'receiveSite',
    label: '目的网点',
    component: 'select',
    placeholder: '选择目的网点',
    options: [{ value: 1, label: '苏州' }, { value: 2, label: '无锡' }]
  },
  createTime: {
    prop: 'createTime',
    label: '录入时间',
    placeholder: '选择录入时间',
    component: 'input'
  },
  sendSite: {
    prop: 'sendSite',
    label: '运输单位',
    placeholder: '填写运输单位',
    component: 'input'
  },
  paymentType: {
    prop: 'paymentType',
    label: '付款方式',
    placeholder: '选择付款方式',
    component: 'select',
    options: [{ value: 2, label: '寄付' }, { value: 1, label: '到付' }]
  },
  type: {
    prop: 'type',
    label: '寄件类型',
    placeholder: '选择寄件类型',
    component: 'select',
    options: [{ value: 2, label: '寄件人' }, { value: 1, label: '收件人' }]
  },

}
