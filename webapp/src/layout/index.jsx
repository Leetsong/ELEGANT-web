import React from 'react';
import { Route, Switch } from 'dva/router';
import {
  Menu
} from 'antd';
import { ROUTER_INFO } from '../router';

const SubMenu = Menu.SubMenu;

class Layout extends React.Component {
  state = {
    ok: 1
  };

  render() {
    return (
      <div>
        <Menu mode="horizontal">
          <Menu.Item>菜单项</Menu.Item>
          <SubMenu title="子菜单">
            <Menu.Item>子菜单项</Menu.Item>
          </SubMenu>
        </Menu>
        <h1>ELEGANT {this.state.ok }</h1>
        <Switch>
        { ROUTER_INFO.map((r, i) => (
            <Route key={i} path={r.path} component={r.component} />
        )) }
        </Switch>
      </div>
    );
  }
}

export default Layout;
