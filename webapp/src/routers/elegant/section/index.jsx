import React from 'react';
import {
  Row,
  Col
} from 'antd'

import HLine from 'components/hline';

import styles from './index.less';

export default ({ children, title, extra }) => (
  <div>
    <Row gutter={24} className={styles.section}>
      <Col span={13}>
        <h2 className={styles.title}>{ title }</h2>
        <HLine type="solid" style={{ margin: '0 0 12.5px 0' }} />
        <p className={styles.children}>{ children }</p>
      </Col>
      <Col span={11} >
        <div className={styles.extraWrapper}>
          { extra }
        </div>
      </Col>
    </Row>
    <HLine type="solid" />
  </div>
);
