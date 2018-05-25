import React from 'react';
import {
  Alert
} from 'antd';

export default () => (
  <Alert
    style={{
      margin: '30px 0'
    }}
    message="Ooops!"
    description="Stats is on the way..."
    type="warning"
  />
);
