import React from 'react';

const styles = {
  container: {
    width: 1200,
    margin: '20px auto'
  },
  title: {
    marginBottom: 30
  },
  opsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: '20px 0',
  },
  conditions: {
    margin: '20px 0'
  },
  tabs: {
    margin: '20px 0 10px'
  },
  form: {
  },
  conditions: {
    margin: '10px 0'
  },
  pagination: {
    margin: '20px 0'
  },
  operations: {

  },
  refresh: {

  }
};

export default (props) => {
  return (
    <div style={styles.container}>
      {props.title ? <h1 style={styles.title}>{props.title}</h1> : null}
      {props.tabs ? <div style={styles.tabs}>{props.tabs}</div> : null}
      <div style={styles.opsContainer}>
        <div style={{ order: props.operations ? 2 : 1}}>
          {props.form ? <div style={styles.form}>{props.form}</div> : null}
          {props.conditions ? <div style={styles.conditions}>{props.conditions}</div> : null}
        </div>
        <div style={{ order: props.operations ? 1 : 2}}>
          {props.operations ? <div style={styles.operations}>{props.operations}</div> : null}
        </div>
      </div>
      {props.list ? <div style={styles.list}>{props.list}</div> : null}
      {props.pagination ? <div style={styles.pagination}>{props.pagination}</div> : null}
    </div>
  );
}
