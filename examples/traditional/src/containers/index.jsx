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
    margin: '20px auto'
  },
  title: {
    marginBottom: 30
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
      <h1 style={styles.title}>Simple List App using redux-retrieval</h1>
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
