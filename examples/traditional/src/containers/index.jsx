import React from 'react';
import 'antd/dist/antd.css';

import Form from './form';
import Conditions from './conditions';
import List from './list';
import Pagination from './pagination';
import BatchDelete from './batch-delete';

const styles = {
  container: {
    width: 1200,
    margin: '50px auto'
  },
  conditions: {
    margin: '20px 0'
  },
  pagination: {
    margin: '20px 0'
  },
  batch: {
    margin: '40px 0 20px 0'
  },
  batchLabel: {
    marginRight: 20
  }
};

export default (props) => {
  return (
    <div style={styles.container}>
      <Form />
      <Conditions style={styles.conditions} />
      <div style={styles.batch}>
        <span style={styles.batchLabel}>Operations: </span>
        <BatchDelete>Delete</BatchDelete>
      </div>
      <List />
      <Pagination style={styles.pagination} defaultCurrent={1} />
    </div>
  );
}
