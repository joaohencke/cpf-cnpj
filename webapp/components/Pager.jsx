/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

const Pager = ({ currentPage, total, change }) => {
  return (
    <nav>
      <ul className="pagination">
        {currentPage > 0 && (
          <li className="page-item float-left">
            <a
              href="#"
              className="page-link"
              onClick={e => {
                e.preventDefault();
                change(-1);
              }}
            >
              anterior
            </a>
          </li>
        )}
        {currentPage + 1 < total && (
          <li className="page-item" style={{ marginLeft: 'auto' }}>
            <a
              href="#"
              className="page-link"
              onClick={e => {
                e.preventDefault();
                change(1);
              }}
            >
              proximo
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
};

export default Pager;
