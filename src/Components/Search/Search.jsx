import React, { useEffect, useState } from 'react';

const Search = ({setSearchTerm}) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(search);
    }, 600);
    return () => clearTimeout(timer); // Clean up timeout on unmount or new input
  }, [search]);

  return (
    <div className="flex items-center w-full px-4 py-2 border-2 rounded-lg">
      {/* Search Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M16.65 12A6.65 6.65 0 1112 5.35a6.65 6.65 0 014.65 6.65z"
        />
      </svg>
      {/* Input Field */}
      <input
        className="w-full pl-2 outline-none"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
