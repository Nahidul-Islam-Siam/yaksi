"use client"

import React, { useState } from "react"
import { Form, Input, Button, Card, Typography, message } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"

const { Title } = Typography

export default function PasswordForm() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = (values: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("New passwords don't match!")
      return
    }

    if (values.newPassword.length < 8) {
      message.error("Password must be at least 8 characters long!")
      return
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      message.success("Password updated successfully!")
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f9fafb" }}>
      <Card style={{ width: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Title level={4} style={{ textAlign: "center", marginBottom: 24 }}>
          Update Password
        </Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: "Please enter your current password!" }]}
          >
            <Input.Password
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Please enter your new password!" }]}
          >
            <Input.Password
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your new password!" }]}
          >
            <Input.Password
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
