import React from 'react';
import { Button } from 'antd';

import styles from './index.less';

class Home extends React.Component {
  state = {
    input: 'hello',
    c: 0
  };

  render() {
    return (
      <Button
        className={styles.hello}
        onClick={() => this.setState({ input: this.state.input, c: this.state.c + 1 })}
      >
        {this.state.input}, world: {this.state.c}
      </Button>
    );
  }
}

export default Home;
