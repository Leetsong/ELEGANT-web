import React from 'react';
import { connect } from 'dva';
import { Route, Switch, Link } from 'react-router-dom';
import {
  Layout as AntdLayout
} from 'antd';

import { ROUTER_INFO } from 'src/router';
import Logo from './components/logo';
import Menu from './components/menu';

import styles from './index.less';

const {
  Header,
  Content,
  Footer
} = AntdLayout;

class Layout extends React.Component {

  menu = ROUTER_INFO
    .filter(r => r.path && r.path !== '/')
    .map(r => {
      return {
        to: r.path,
        title: r.title
      };
    });

  render() {
    const { current } = this.props.menu;

    return (
      <AntdLayout className={styles.layout}>
        <Header className={styles.header}>
          <Link to={ROUTER_INFO[0].path}>
            <Logo style={{
              margin: '16px 24px 16px 0',
              float: 'left'
            }} />
          </Link>
          <Menu
            menu={this.menu}
            current={{to: current.pathname}}
          />
        </Header>
        <Content className={styles.content}>
          <Switch>
            { ROUTER_INFO.map((r, i) => (
              <Route exact={r.exact} key={i} path={r.path} component={r.component} />
            )) }
          </Switch>
        </Content>
        <Footer className={styles.footer}>
          ELEGANT ©2018 Created by Simon Lee
        </Footer>
      </AntdLayout>
    );
  }
}

export default connect(({ menu }) => {
  return { menu };
})(Layout);
