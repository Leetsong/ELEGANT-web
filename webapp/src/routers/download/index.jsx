import React from 'react';

import Markdown from 'components/markdown';
import download from 'assets/ELEGANT-download.md';
import {
  ELEGANT_JAR_FILE,
  ELEGANT_CLI_JAR_FILE
} from 'services';

import styles from './index.less';

export default () => (
  <div>
    <div className={styles.operations}>
      <a className={styles.elegantButton} href={ELEGANT_JAR_FILE} download>ELEGANT.jar</a>
      <a className={styles.elegantCliButton} href={ELEGANT_CLI_JAR_FILE} download>elegant-cli.jar</a>
    </div>
    <Markdown src={download} type="html" />
  </div>
);
