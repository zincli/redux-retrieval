import React from 'react';
import 'antd/dist/antd.css';

import Layout from 'sharing/layout';

import Tabs from './tabs';
import Form from './form';
import Conditions from './conditions';
import List from './list';
import Pagination from './pagination';
import BatchDelete from './batch-delete';
import Refresh from './refresh';

const styles = {
  operations: {

  },
  batchLabel: {
    marginRight: 20
  },
  opBtn: {
    marginRight: 10
  }
};

export default (props) => {
  return (
    <Layout
      title={'Simple List App using redux-retrieval'}
      tabs={
        <Tabs defaultActiveKey="" dataSource={[
          { key: '', label: 'All' },
          { key: 'Seed', label: 'Seed' },
          { key: 'Seed Destiny', label: 'Seed Destiny' },
          { key: 'UC', label: 'UC' },
        ]} />
      }
      form={<Form />}
      conditions={<Conditions />}
      operations={
        <div style={styles.operations}>
          <span style={styles.batchLabel}>Operations: </span>
          <BatchDelete style={styles.opBtn}>Delete</BatchDelete>
          <Refresh>Refresh</Refresh>
        </div>
      }
      list={<List />}
      pagination={
        <Pagination
          style={styles.pagination}
          showSizeChanger
          pageSizeOptions={['3', '5', '10']}
          defaultPageSize={3}
        />
      }
    />
  );
}
