import dynamic from 'dva/dynamic';
import NotFound from '../routes/Exception/404';

let app;
let menu;

const set = (useApp, useMenu) => {
  app = useApp;
  menu = useMenu;
};

const getMenu = (paths, menus) => {
  let path, menu;
  for (let i = 0, len = paths.length; i < len; i++) {
    path = paths[i];
    for (let j = 0, jLen = menus.length; j < jLen; j++) {
      menu = menus[j];
      if (path == menu.path) {
        if (menu.children) {
          menus = menu.children;
          break;
        } else {
          return menu;
        }
      }
    }
  }
};

const getItem = (path) => {
  if (path) {
    if (path.startsWith('/')) {
      path = path.substr(1);
    }
    const paths = path.split('/');
    return getMenu(paths, menu);
  }
};

const pathDynamics = new Map();

const getComponent = (path, fn) => {
  let component = pathDynamics.get(path);
  if (!component) {
    const item = getItem(path);
    if (item) {
      component = dynamic({
        app,
        models: item.models,
        component: item.component,
      });
      pathDynamics.set(item.realPath, component);
    } else {
      component = <NotFound/>;
    }
  }

  fn && fn(component);
};

export {getComponent, set};
