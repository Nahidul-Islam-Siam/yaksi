/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Table, Tag, Space, Pagination } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const HistoryTable: React.FC = () => {
  // Mock data for the table
  const data = [
    {
      key: '1',
      id: 'AS#H587',
      customer: 'HG836',
      totalPrice: '$123456',
      status: 'In Transit',
      orderDate: '2024-05-25',
      estDelivery: '2024-05-30',
    },
    {
      key: '2',
      id: 'AS#H587',
      customer: 'HG836',
      totalPrice: '$123456',
      status: 'Delivered',
      orderDate: '2024-05-25',
      estDelivery: '2024-05-30',
    },
    {
      key: '3',
      id: 'AS#H587',
      customer: 'HG836',
      totalPrice: '$123456',
      status: 'Cancelled',
      orderDate: '2024-05-25',
      estDelivery: '2024-05-30',
    },
    {
      key: '4',
      id: 'AS#H587',
      customer: 'HG836',
      totalPrice: '$123456',
      status: 'Pending',
      orderDate: '2024-05-25',
      estDelivery: '2024-05-30',
    },
    {
      key: '5',
      id: 'AS#H587',
      customer: 'HG836',
      totalPrice: '$123456',
      status: 'Delivered',
      orderDate: '2024-05-25',
      estDelivery: '2024-05-30',
    },
  ];

  // Columns configuration for the table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status:any) => {
        let color;
        if (status === 'In Transit') {
          color = 'orange';
        } else if (status === 'Delivered') {
          color = 'green';
        } else if (status === 'Cancelled') {
          color = 'red';
        } else if (status === 'Pending') {
          color = 'blue';
        }
        return (
          <Tag color={color} style={{ backgroundColor: color, color: 'white',borderRadius: '10px' }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Est. Delivery',
      dataIndex: 'estDelivery',
      key: 'estDelivery',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a>Details</a>
        </Space>
      ),
    },
  ];

  // Pagination configuration
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;
  const totalItems = data.length;

  // Paginate the data
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <h2>History</h2>
      <Table
        dataSource={paginatedData}
        columns={columns}
        bordered
        pagination={false} // Disable built-in pagination
        rowKey={(record) => record.key}
      />
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          total={totalItems}
          pageSize={pageSize}
          showSizeChanger={false}
          showQuickJumper={false}
          itemRender={(current, type, originalElement) => {
            if (type === 'prev') {
              return <ArrowLeftOutlined />;
            }
            if (type === 'next') {
              return <ArrowRightOutlined />;
            }
            return originalElement;
          }}
        />
      </div>
    </div>
  );
};

export default HistoryTable;