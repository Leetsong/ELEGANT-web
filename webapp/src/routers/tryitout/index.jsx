import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Upload,
  Icon,
  List,
  Checkbox,
  Button,
  Card,
  Radio,
  Tag,
  message
} from 'antd';

import Title from 'components/title';
import HLine from 'components/hline';
import Acpair from './acpair';
import ResultModal from './results';
import { D3ALGO } from 'src/elegant.config';

import styles from './index.less';

const {
  Group: RadioGroup,
  Button: RadioButton
} = Radio;
const { Dragger } = Upload;

class TryItOut extends React.Component {
  state = {
    file: null,
    d3Algo: D3ALGO[D3ALGO.default].value,
    indeterminate: false,
    checkAll: false
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'acpair/fetch'
    });
  }

  onUpload = () => {
    const { file: uploadedFile, d3Algo } = this.state;
    const { list: acpairs } = this.props.acpair.settings;

    const uploadedAcpairs = acpairs
      .filter(a => a.checked)
      .map(a => { return { api: a.api, context: a.context }; });

    if (!uploadedFile) {
      message.warning('Please upload your apk file first ;-)');
      return;
    }

    if (!uploadedAcpairs || !uploadedAcpairs.length) {
      message.warning('Please check at least one api context pair ;-)');
      return;
    }

    this.props.dispatch({
      type: 'acpair/upload',
      payload: {
        acpairs: uploadedAcpairs,
        file: uploadedFile,
        d3Algo: d3Algo
      }
    });
  }

  onD3AlgoChange = e => {
    this.setState({
      ...this.state,
      d3Algo: e.target.value
    });
  }

  onDraggerRemove = file => {
    if (file.name === this.state.file.name) {
      this.setState({
        ...this.state,
        file: null
      });
    }
  };

  onCheckOneChange = (acpair, checked) => {
    let acpairs = this.props.acpair.settings.list;
    const checkedCount = acpairs
      .reduce((r, a) => r + (a.checked ? 1 : 0), 0) + (checked ? 1 : -1);

    this.props.dispatch({
      type: 'acpair/check-uncheck-one',
      payload: {
        index: acpair.index,
        checked
      }
    });

    this.setState({
      indeterminate: !!checkedCount && (checkedCount < acpairs.length),
      checkAll: checkedCount === acpairs.length
    })
  };

  onCheckAllChange = e => {
    this.props.dispatch(e.target.checked
      ? { type: 'acpair/check-all' }
      : { type: 'acpair/check-none' });

    this.setState({
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  beforeDaggerUpload = file => {
    this.setState({
      ...this.state,
      file
    });

    return false;
  };

  onCloseResultModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'acpair/set-show-result',
      payload: {
        showResult: false
      }
    });
  }

  render() {
    const { showResult, results } = this.props.acpair;

    const disabled = null !== this.state.file;
    const {
      list: acpairs,
      isLoading
    } = this.props.acpair.settings;
    const {
      indeterminate,
      checkAll,
      d3Algo
    } = this.state;

    return (
      <div>
        <Title title="Choose apk" />
        <div className={styles.draggerWrapper}>
          <Dragger
            name="apk"
            accept="application/vnd.android.package-archive"
            multiple={false}
            disabled={disabled}
            beforeUpload={this.beforeDaggerUpload}
            onRemove={this.onDraggerRemove}
            style={{ opacity: disabled ? 0.4 : 1 }}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">click or drag an <strong>apk</strong> to this area</p>
            <p className="ant-upload-hint">supports for only <strong>one apk</strong></p>
          </Dragger>
        </div>
        <Title title="Choose 3rd party library detection algorithms" />
        <div className={styles.radioWrapper}>
          <RadioGroup onChange={this.onD3AlgoChange} value={d3Algo}>
            {
              D3ALGO.map(d => <RadioButton key={d.value} value={d.value}>
                { d.title }
              </RadioButton>)
            }
          </RadioGroup>
        </div>
        <Title title="Choose api context pairs" />
        <div className={styles.cardWrapper}>
          <Card
            title={
              <Checkbox
                indeterminate={indeterminate}
                onChange={this.onCheckAllChange}
                checked={checkAll}
              >
                <strong>All/None</strong>
              </Checkbox>
            }
            loading={isLoading}
          >
            <List
              dataSource={acpairs}
              renderItem={item =>
                <Acpair acpair={item} checked={item.checked} onChange={this.onCheckOneChange} />
              }
            />
          </Card>
        </div>
        <HLine type="dashed" />
        <div className={styles.analyseButtonWrapper}>
          <Button
            disabled={isLoading}
            type="primary"
            icon="cloud-upload"
            onClick={this.onUpload}
          >
            Analyse
          </Button>
        </div>
        <ResultModal
          showModal={showResult}
          results={results}
          onOk={this.onCloseResultModal}
        />
      </div>
    );
  }
}

export default connect(({ acpair }) => {
  return { acpair };
})(TryItOut);
