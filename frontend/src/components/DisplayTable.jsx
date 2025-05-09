import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border border-gray-300 bg-white shadow-lg rounded-md">
      <thead className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className="text-left">
            <th className="p-3 border border-gray-500">Sr.No</th>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="p-3 border border-gray-500">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            className="border-b border-gray-300 hover:bg-gray-200 transition duration-300"
          >
            <td className="p-3 text-center">{index + 1}</td>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="p-3 border border-gray-300">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayTable;
