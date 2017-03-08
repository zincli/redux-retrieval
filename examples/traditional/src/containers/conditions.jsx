import React from 'react';
import { connect } from 'react-redux';
import { retrieve } from 'redux-retrieval/actions';
import { conditions } from 'redux-retrieval/selectors';
import { Tag } from 'antd';

export function Conditions(props) {
  const { data, onClose, onCloseAll, ...rest } = props;
  return (
    <div {...rest} >
      {data.map(
        condition => (
          <Tag key={`${condition.name}-${condition.value}`} closable onClose={() => {onClose(condition)}}>
            {condition.value}
          </Tag>
        )
      )}
      {data.length > 0 ? (
        <Tag onClick={onCloseAll}>Clear All</Tag>
      ) : null}
    </div>
  );
}

export default connect(
  state => ({ data: conditions(state) }),
  dispatch => ({
    onClose: condition => dispatch(
      retrieve({ [condition.name]: condition.value }, { drop: true })
    ),
    onCloseAll: () => {dispatch(retrieve({}))}
  })
)(Conditions);
