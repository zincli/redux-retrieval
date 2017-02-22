import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { turnPage } from 'redux-retrieval/actions';

export default connect(
  state => ({
    total: state.retrievedResult.total || 0,
    pageSize: 10,
  }),
  dispatch => ({
    onChange: page => dispatch(turnPage(page))
  })
)(Pagination);
