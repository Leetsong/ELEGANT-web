import React from 'react';

import Section from './section';
import { INTRODUCTIONS } from 'src/elegant.config';

import styles from './index.less';

export default () => (
  <div>
    { INTRODUCTIONS.map((s, i) => 
      <Section
        key={i}
        title={s.title}
        extra={s.extra}
      >
        <span dangerouslySetInnerHTML={{__html: s.description}} />
      </Section>
    )}
  </div>
);
