import {Layout, Menu} from 'antd';
import React from 'react';
import menus from './menu';
import SideMenu from '../components/SideMenu';
import ContentSwitch from '../routes/ContentSwitch';

const {Header, Content, Footer} = Layout;

class IndexPage extends React.Component {
  render() {
    const menuClick = {app: this.props.app};
    return (
      <Layout>
        <Layout style={{minHeight: '100vh'}}>
          <SideMenu datas={menus} onClick={(item, items) => {
            menuClick.changeComponent && menuClick.changeComponent(item, items);
          }}/>
          <Layout>
            <Header>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{lineHeight: '64px'}}
              >
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </Header>
            <Content style={{background: '#fff', padding: '16px'}}>
              <ContentSwitch menuClick={menuClick}/>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default IndexPage;
