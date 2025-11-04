export type Column<T = Record<string, any>> = {
  label: string;
  key: string;
  render?: (value: any, row: T) => React.ReactNode;
};

type TableProps<T = Record<string, any>> = {
  columns: Column<T>[];
  data: T[];
};

const Table = <T extends Record<string, any>>({ columns, data }: TableProps<T>) => (
  <table className="min-w-full text-sm">
    <thead>
      <tr className="bg-gray-100 text-gray-800 text-left">
        {columns.map((col) => (
          <th key={col.key} className="px-5 py-3">{col.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className="border-b border-gray-200 last:border-none">
          {columns.map((col) => (
            <td key={col.key} className="px-5 py-2">
              {col.render ? col.render(row[col.key], row) : row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
