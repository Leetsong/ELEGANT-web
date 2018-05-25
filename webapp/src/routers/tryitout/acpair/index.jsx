import React from 'react';
import {
  Checkbox,
  List,
  Tag as AntdTag,
  Row,
  Col,
  Tooltip
} from 'antd';

const Tag = ( {content, ...props} ) => (
  <AntdTag {...props} style={{ marginRight: 0 }}>{content}</AntdTag>
);

export default ({ acpair, checked, onChange }) => {
  const {
    min_api_level: minApiLevel,
    max_api_level: maxApiLevel,
    bad_devices: badDevices,
    important,
    message
  } = acpair.context;
  const type = acpair.api['@type'];
  const actions = [];
  let content = null;
  let description = null;

  if (badDevices && badDevices.length) {
    description = "Incompatible with devices: ";
    for (let i = 0; i < badDevices.length - 1; i ++) {
      description += badDevices[i] + " | ";
    }
    description += badDevices[badDevices.length - 1];
  }

  switch(type) {
    case 'field': 
      actions.push(<Tag color="magenta" content="field" />); 
      content = acpair.api.field;
      break;
    case 'method': 
      actions.push(<Tag color="green" content="method" />); 
      content = acpair.api.method;
      break;
    case 'iface': 
      actions.push(<Tag color="blue" content="iface" />); 
      content = acpair.api.iface;
      break;
  }

  if (!!important) {
    actions.push(<Tag color="gold" content="important"/ >)
  }

  if (!!minApiLevel) {
    actions.push(<span>added in: { minApiLevel } </span>);
  }

  if (!!maxApiLevel) {
    actions.push(<span>deprecated at: { maxApiLevel } </span>);
  }

  return (
    <List.Item actions={actions}>
      <List.Item.Meta
        avatar={
          <Checkbox
            checked={checked}
            onChange={e => onChange(acpair, e.target.checked)}
          />
        }
        title={
          <Tooltip
            placement="topLeft"
            title={message}
          >
            {content}
          </Tooltip>
        }
        description={description}
      />
    </List.Item>
  );
};
