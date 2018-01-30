export default [
  {
    title: '平台管理',
    path: 'config',
    icon: 'setting',
    children: [
      {
        title: '预约策略',
        path: 'booking',
        models: () => [import('../models/booking')],
        component: () => import('../routes/Booking'),
      },
      {
        title: '数据字典',
        path: 'dict',
        models: () => [import('../models/dict' )],
        component: () => import('../routes/Dict'),
      },
      {
        title: '健身项目',
        path: 'fitness',
        models: () => [import('../models/fitness')],
        component: () => import('../routes/Fitness'),
      },
      {
        title: '元素勋章',
        path: 'elementMedal',
        models: () => [import('../models/elementMedal')],
        component: () => import('../routes/ElementMedal'),
      },
      {
        title: '年卡策略设置',
        path: 'vipCardStrategy',
        models: () => [import('../models/vipCardStrategy')],
        component: () => import('../routes/VipCardStrategy'),
      },
      {
        title: '消息',
        path: 'msg',
        models: () => [import('../models/msg')],
        component: () => import('../routes/Msg'),
      },
      {
        title: '图片',
        path: 'img',
        models: () => [import('../models/img')],
        component: () => import('../routes/Img'),
      },
      {
        title: 'JOB',
        path: 'job',
        models: () => [import('../models/job')],
        component: () => import('../routes/Job'),
      },
      {
        title: 'JOB_INSTANCE',
        path: 'jobInstance',
        models: () => [import('../models/jobInstance')],
        component: () => import('../routes/JobInstance'),
      },
      {
        title: '平台账户',
        path: 'account',
        models: () => [import('../models/account')],
        component: () => import('../routes/Account'),
      },
      {
        title: '店铺',
        path: 'shop',
        selected: true,
        models: () => [import('../models/shop')],
        component: () => import('../routes/Shop/Shop'),
      },],
  }, {
    title: '登录管理',
    path: 'user',
    visible: false,
    children: [
      {
        title: '登录',
        path: 'login',
        component: () => import('./User/Login'),
      },
      {
        title: '注册',
        path: 'register',
        component: () => import('./User/Register'),
      },],
  }];
