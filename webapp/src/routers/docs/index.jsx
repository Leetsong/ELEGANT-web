import React from 'react';

import Markdown from 'components/markdown';
import docs from 'assets/ELEGANT-docs.md';

export default () => <Markdown src={docs} type="html" />;
