import React from 'react';
import 'antd/dist/antd.css';

import Layout from 'sharing/layout';

import Tabs from './tabs';
import Form from './form';
import Conditions from './conditions';
import List from './list';
import Pagination from './pagination';
import Refresh from './refresh';

export default (props) => {
  return (
    <Layout
      title="Beginner Tutorial Of redux-retrieval"
      form={<Form />}
      list={<List />}
      pagination={<Pagination defaultPageSize={3} defaultCurrent={1} />}
    />
  );
}
