/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {  useState } from "react";
import {
  Table,
  Input,
  Dropdown,
  Button,
  Avatar,
  Pagination,
  Space,
  Tag,
  Alert,
} from "antd";
import { DownOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { TUser } from "@/type/type";
import { useRouter } from "next/navigation";
import { useGetAllUsersQuery } from "@/redux/api/user/userAPi";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const router = useRouter();
  const limit = 10;

  // Fetch users
  const {
    data: userDataResponse,
    isLoading,
    isError,
    error,
  } = useGetAllUsersQuery({
    page,
    limit,
    searchTerm: search || undefined,
  });

  // API response handling
  const userData = userDataResponse?.Data as TUser[] | undefined;
  const total = userDataResponse?.meta?.total ?? userData?.length ?? 0;

  // Normalize users for table
  const items = (userData || [])
    .filter((u) => (filter ? u.role === filter : true))
    .map((u) => ({
      id: u._id,
      name: u.name || "N/A",
      email: u.email || "N/A",
      phone: u.phone || "N/A",
      country: u.country || "N/A",
      avatar: u.images?.[0] || null,
      role: u.role,
    }));

  // Table columns
  const columns: ColumnsType<(typeof items)[number]> = [
    {
      title: "User Profile",
      dataIndex: "name",
      render: (_, record) => (
        <Space>
          <Avatar size={32} src={record.avatar}>
            {record.name.charAt(0).toUpperCase()}
          </Avatar>
          <span>{record.name}</span>
        </Space>
      ),
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Country", dataIndex: "country" },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => (
        <Tag color={role.includes("Admin") ? "red" : "geekblue"}>
          {role.includes("Admin") ? "Administrator" : "User"}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <EyeOutlined
          className="cursor-pointer"
          onClick={() => router.push(`/dashboard/users/${record.id}`)}
        />
      ),
    },
  ];

  // Dropdown menu items
  const filterMenuItems = [
    { key: "All", label: "All Users" },
    { key: "User", label: "Customers" },
    { key: "Admin", label: "Administrators" },
  ];

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-[#00AEEF] mb-6">All Users</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by name or email..."
          allowClear
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="md:w-64"
        />
        <Dropdown
          menu={{
            items: filterMenuItems,
            onClick: (e) => {
              setFilter(e.key === "All" ? null : e.key);
              setPage(1);
            },
            selectedKeys: [filter ?? "All"],
          }}
          trigger={["click"]}
        >
          <Button className="ml-auto md:ml-0">
            Filter Role <DownOutlined className="ml-1" />
          </Button>
        </Dropdown>
      </div>

      {/* Error */}
      {isError && (
        <Alert
          type="error"
          message="Failed to load users"
          description={(error as any)?.status || "Unknown error"}
          showIcon
          className="mb-4"
        />
      )}

      {/* Table */}
      <Table
        columns={columns}
        dataSource={items}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        size="middle"
        className="[&_th]:!bg-[#00AEEF] [&_th]:!text-white"
        scroll={{ x: 800 }}
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
            `${range[0]}-${range[1]} of ${total} users`
          }
        />
      </div>
    </div>
  );
}
