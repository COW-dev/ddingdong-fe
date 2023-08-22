import { useEffect, useRef, useState } from 'react';

export const dummy = [
  {
    category: '활동보고서',
    date: '2023-08-20',
    score: '20',
  },
  {
    category: '청소',
    date: '2023-08-20',
    score: '20',
  },
  {
    category: '전동대회',
    date: '2023-08-20',
    score: '20',
  },
  {
    category: '가산점',
    date: '2023-08-20',
    score: '20',
  },
  {
    category: '감점',
    date: '2023-08-20',
    score: '0',
  },
  {
    category: '감점',
    date: '2023-08-20',
    score: '0',
  },
];
export default function History() {
  return (
    <>
      <div className="m-auto mt-5 p-5">
        <div className=" mb-2 flex flex-row justify-between ">
          <span className="ml-2 text-lg font-semibold lg:text-xl">내역</span>
          <span className="text-2xl font-bold text-purple-500 lg:text-3xl">
            총점 : 100점{' '}
          </span>
        </div>
        <div
          className={`relative ${
            dummy.length > 3 ? ' h-64 overflow-y-scroll' : ''
          } shadow-md sm:rounded-lg`}
        >
          <table className="text-md w-full  text-left text-gray-500 md:text-lg">
            <thead className="text-md bg-gray-50 text-gray-700 md:text-lg">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  날짜
                </th>
                <th scope="col" className="px-6 py-3">
                  카테고리
                </th>
                <th scope="col" className="px-6 py-3">
                  점수
                </th>
              </tr>
            </thead>
            <tbody>
              {dummy.map((data, index) => (
                <tr key={index} className="border-b bg-white">
                  <td className="px-6 py-4">{data.date}</td>
                  <td className="px-6 py-4">{data.category}</td>
                  <td className="px-6 py-4">{data.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
