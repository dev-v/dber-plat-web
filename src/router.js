import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import IndexPage from './nav/IndexPage';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';

export default function RouterConfig({history, app}) {
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path='/' render={props => <IndexPage {...props}/>}/>
        </Switch>
      </Router>
    </LocaleProvider>
  );
}
