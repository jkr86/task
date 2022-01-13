import React from "react";

export default function Pagination({ pages, renderPages, getPage }) {
  console.log("render pages",pages)
  return (
    <>
      <div className='flex items-center justify-center py-10 lg:px-6 px-4 w-full max-w-lg ml-auto'>
        <div className='bg-indigo-50 w-full md:px-4 px-3 py-4 flex items-center justify-between'>
          <div className='flex items-center'>
            {renderPages.map((page, idx) => {
              return (
                <div onClick={() => getPage(idx + 1)} className='border border-indigo-700 w-6 h-6 bg-indigo-700 rounded-full flex items-center justify-center mr-4 cursor-pointer hover:bg-indigo-700'>
                  <p className='text-sm font-medium text-white'>{idx + 1}</p>
                </div>
              );
            })}
          </div>
          <div>
            <p className='text-sm font-medium leading-none text-gray-600'>Total items: {pages.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}
