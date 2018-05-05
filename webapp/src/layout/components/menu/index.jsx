import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Menu as AntdMenu
} from 'antd';

import styles from './index.less';

const AntdMenuItem = AntdMenu.Item;

class Menu extends React.Component {

  render() {
    const { menu, current } = this.props;
    const selectedKeys = menu
      .filter(m => m.to === current.to)
      .map(m => m.to);

    return (
      <AntdMenu
        theme="dark"
        mode="horizontal"
        selectedKeys={selectedKeys}
        className={styles.menu}
      >
        {
          menu.map(m => (
            <AntdMenuItem key={m.to}><Link to={m.to}>{m.title}</Link></AntdMenuItem>
          ))
        }
      </AntdMenu>
    );
  }
}

Menu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  current: PropTypes.shape({
    to: PropTypes.string.isRequired
  })
};

export default Menu;