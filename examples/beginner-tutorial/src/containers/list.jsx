import React from 'react';
import { connect } from 'react-redux';
import { Spin, Table, Column } from 'antd';

export function List(props) {
  return (
    <Spin spinning={props.spining}>
      <Table dataSource={props.items} pagination={false} rowKey="id">
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
    spining: false,
    items: state.appData.items,
  })
)(List)
