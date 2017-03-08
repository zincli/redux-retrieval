import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';

function PureTabs(props) {
  const { dataSource = [], ...rest } = props;

  return (
    <Tabs {...rest} >
      {dataSource.map(tab => <Tabs.TabPane key={tab.key} tab={tab.label} />)}
    </Tabs>
  );
}

export default connect(
  state => ({
    dataSource: [
      { key: '', label: 'All' },
      { key: 'Seed', label: 'Seed' },
      { key: 'Seed Destiny', label: 'Seed Destiny' },
      { key: 'UC', label: 'UC' },
    ]
  }),
  dispatch => ({
    onChange: key => console.log('change tab: ', key)
  })
)(PureTabs);
