import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{
        width: '150px',
        margin: 'auto',
        display: 'block',
        marginTop: '10px',
      }}
    />
  </Fragment>
);

export default Spinner;
