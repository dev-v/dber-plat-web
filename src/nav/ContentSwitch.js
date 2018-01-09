import React from 'react';
import {Switch, Route} from 'dva/router';
import {Icon, Breadcrumb} from 'antd';
import {getComponent} from './Component';

export default class ContentSwitch extends React.Component {
  state = {
    component: undefined,
    items: [],
  };

  changeComponent = ({item, items}) => {
    getComponent(item.realPath, (component) => {
      this.setState({
        ...this.state,
        component,
      });
    });
  };

  componentWillMount() {
    if (this.props.menuClick) {
      const menuClick = this.props.menuClick;
      menuClick.changeComponent = (item, items) => {
        getComponent(item.realPath, (component) => {
          this.setState({
            ...this.state,
            component,
            items,
          });
        });
      };
    }
  }

  render() {
    const {component, items} = this.state;
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
