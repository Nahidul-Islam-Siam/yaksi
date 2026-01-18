"use client";

import { Table, Input, Button, Avatar, Pagination, Tag, Alert } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import {
  useDeleteBookingsMutation,
  useGetAllBookingsQuery,
} from "@/redux/api/bookings/bookings";
import { TBooking } from "@/type/type";
import { Space } from "antd";
import { toast } from "sonner";

export default function BookingsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<string | undefined>(undefined);
  const limit = 10;

  const {
    data: bookingResponse,
    isLoading,
    isError,
    error,
  } = useGetAllBookingsQuery({
    page,
    limit,
    sort,
    searchTerm: search || undefined,
  });

  // API response handling
  const bookings: TBooking[] = bookingResponse?.Data || [];
  const total = bookingResponse?.meta?.total ?? bookings.length ?? 0;

  // Normalize bookings for table
  const items = bookings.map((b) => ({
    id: b._id,
    jetSkiName: b.jetSkyId?.name || "N/A",
    UserName: b.userId?.name || "N/A",
    purchesCredits: b.userId?.purchesCredits || "N/A",
    remainingCredits: b.userId?.remainingCredits || "N/A",
    model: b.model || "N/A",
    bookingDate: b.bookingDate,
    drivingLicense: b.drivingLicense || "N/A",
    status: b.status,
    paymentStatus: b.paymentStatus,
    price: b.price,
    totalPrice: b.totalPrice,
    profileImage: b.userId?.images?.[0],
    image: Array.isArray(b.jetSkyId?.images)
      ? b.jetSkyId.images[0]
      : b.jetSkyId?.images || null,
    bookingType: b.adventurePurchaseId?._id
      ? "Adventure Pack"
      : b?.subscriptionPurchaseId
      ? "Subscription"
      : "Rental", // <-- add bookingType here
  }));

  const [deleteBooking] = useDeleteBookingsMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id).unwrap(); // call the API
      toast.success("Booking deleted successfully ");
      // No need to manually remove from table; RTK Query invalidates the tag and refetches automatically
    } catch (err) {
      toast.error("Failed to delete booking");
      console.log(err);
    }
  };
  // Table columns
  const columns: ColumnsType<(typeof items)[number]> = [
    {
      title: "User Name",
      dataIndex: "jetSkiName",
      render: (_, record) => (
        <Space>
          <Avatar size={32} src={record.profileImage}>
            {record.UserName.charAt(0).toUpperCase()}
          </Avatar>
          <span>{record.UserName}</span>
        </Space>
      ),
    },
    {
      title: "Jet Ski",
      dataIndex: "jetSkiName",
      render: (_, record) => (
        <Space>
          <span>{record.jetSkiName}</span>
        </Space>
      ),
    },
    { title: "Model", dataIndex: "model" },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      sorter: true, // enable AntD frontend sort triggers
      sortOrder:
        sort === "bookingDate"
          ? "ascend"
          : sort === "-bookingDate"
          ? "descend"
          : undefined,
      render: (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      title: "Booking Type",
      dataIndex: "bookingType",
      render: (type: string) => {
        let color = "default"; // default color

        if (type === "Adventure Pack") color = "green";
        else if (type === "Subscription") color = "blue";
        else if (type === "Rental") color = "orange";

        return <Tag color={color}>{type}</Tag>;
      },
    },
    { title: "Driving License", dataIndex: "drivingLicense" },

    {
      title: "Payment",
      dataIndex: "paymentStatus",
      render: (paymentStatus) => (
        <Tag color={paymentStatus === "paid" ? "blue" : "red"}>
          {paymentStatus.toUpperCase()}
        </Tag>
      ),
    },
    { title: "Purches Credits", dataIndex: "purchesCredits" },
    { title: "Remaining Credits", dataIndex: "remainingCredits" },
    {
      title: "Delete",
      render: (_, record) => (
        <Button onClick={() => handleDelete(record.id)} danger>
          <DeleteOutlined className="" />
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white">
      <div className="pt-6 md:pt-2">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-10">
            Bookings
          </h1>
        </div>
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by Jet Ski model..."
            allowClear
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="md:w-64"
          />
        </div>

        {/* Error */}
        {isError && (
          <Alert
            type="error"
            message="Failed to load bookings"
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
          loading={isLoading}
          pagination={false}
          rowKey="id"
          size="middle"
          className="[&_th]:!bg-[#00AEEF] [&_th]:!text-white"
          scroll={{ x: 1000 }}
          onChange={(_, __, sorter) => {
            if (Array.isArray(sorter)) return;
            if (sorter.order === "ascend") setSort("bookingDate");
            else if (sorter.order === "descend") setSort("-bookingDate");
            else setSort(undefined);
            setPage(1); // reset page when sorting changes
          }}
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
              `${range[0]}-${range[1]} of ${total} bookings`
            }
          />
        </div>
      </div>
    </div>
  );
}
