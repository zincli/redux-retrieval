import { connect } from 'react-redux';
import { Pagination } from 'antd';

export default connect(
  state => ({
    total: state.appData.total || 0
  }),
  dispatch => ({
    onChange: page => console.log('turn page: ', page)
  })
)(Pagination);
