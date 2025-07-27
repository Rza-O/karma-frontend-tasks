import { Table, Button, Popconfirm, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateContractModal from "./UpdateContractModal";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteContract, selectContracts } from "../../../redux/features/contractSlice";
import type { IContract } from "../../../types";

const ContractTable = () => {
   const contracts = useAppSelector(selectContracts);
   const dispatch = useAppDispatch();

   const [editingId, setEditingId] = useState<string | null>(null);

   const handleDelete = (id: string) => {
      dispatch(deleteContract(id));
   };

   const columns: ColumnsType<IContract> = [
      {
         title: "Title",
         dataIndex: "title",
         key: "title",
      },
      {
         title: "Client",
         dataIndex: "client",
         key: "client",
      },
      {
         title: "Start Date",
         dataIndex: "startDate",
         key: "startDate",
      },
      {
         title: "End Date",
         dataIndex: "endDate",
         key: "endDate",
      },
      {
         title: "Status",
         dataIndex: "status",
         key: "status",
         render: (status: IContract["status"]) => {
            const color =
               status === "Active"
                  ? "green"
                  : status === "Pending"
                     ? "orange"
                     : "gray";
            return <Tag color={color}>{status}</Tag>;
         },
      },
      {
         title: "Actions",
         key: "actions",
         render: (_, record) => (
            <div className="flex gap-2">
               <Button icon={<EditOutlined />} onClick={() => setEditingId(record.id)}>
                  Edit
               </Button>
               <Popconfirm
                  title="Are you sure you want to delete this contract?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
               >
                  <Button danger icon={<DeleteOutlined />}>
                     Delete
                  </Button>
               </Popconfirm>
            </div>
         ),
      },
   ];

   return (
      <div className="p-5">
         <Table
            dataSource={contracts}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 6 }}
         />

         {editingId && (
            <UpdateContractModal
               open={true}
               contractId={editingId}
               onClose={() => setEditingId(null)}
            />
         )}
      </div>
   );
};

export default ContractTable;
