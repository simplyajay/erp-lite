import { ExternalLinkIcon } from "@/components/icons/Icons";

export const getSuppliersTableColumns = ({ handleEdit }) => [
  { key: "name", head: "COMPANY NAME", sortable: true, body: (row) => row.name },
  { key: "description", head: "DESCRIPTION", sortable: true, body: (row) => row.description },
  { key: "contact.phone", head: "PHONE", sortable: true, body: (row) => row.contact?.phone },
  { key: "contact.email", head: "EMAIL", sortable: true, body: (row) => row.contact?.email },
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
