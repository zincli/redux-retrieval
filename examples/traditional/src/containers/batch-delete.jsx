import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import { selectedIds } from 'redux-selections/selectors';

export default connect(
  state => ({
    selectedItems: selectedIds(state.itemSelections),
    disabled: selectedIds(state.itemSelections).length <= 0,
  }),
  undefined,
  ({ selectedItems, disabled }, dispatchedProps, ownProps) => ({
    onClick: () => {
      Modal.confirm({
        title: 'Please Confirm',
        content: `Click OK to delete the selected ${selectedItems.length} items`,
        okText: 'OK',
        cancelText: 'Cancel',
      });
    },
    disabled,
    ...ownProps
  })
)(Button);
