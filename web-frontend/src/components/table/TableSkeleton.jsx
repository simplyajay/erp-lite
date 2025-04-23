import React from "react";
import Skeleton from "react-loading-skeleton";

const heads = [100, 170, 150, 140];
const bodies = [
  [250, 210, 280, 230],
  [220, 140, 210, 290],
  [290, 224, 150, 230],
  [190, 184, 240, 130],
  [90, 124, 200, 130],
  [290, 194, 150, 230],
];

const getRandomDelay = () => {
  const delays = ["0s", "0.5s", "1s", "2s", "3s"];
  return delays[Math.floor(Math.random() * delays.length)];
};

const TableSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col  bg-white">
      <div className="flex h-[10%] items-center justify-end border-b border-gray-300 p-3 gap-4">
        <Skeleton circle width={30} height={30} style={{ animationDelay: getRandomDelay() }} />
        <Skeleton width={220} height={30} style={{ animationDelay: getRandomDelay() }} />
      </div>
      <div className="flex-1 w-full overflow-hidden">
        <table className="w-full table-fixed border-separate p-10">
          <thead>
            <tr className="bg-white">
              {heads.map((head, rowIndex) => (
                <th key={rowIndex} className="p-3 text-start hidden md:table-cell">
                  <Skeleton width={head} height={20} style={{ animationDelay: getRandomDelay() }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodies.map((body, rowIndex) => (
              <tr key={rowIndex}>
                {body.map((content, colIndex) => (
                  <td key={colIndex} className="p-3 text-start block md:table-cell">
                    <div className="pr-2 overflow-hidden whitespace-nowrap">
                      <Skeleton
                        width={content}
                        height={30}
                        style={{ animationDelay: getRandomDelay() }}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
