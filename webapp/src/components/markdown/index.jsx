import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import styles from './index.less';

const Markdown = ({ src, type }) => (
  'html' === type 
  ? <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: src }} />
  : <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: marked(src) }}/>
)

Markdown.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.oneOf([ 'markdown', 'html' ]).isRequired
};

export default Markdown;
