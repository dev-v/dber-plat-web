import React from 'react';
import {connect} from 'dva';
import {Switch, Route} from 'dva/router';
import {Icon, Breadcrumb} from 'antd';

class ContentSwitch extends React.Component {
  componentWillMount() {
    if (this.props.menuClick) {
      const menuClick = this.props.menuClick;
      menuClick.changeComponent = (item, items) => {
        this.props.dispatch({
          type: 'contentSwitch/changeComponent',
          item,
          items,
          app: menuClick.app,
        });
      };
    }
  }

  render() {
    const {component, items} = this.props;
    return (
      <div>
        <Breadcrumb style={{paddingBottom: '16px'}}>
          {items.map((item) => {
            return <Breadcrumb.Item key={item.realPath || item.path}>
              {item.icon && <Icon type={item.icon}/>}
              {item.title}
            </Breadcrumb.Item>;
          })}
        </Breadcrumb>
        <Switch>
          <Route component={component}></Route>
        </Switch>
      </div>);
  }
}

export default connect(({contentSwitch}) => {
  return contentSwitch;
})(ContentSwitch);
