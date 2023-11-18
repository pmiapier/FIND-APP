import React from 'react';

export default function Pagination({ page, setPage, allPage }) {
  const handleDecrease = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleIncrease = () => {
    if (page < allPage) setPage(page + 1);
  };

  let pageElements = [];

  for (let i = 1; i <= allPage; i++) {
    pageElements.push(
      <li onClick={() => setPage(i)} key={i}>
        <a
          aria-current="page"
          className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-blue-400 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:font-bold "
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <div>
      <ul className="flex">
        <li onClick={handleDecrease}>
          <span className="flex cursor-pointer items-center justify-center px-3 h-8 ml-0 border border-gray-300 rounded-l-lg hover:bg-gray-200 hover:font-bold">
            Previous
          </span>
        </li>
        {pageElements}
        <li onClick={handleIncrease}>
          <span className="flex cursor-pointer items-center justify-center px-3 h-8 ml-0 border border-gray-300 rounded-r-lg hover:bg-gray-200 hover:font-bold">
            Next
          </span>
        </li>
      </ul>
    </div>
  );
}
