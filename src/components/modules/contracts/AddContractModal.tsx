import { DatePicker, Form, Input, message, Modal } from "antd";
import { useDispatch } from "react-redux";
import { addContract, type DraftContract } from "../../../redux/features/contractSlice";

type AddContractModalProps = {
   open: boolean;
   onClose: () => void;
};

const AddContractModal = ({ open, onClose }: AddContractModalProps) => {
   const [form] = Form.useForm();
   const dispatch = useDispatch();

   const handleSubmit = () => {
      form
         .validateFields()
         .then(values => {
            const contractData: DraftContract = {
               title: values.title,
               client: values.client,
               startDate: values.startDate.format("YYYY-MM-DD"),
               endDate: values.endDate.format("YYYY-MM-DD"),
            };

            dispatch(addContract(contractData));
            message.success("Contract added!");
            form.resetFields();
            onClose();
         })
         .catch(info => {
            console.log("Validation Failed:", info);
         });
   };

   return (
      <Modal
         title="Create New Contract"
         open={open}
         onOk={handleSubmit}
         onCancel={() => {
            form.resetFields();
            onClose();
         }}
         okText="Create"
         cancelText="Cancel"
      >
         <Form form={form} layout="vertical">
            <Form.Item
               name="title"
               label="Title"
               rules={[{ required: true, message: "Please input the contract title" }]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="client"
               label="Client"
               rules={[{ required: true, message: "Please input the client name" }]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="startDate"
               label="Start Date"
               rules={[{ required: true, message: "Please select the start date" }]}
            >
               <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
               name="endDate"
               label="End Date"
               rules={[{ required: true, message: "Please select the end date" }]}
            >
               <DatePicker className="w-full" />
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default AddContractModal;
