import React from 'react';
import { connect } from 'react-redux';
import { retrieve } from 'redux-retrieval/actions';
import { makeArray } from 'redux-retrieval/selectors';
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
  state => ({ data: [{ name: 'foo', value: 'foo'}, { name: 'bar', value: 'bar' }] }),
  dispatch => ({
    onClose: condition => console.log('remove condition: ', condition.value),
    onCloseAll: () => console.log('remove all conditions')
  })
)(Conditions);
