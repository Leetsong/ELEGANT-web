import React from 'react';

import styles from './index.less';

export default ({ type, style }) => <div className={styles.hline} style={{ borderBottomType: type, ...style }} />
