import React from 'react';
import { Button } from '@material-ui/core';

export const CustomButton = (props) => {
  return (
    <Button
      variant="contained"
      style={{ background: '#0e1731', color: 'white', ...props.add }}
      onClick={props.clickButton}
		>
		  {props.children}
    </Button>
  );
};