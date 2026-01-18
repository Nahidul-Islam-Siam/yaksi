"use client";

import { Table, Input, Avatar, Pagination, Tag, Alert, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { useGetAllPaymentsQuery } from "@/redux/api/payment/paymentApi";

export default function PaymentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const {
    data: paymentResponse,
    isLoading,
    isError,
    error,
  } = useGetAllPaymentsQuery({
    page,
    limit,
    searchTerm: search || undefined,
  });

  const payments = paymentResponse?.Data || [];
  const total = paymentResponse?.meta?.total ?? payments.length ?? 0;

  const items = payments.map((p) => ({
    id: p._id,
    userName:
      p.userId?.name ||
      `${p.userId?.firstName || ""} ${p.userId?.lastName || ""}`,
    email: p.userId?.email || "N/A",
    phone: p.userId?.phone || "N/A",
    country: p.userId?.country || "N/A",
    ridesNumber: p.ridesNumber,
    price: p.price,
    status: p.status,
    stripeId: p.stripePaymentIntentId,
    startDate: p.startDate,
    profileImage: p.userId?.images?.[0],
    packType: p.adventurePackId?.title || p.rentPackId || "N/A",
  }));

  const columns: ColumnsType<(typeof items)[number]> = [
    {
      title: "User",
      dataIndex: "userName",
      render: (_, record) => (
        <Space>
          <Avatar src={record.profileImage}>
            {record.userName?.charAt(0).toUpperCase()}
          </Avatar>
          <span>{record.userName}</span>
        </Space>
      ),
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Country", dataIndex: "country" },
    { title: "Pack Type", dataIndex: "packType" },
    { title: "Rides Number", dataIndex: "ridesNumber" },
    { title: "Price", dataIndex: "price" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
  ];

  return (
    <div className="bg-white p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Payments</h1>

      {/* Search */}
      <Input
        placeholder="Search by user, email, or pack..."
        allowClear
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4 md:w-64"
      />

      {/* Error */}
      {isError && (
        <Alert
          type="error"
          message="Failed to load payments"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          description={(error as any)?.status || "Unknown error"}
          showIcon
          className="mb-4"
        />
      )}

      {/* Table */}
      <Table
        columns={columns}
        dataSource={items}
        rowKey="id"
        loading={isLoading}
        pagination={false}
        size="middle"
        className="[&_th]:!bg-[#00AEEF] [&_th]:!text-white"
        scroll={{ x: 1200 }}
      />

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} payments`
          }
        />
      </div>
    </div>
  );
}
