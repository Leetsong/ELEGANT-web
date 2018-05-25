import React from 'react';
import { connect } from 'dva';
import { Route, Switch, Link } from 'react-router-dom';
import {
  Layout as AntdLayout,
  Icon
} from 'antd';

import { ROUTER_INFO } from 'src/router';
import Logo from './logo';
import Banner from './banner';
import Menu from './menu';
import { APP } from 'src/elegant.config';

import styles from './index.less';

const {
  Header,
  Content,
  Footer
} = AntdLayout;

class Layout extends React.Component {

  menu = ROUTER_INFO
    .filter(r => r.isMenu 
              && r.path 
              && r.path !== ROUTER_INFO[ROUTER_INFO.homeIdx].path)
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
        <Banner 
          style={{ display: current.pathname === ROUTER_INFO[ROUTER_INFO.homeIdx].path 
            ? 'block' : 'none' 
          }}
        >
          <div className={styles.bannerContent}>
            <h1 className={styles.title}>{ APP.name }</h1>
            <p className={styles.description} dangerouslySetInnerHTML={{ __html: APP.richDescription }}/>
            <div className={styles.operations}>
              <Link className={styles.tryItOut} to={ROUTER_INFO[ROUTER_INFO.tryItOutIdx].path}>Try it out!</Link>
              <Link className={styles.goToDocs} to={ROUTER_INFO[ROUTER_INFO.docsIdx].path}>Go to docs <Icon type="right"/></Link>
            </div>
          </div>
        </Banner>
        <Content className={styles.content}>
          <Switch>
            { ROUTER_INFO.map((r, i) => (
              <Route exact={r.exact} key={i} path={r.path} component={r.component} />
            )) }
          </Switch>
        </Content>
        <Footer className={styles.footer}>
          { APP.name } <Icon type="copyright" /> 2018 Created by <a href={APP.author.index}>{APP.author.name}</a>
        </Footer>
      </AntdLayout>
    );
  }
}

export default connect(({ menu }) => {
  return { menu };
})(Layout);
