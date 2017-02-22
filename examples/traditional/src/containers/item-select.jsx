import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import { toggleSelection } from 'redux-selections/actions';
import { isSelected } from 'redux-selections/selectors';

export default connect(
  (state, ownProps) => ({
    checked: isSelected(state.itemSelections, ownProps.itemId)
  }),
  (dispatch, ownProps) => ({
    onChange: () => dispatch(toggleSelection(ownProps.itemId))
  })
)(Checkbox);
