import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import { toggleAllSelection } from 'redux-selections/actions';
import { allSelected } from 'redux-selections/selectors';

export default connect(
  state => ({
    checked: allSelected(state.itemSelections)
  }),
  dispatch => ({
    onChange: () => dispatch(toggleAllSelection())
  })
)(Checkbox);
