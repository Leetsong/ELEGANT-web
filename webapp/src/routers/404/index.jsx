import React from 'react';

import {
  Alert
} from 'antd';

export default () => (
  <Alert
    style={{
      margin: '30px 0'
    }}
    message="Ooops 404!"
    description="Page Not Found!"
    type="warning"
  />
);
