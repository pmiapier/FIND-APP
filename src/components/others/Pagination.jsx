import React from "react";

export default function Pagination({ page, setPage, allPage }) {
    const handleDecrease = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleIncrease = () => {
        if (page < allPage) setPage(page + 1);
    };

    let pageElements = []

    for (let i =1;i<=allPage;i++){
        pageElements.push(<li onClick={()=>setPage(i)} key={i}>
            <a aria-current="page" className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">
                {i}
            </a>
        </li>)
    }

    return (
        <div>
            <ul className="flex">
                <li onClick={handleDecrease}>
                    <span className="flex cursor-pointer items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</span>
                </li>
                {pageElements}
                <li onClick={handleIncrease}>
                    <span className="flex cursor-pointer items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
                </li>
            </ul>
        </div>
    );
}
