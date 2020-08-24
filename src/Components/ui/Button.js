import React from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

export const CustomButton = (props) => {
  return (
    <Button
      type={props.btnType}
      variant="contained"
      style={{ background: '#0e1731', color: 'white', ...props.add }}
      onClick={props.clickButton}
		>
      {props.loading && <CircularProgress size={18} thickness={5} style={{ color: '#98c5e9', marginRight: '3px' }} />}
		  {props.children}
    </Button>
  );
};