import React from 'react';

const Content = ({ breadcrumb, ...rest }) => {
  const { children } = rest;
  delete rest.children;
  return (
    <div className="container" {...rest}>
      {children}
    </div>
  );
};

export default Content;
