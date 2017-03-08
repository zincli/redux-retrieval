import { connect } from 'react-redux';
import { Button } from 'antd';
import { reRetrieve } from 'redux-retrieval/actions';

export default connect(
  undefined,
  (dispatch) => ({
    onClick: () => dispatch(reRetrieve())
  })
)(Button);
