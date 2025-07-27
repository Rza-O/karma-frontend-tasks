import { DatePicker, Form, Input, Modal, Select, message } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { selectContractById, updateContract } from "../../../redux/features/contractSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

type ModalProps = {
   open: boolean;
   contractId: string;
   onClose: () => void;
};

const UpdateContractModal = ({ open, contractId, onClose }: ModalProps) => {
   const [form] = Form.useForm();
   const dispatch = useAppDispatch();
   const contract = useAppSelector(selectContractById(contractId));

   useEffect(() => {
      if (contract) {
         form.setFieldsValue({
            title: contract.title,
            client: contract.client,
            startDate: dayjs(contract.startDate),
            endDate: dayjs(contract.endDate),
            status: contract.status,
         });
      }
   }, [contract, form]);

   const handleUpdate = () => {
      form.validateFields().then(values => {
         dispatch(
            updateContract({
               id: contractId,
               title: values.title,
               client: values.client,
               startDate: values.startDate.format("YYYY-MM-DD"),
               endDate: values.endDate.format("YYYY-MM-DD"),
               status: values.status,
            })
         );
         message.success("Contract updated!");
         onClose();
      });
   };

   return (
      <Modal
         open={open}
         title="Edit Contract"
         onCancel={() => {
            form.resetFields();
            onClose();
         }}
         onOk={handleUpdate}
         okText="Update"
         cancelText="Cancel"
      >
         <Form layout="vertical" form={form}>
            <Form.Item
               name="title"
               label="Title"
               rules={[{ required: true, message: "Please enter title" }]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="client"
               label="Client"
               rules={[{ required: true, message: "Please enter client" }]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="startDate"
               label="Start Date"
               rules={[{ required: true, message: "Please select start date" }]}
            >
               <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
               name="endDate"
               label="End Date"
               rules={[{ required: true, message: "Please select end date" }]}
            >
               <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
               name="status"
               label="Status"
               rules={[{ required: true, message: "Please select status" }]}
            >
               <Select>
                  <Select.Option value="Active">Active</Select.Option>
                  <Select.Option value="Pending">Pending</Select.Option>
                  <Select.Option value="Closed">Closed</Select.Option>
               </Select>
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default UpdateContractModal;
