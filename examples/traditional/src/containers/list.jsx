import React from 'react';
import { connect } from 'react-redux';
import { retrieve } from 'redux-retrieval/actions';
import { Spin, Table, Column } from 'antd';
import ItemSelectAll from './item-select-all';
import ItemSelect from './item-select';

export function List(props) {
  return (
    <Spin spinning={props.spining}>
      <Table dataSource={props.items} pagination={false} rowKey="id">
        <Table.Column
          key="selections"
          title={<ItemSelectAll />}
          render={item => <ItemSelect itemId={item.id} /> } />
        <Table.Column key="id" title="Id" dataIndex="id" />
        <Table.Column key="name" title="Name" dataIndex="name" />
        <Table.Column key="type" title="Type" dataIndex="type" />
        <Table.Column key="price" title="Price" dataIndex="price" />
        <Table.Column key="series" title="Series" dataIndex="series" />
      </Table>
    </Spin>
  )
}

export default connect(
  state => ({
    spining: state.retrieving,
    items: state.retrievedResult.items || [],
  })
)(List)
