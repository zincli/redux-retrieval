import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { turnPage, switchPageSize } from 'redux-retrieval/actions';
import { page } from 'redux-retrieval/selectors';

export default connect(
  state => ({
    total: state.retrievedResult.total || 0,
    current: page(state) || 1,
  }),
  dispatch => ({
    onChange: page => dispatch(turnPage(page)),
    onShowSizeChange: (current, pageSize) => dispatch(switchPageSize(pageSize))
  })
)(Pagination);
