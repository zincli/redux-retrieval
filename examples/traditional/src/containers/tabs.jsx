import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { switchTab } from 'redux-retrieval/actions';

function PureTabs(props) {
  const { dataSource = [], ...rest } = props;

  return (
    <Tabs {...rest} >
      {dataSource.map(tab => <Tabs.TabPane key={tab.key} tab={tab.label} />)}
    </Tabs>
  );
}

export default connect(
  undefined,
  dispatch => ({
    onChange: key => dispatch(switchTab(key, { name: 'series' }))
  })
)(PureTabs);
