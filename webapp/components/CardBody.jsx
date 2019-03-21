import React from 'react';

const CardBody = ({ className = '', ...props }) => {
  const classes = `card-body ${className}`;
  return <div className={classes} {...props} />;
};

export default CardBody;
