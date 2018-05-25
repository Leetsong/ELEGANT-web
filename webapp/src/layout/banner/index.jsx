import React from 'react';

import styles from './index.less';
import backgroundUrl from 'assets/ELEGANT-background.png';

export default ({ style, children }) => (
  <div className={styles.banner} style={style}>
    { children }
  </div>
);
