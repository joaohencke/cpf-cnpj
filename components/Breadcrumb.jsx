import React from 'react';

const Breadcrumb = ({ items }) => {

  return (
    <nav className="breadcrumb bg-white">
      {items.map(item => (<span className="breadcrumb-item" key={item}>{item}</span>))}
    </nav>
  );
};

export default Breadcrumb;