import NotFound from '../routes/Exception/404';
import dynamic from 'dva/dynamic';

const pathDynamics = new Map();

export default {
  namespace: 'contentSwitch',

  state: {
    component: () => (<NotFound/>),
    items: [],
  },

  reducers: {
    changeComponent(oldProps, action) {
      const {app, item, items} = action;
      let component = pathDynamics.get(item.realPath);
      if (!component) {
        component = dynamic({
          app,
          models: item.models,
          component: item.component,
        });
        pathDynamics.set(item.realPath, component);
      }
      return {...oldProps, component, items};
    },
  },
};
