import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {
  Modal,
  Spin
} from 'antd';
import Markdown from 'react-markdown';

import styles from './index.less';

class ResultModal extends React.Component {

  render() {
    const {
      showModal,
      onOk,
      results
    } = this.props;

    const {
      isAnalyzing
    } = results;

    return (
      <Modal
        mask
        width="70%"
        title="Analysis Technical Report"
        visible={showModal}
        onOk={onOk}
      >
        { 
          isAnalyzing
            ? <Spin />
            : <Markdown
                source={results.resultInString}
              />
        }
      </Modal>
    )
  }
}

ResultModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired
};

export default ResultModal;
