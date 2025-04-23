"use client";
import React, { useState } from "react";
import { CaretUp, CaretDown } from "../icons/Icons";
import { MoonLoader } from "react-spinners";

//columns = column configuration
//data = data to be rendered

const Table = ({ columns, data, sortSettings, onSort, loading }) => {
  const [hoveredCol, setHoveredCol] = useState(null);
  const tHeadStyle =
    "px-3 py-2 text-responsive-xs font-extralight sticky top-0 bg-white border border-dotted border-gray-300";

  const tBodyStyle = "p-2 border border-dotted border-gray-100 text-responsive-xs";
  const handleSort = (col) => {
    const order =
      sortSettings.by === col.key ? (sortSettings.order === "asc" ? "desc" : "asc") : "asc";
    onSort(col.key, order);
  };
  return (
    <div className="h-full w-full overflow-auto">
      <table
        className={`w-full border-separate border-spacing-0 scroll-smooth table-fixed ${
          loading ? "h-full" : data.length === 0 ? "h-full" : ""
        }`}
      >
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                onClick={() => handleSort(col)}
                onMouseEnter={() => setHoveredCol(col.key)}
                onMouseLeave={() => setHoveredCol(null)}
                key={index}
                className={`${tHeadStyle} ${
                  col.sortable ? "cursor-pointer" : "cursor-default"
                } hidden md:table-cell`}
              >
                <div className={`flex gap-2 items-center ${col.align}`}>
                  <span>{col.head}</span>
                  {sortSettings?.by === col.key ? (
                    <i>{sortSettings.order === "asc" ? <CaretUp /> : <CaretDown />}</i>
                  ) : (
                    hoveredCol === col.key &&
                    col.sortable && <CaretUp className="fill-current text-gray-400" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={columns.length + 1}>
                <div className="flex h-full w-full items-center justify-center">
                  <MoonLoader color="#29b8ea" size={60} />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`${tBodyStyle} block md:table-cell`}>
                    <div
                      className={`pr-2 overflow-hidden whitespace-nowrap flex items-center ${col.align} `}
                    >
                      {col.body(row)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
