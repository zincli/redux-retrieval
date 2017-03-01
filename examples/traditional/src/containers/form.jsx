import React from 'react';
import { connect } from 'react-redux';
import { retrieve } from 'redux-retrieval/actions';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, Input, Button, Radio } from 'antd';

function decorate(Co) {
  return (props) => {
    const { input, meta, children, ...rest } = props;
    return (
      <Co {...input} {...rest} >
        {children}
      </Co>
    );
  };
}

export function ConditionsForm(props) {
  return (
    <Form inline onSubmit={props.handleSubmit}>
      <Form.Item>
        <Field name="id" placeholder="id" component={decorate(Input)} />
      </Form.Item>
      <Form.Item>
        <Field name="name" placeholder="name" component={decorate(Input)} />
      </Form.Item>
      <Form.Item label="Type">
        <Field name="type" component={decorate(Radio.Group)} >
          <Radio value="">All</Radio>
          <Radio value="HG">HG</Radio>
          <Radio value="MG">MG</Radio>
          <Radio value="PG">PG</Radio>
        </Field>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Search</Button>
      </Form.Item>
    </Form>
  )
}

export default connect(
  undefined, // omit the mapStateToProps
  dispatch => ({
    onSubmit: conditions => dispatch(retrieve(conditions, { attach: true }))
  })
)(reduxForm({ form: 'conditions' })(ConditionsForm))
