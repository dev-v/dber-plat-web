import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import IndexPage from './nav/IndexPage';
import NotFound from './routes/Exception/404';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';

function RouterConfig({history, app}) {
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact
                 render={props => <IndexPage {...props} app={app}/>}/>
          <Route render={() => <NotFound/>}/>
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
