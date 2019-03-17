/* eslint-disable react/forbid-prop-types, jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../routes';

const Item = ({ route, text, params }) => {
  console.log(text);
  if (!route) {
    return <span className="breadcrumb-item">{text}</span>;
  }

  return (
    <Link route={route} params={params}>
      <a href="">{text}</a>
    </Link>
  );
};

Item.propTypes = {
  route: PropTypes.string,
  params: PropTypes.any,
  text: PropTypes.string.isRequired,
};

Item.defaultProps = {
  route: undefined,
  params: undefined,
};

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb bg-white">
      {items.map(item => (
        <Item {...item} key={item.text} />
      ))}
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Breadcrumb;
