import React from 'react';
import { connect } from 'react-redux';
import { retrieve } from 'redux-retrieval/actions';
import { Tag } from 'antd';

export function Conditions(props) {
  const { data, onClose, onCloseAll, ...rest } = props;
  return (
    <div {...rest} >
      {data.map(
        condition => (
          <Tag key={`${condition.name}-${condition.value}`} closable onClose={() => {onClose(condition)}}>
            {`${condition.name}: ${condition.value}`}
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
  state => ({ data: toArray(state.retrievedConditions).filter(noInternal) }),
  dispatch => ({
    onClose: condition => dispatch(
      retrieve({ [condition.name]: condition.value }, { drop: true })
    ),
    onCloseAll: () => {dispatch(retrieve({}))}
  })
)(Conditions);

function toArray(conditions) {
  const result = [];

  Object.keys(conditions).forEach((name) => {
    const value = conditions[name];

    if (Array.isArray(value)) {
      value.forEach(val => result.push({ name, value: val }));
    } else {
      result.push({ name, value });
    }
  });

  return result;
}

function noInternal({ name }) {
  return ['pageNumber'].indexOf(name) < 0;
}
