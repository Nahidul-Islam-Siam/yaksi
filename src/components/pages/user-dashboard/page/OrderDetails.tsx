"use client";

import { Card, Tag, Button, Row, Col, Typography } from "antd";

const { Title, Text } = Typography;

export default function OrderDetails() {
  const handleTrackOrder = () => {
    console.log("Tracking order...");
    alert("Redirecting to order tracking...");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title level={3} style={{ background: "#fff", padding: "12px 24px", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            Order Details
          </Title>
        </div>

        {/* Customer Info Section */}
        <Card
          title={
            <Row justify="space-between" align="middle">
              <Text strong>Customer Info</Text>
              <Tag color="gold">PENDING</Tag>
            </Row>
          }
          style={{ marginBottom: 24 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Text type="secondary">Full Name</Text>
              <br />
              <Text strong>Softur Rahman</Text>
            </Col>
            <Col xs={24} md={12}>
              <Text type="secondary">Phone Number</Text>
              <br />
              <Text strong>+8801xxxxxxxxx</Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} md={12}>
              <Text type="secondary">Email</Text>
              <br />
              <Text strong>sjahidul@gmail.com</Text>
            </Col>
            <Col xs={24} md={12}>
              <Text type="secondary">Order Date</Text>
              <br />
              <Text strong>July 20, 2019</Text>
            </Col>
          </Row>

          <div style={{ marginTop: 16 }}>
            <Text type="secondary">Order ID</Text>
            <br />
            <Text strong>ID (Aug - CHT1 - 1063)</Text>
          </div>
        </Card>

        {/* Vehicle Info Section */}
        <Card title="Vehicle Info" style={{ marginBottom: 32 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Text type="secondary">Model</Text>
              <br />
              <Text strong>TESLA MODEL S FRONT-2017</Text>
            </Col>
            <Col xs={24} md={12}>
              <Text type="secondary">Lot</Text>
              <br />
              <Text strong>146 PARTIAL HYBRID, etc.</Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} md={12}>
              <Text type="secondary">Color</Text>
              <br />
              <Text strong>Red</Text>
            </Col>
            <Col xs={24} md={12}>
              <Text type="secondary">Registration</Text>
              <br />
              <Text strong>August 2023</Text>
            </Col>
          </Row>

          <div style={{ marginTop: 16 }}>
            <Text type="secondary">VIN</Text>
            <br />
            <Text strong>(Vin - VF2 - 3133)</Text>
          </div>
        </Card>

        {/* Track Order Button */}
        <div style={{ textAlign: "center" }}>
          <Button type="primary" size="large" onClick={handleTrackOrder}>
            Track your Order
          </Button>
        </div>
      </div>
    </div>
  );
}
