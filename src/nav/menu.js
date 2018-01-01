export default [
  {
    title: '配置管理',
    path: 'config',
    icon: 'setting',
    children: [
      {
        title: '数据字典',
        selected: true,
        path: 'dict',
        models: () => [import('../models/dict' )],
        component: () => import('../routes/Dict/Index'),
      }, {
        title: '预约策略',
        path: 'booking',
        models: () => [import('../models/booking')],
        component: () => import('../routes/Booking'),
      },],
  },
  {
    title: '策略设置',
    path: 'strategy',
    icon: 'profile',
    children: [
      {
        title: '健身项目',
        path: 'fitness',
        models: () => [import('../models/fitness')],
        component: () => import('../routes/Fitness'),
      }, {
        title: '预约策略',
        path: 'booking',
        models: () => [import('../models/booking')],
        component: () => import('../routes/Booking'),
      },],
  }];
