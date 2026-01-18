/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal, Form, Input, Button, Row, Col } from "antd";

interface ProfileModalProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  visible,
  onCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Profile"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Please enter your first name" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Please enter your last name" }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone number"
            >
              <Input placeholder="+084384" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
            >
              <Input placeholder="Enter your street address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="streetProvinceRegion"
              label="Street/Province/Region"
            >
              <Input placeholder="Enter your Street/Province/Region" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
            >
              <Input placeholder="Enter your city address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="country"
              label="Country"
            >
              <Input placeholder="Namibia" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="zipCode"
              label="Zip Code"
            >
              <Input placeholder="6600" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update profile
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileModal;