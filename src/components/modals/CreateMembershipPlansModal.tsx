"use client";

import { Modal, Form, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useCreateMemberShipMutation } from "@/redux/api/memberShip/memberShipApi";

interface CreateMembershipPlansModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  price: string;
  signUpFee: string;
  durationInMonths: string;
  ridesPerMonth: string;
  refundableDeposit: string;
  planId: string;
  description: string;
}

export default function CreateMembershipPlansModal({
  open,
  onClose,
  onSuccess,
}: CreateMembershipPlansModalProps) {
  const [form] = Form.useForm();
  const [createMembershipPlan, { isLoading }] = useCreateMemberShipMutation();

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await createMembershipPlan({
        price: parseFloat(values.price),
        signUpFee: parseFloat(values.signUpFee),
        durationInMonths: parseInt(values.durationInMonths),
        ridesPerMonth: parseInt(values.ridesPerMonth),
        refundableDeposit: parseFloat(values.refundableDeposit),
        planId: values.planId,
        description: values.description,
      }).unwrap();

      if (response.success) {
        toast.success("Membership plan created successfully!");
        form.resetFields();
        onSuccess();
        onClose();
      } else {
        toast.error(response?.message || "Failed to create membership plan");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create membership plan");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      closeIcon={
        <CloseOutlined className="text-gray-400 hover:text-gray-600" />
      }
      centered
      width={500}
      title={
        <h2 className="text-2xl font-semibold text-gray-900 text-center pb-5">
          Add Membership Plan
        </h2>
      }
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        className="max-w-xl mx-auto p-8 bg-white rounded-2xl  space-y-4"
      >
        <div className="flex justify-between gap-4">
          <Form.Item
            label="Price per Week*"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
            className="!mb-4 w-full"
          >
            <Input
              placeholder="Enter price"
              disabled={isLoading}
              className="h-12 rounded-xl border-gray-300 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </Form.Item>

          <Form.Item
            label="SignUp Fee*"
            name="signUpFee"
            rules={[{ required: true, message: "Please enter sign up fee" }]}
            className="!mb-4 w-full"
          >
            <Input
              placeholder="Enter sign up fee"
              disabled={isLoading}
              className="h-12 rounded-xl border-gray-300 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </Form.Item>
        </div>

        <div className="flex justify-between gap-2">
          <Form.Item
            label="Duration (Months)*"
            name="durationInMonths"
            rules={[{ required: true }]}
            className="!mb-4 w-full"
          >
            <Input
              placeholder="e.g., 12"
              disabled={isLoading}
              className="h-12 rounded-xl border-gray-300 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </Form.Item>

          <Form.Item
            label="Rides Per Month*"
            name="ridesPerMonth"
            rules={[{ required: true }]}
            className="!mb-4 w-full"
          >
            <Input
              placeholder="e.g., 5"
              disabled={isLoading}
              className="h-12 rounded-xl border-gray-300 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </Form.Item>

          <Form.Item
            label="Refundable Deposit*"
            name="refundableDeposit"
            rules={[{ required: true }]}
            className="!mb-4 w-full"
          >
            <Input
              placeholder="Enter refundable deposit"
              disabled={isLoading}
              className="h-12 rounded-xl border-gray-300 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Plan ID*"
          name="planId"
          rules={[{ required: true }]}
          className="!mb-4"
        >
          <Input
            placeholder="Enter plan ID"
            disabled={isLoading}
            className="h-12 rounded-xl border-gray-300 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </Form.Item>

        <Form.Item label="Description" name="description" className="!mb-4">
          <Input.TextArea
            placeholder="Enter description"
            disabled={isLoading}
            rows={4}
            className="rounded-xl border-gray-300 shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </Form.Item>

        <div className="flex justify-center space-x-4 mt-6">
          <Button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-8 py-2 font-medium rounded-xl border border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100 transition-all"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            className="px-8 py-2 font-medium rounded-xl !border-none hover:!bg-cyan-600 transition-all shadow-md"
            style={{ backgroundColor: "#0EA5E9" }}
          >
            {isLoading ? "Adding..." : "Add Plan"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
