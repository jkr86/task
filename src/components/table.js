import React, { useState, useEffect } from "react";
import { API_PATH } from "../constants.js";
import arraySort from "array-sort";
import Pagination from "./pagination.js";
import Form from "./form.js";

function Table() {
  const [rows, setRows] = useState([]);
  const [renderRows, setRenderRows] = useState([]);
  const [chunks, setChunks] = useState([]);
  const [address, setAddress] = useState({});
  const [isForm, setIsForm] = useState(false);

  useEffect(() => {
    getRows();
  }, []);

  const getRows = async () => {
    const tableRows = await fetch(`${API_PATH}/v1/address`).then((res) => res.json());
    makeChunks(tableRows);
  };

  const sortArray = (header) => {
    setRows(arraySort([...rows], header));
  };

  const makeChunks = (rows) => {
    var result = rows.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 5);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
    setRows(rows);
    setChunks(result);
    setRenderRows(result[0]);
  };

  const getPage = (currentPage) => {
    setRenderRows(chunks[currentPage - 1]);
  };

  return (
    <>
      <div className='w-full overflow-x-auto'>
        <div className='flex justify-end w-full mt-4 mb-6 pr-6'>
          <button
            onClick={() => {
              setAddress({});
              setIsForm(true);
            }}
            className='ml-auto bg-blue-500 hover:bg-blue-700 text-white rounded px-6 py-2'>
            Create Address
          </button>
        </div>

        <table className='w-full whitespace-nowrap border-gray-100 border rounded-lg'>
          <thead className='bg-gray-100'>
            <tr className>
              <th onClick={() => sortArray("name")} className='text-left cursor-pointer pl-4 py-5 pr-16'>
                <div className='flex items-center'>
                  <p className='text-sm font-medium pr-0.5 leading-none text-gray-900'>Name</p>
                  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-selector' width={16} height={16} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <polyline points='8 9 12 5 16 9' />
                    <polyline points='16 15 12 19 8 15' />
                  </svg>
                </div>
              </th>
              <th onClick={() => sortArray("address1")} className='text-left cursor-pointer py-5 pr-16'>
                <div className='flex items-center'>
                  <p className='text-sm font-medium pr-0.5 leading-none text-gray-900'>Address 1</p>
                  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-selector' width={16} height={16} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <polyline points='8 9 12 5 16 9' />
                    <polyline points='16 15 12 19 8 15' />
                  </svg>
                </div>
              </th>
              <th onClick={() => sortArray("address2")} className='text-left cursor-pointer py-5 pr-16'>
                <div className='flex items-center'>
                  <p className='text-sm font-medium pr-0.5 leading-none text-gray-900'>Address 2</p>
                  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-selector' width={16} height={16} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <polyline points='8 9 12 5 16 9' />
                    <polyline points='16 15 12 19 8 15' />
                  </svg>
                </div>
              </th>
              <th onClick={() => sortArray("city")} className='text-left cursor-pointer py-5 pr-16'>
                <div className='flex items-center'>
                  <p className='text-sm font-medium pr-0.5 leading-none text-gray-900'>City</p>
                  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-selector' width={16} height={16} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <polyline points='8 9 12 5 16 9' />
                    <polyline points='16 15 12 19 8 15' />
                  </svg>
                </div>
              </th>
              <th onClick={() => sortArray("state")} className='text-left cursor-pointer py-5 pr-16'>
                <div className='flex items-center'>
                  <p className='text-sm font-medium pr-0.5 leading-none text-gray-900'>State</p>
                  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-selector' width={16} height={16} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <polyline points='8 9 12 5 16 9' />
                    <polyline points='16 15 12 19 8 15' />
                  </svg>
                </div>
              </th>
              <th onClick={() => sortArray("zip")} className='text-left cursor-pointer py-5 pr-16'>
                <div className='flex items-center'>
                  <p className='text-sm font-medium pr-0.5 leading-none text-gray-900'>Zip</p>
                  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-selector' width={16} height={16} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <polyline points='8 9 12 5 16 9' />
                    <polyline points='16 15 12 19 8 15' />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {renderRows.map((row, idx) => {
              return (
                <tr
                  onClick={() => {
                    setIsForm(true);
                    setAddress(row);
                  }}
                  className={`cursor-pointer ${idx % 2 !== 0 ? "bg-gray-100" : undefined}`}>
                  <td className='text-left py-3 pr-20 pl-4'>
                    <p className='text-sm leading-none text-gray-900'>{row.name}</p>
                  </td>
                  <td className='text-left py-3 pr-12'>
                    <p className='text-sm leading-none text-gray-900'>{row.address1}</p>
                  </td>
                  <td className='border-l pl-5 pr-20 border-gray-200 text-left py-3'>
                    <p className='text-sm leading-none text-gray-900'>{row.address2}</p>
                  </td>
                  <td className='text-left py-3 pr-16'>
                    <p className='text-sm leading-none text-gray-900'>{row.city}</p>
                  </td>
                  <td className='text-left py-3 pr-16'>
                    <p className='text-sm leading-none text-gray-900'>{row.state}</p>
                  </td>
                  <td className='text-left py-3 pr-10'>
                    <p className='text-sm leading-none text-gray-900'>{row.zip}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination pages={rows} renderPages={chunks} getPage={getPage} />
      </div>
      {isForm && <Form refresh={getRows} isEditing={address.name} row={address} showForm={setIsForm} />}
    </>
  );
}

export default Table;
