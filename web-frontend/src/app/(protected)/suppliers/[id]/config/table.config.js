import { ExternalLinkIcon } from "@/components/icons/Icons";
import { formatDate } from "../util/table.util";
import { formatDocument } from "../util/table.util";
import { formatAmount } from "../util/table.util";

export const getSupplierDocumentsTableColumns = ({ handleEdit }) => [
  { key: "type", head: "TYPE", sortable: true, body: (row) => formatDocument(row.type) },
  { key: "_documentId", head: "DOCUMENT ID", sortable: true, body: (row) => row._documentId },
  { key: "date", head: "DATE", sortable: true, body: (row) => formatDate(row.date, "dmy") },
  { key: "dueDate", head: "DUE", sortable: true, body: (row) => formatDate(row.dueDate, "dmy") },
  { key: "memorandum", head: "MEMO", sortable: true, body: (row) => row.memorandum },
  {
    key: "costAfterVat",
    head: "AMOUNT",
    sortable: true,
    body: (row) => formatAmount(row.costAfterVat),
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
          <span className="text-sm text-blue-500">View/Edit</span>
        </button>
      </div>
    ),
    align: "justify-center",
  },
];
