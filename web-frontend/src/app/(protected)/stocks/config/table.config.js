import { ExternalLinkIcon } from "@/components/icons/Icons";

export const getStockTableColumns = ({ handleEdit }) => [
  { key: "sku", head: "SKU", sortable: true, body: (row) => row.sku },
  { key: "name", head: "NAME", sortable: true, body: (row) => row.name },
  { key: "description", head: "DESCRIPTION", sortable: true, body: (row) => row.description },
  { key: "unitOfMeasurement", head: "UNIT", sortable: true, body: (row) => row.unitOfMeasurement },
  {
    key: "quantity",
    head: "QTY",
    sortable: true,
    body: (row) => row.quantity,
    align: "justify-end",
  },
  {
    key: "action",
    head: "ACTION",
    body: (row) => (
      <div className="flex justify-center items-center">
        <button
          className={`flex items-center p-1 gap-2 rounded-sm hover:cursor-pointer`}
          key="edit"
          onClick={() => handleEdit(row)}
        >
          <i>
            <ExternalLinkIcon className="fill-current text-blue-500" />
          </i>
          <span className="text-sm text-blue-500">View</span>
        </button>
      </div>
    ),
    align: "justify-center",
  },
];
