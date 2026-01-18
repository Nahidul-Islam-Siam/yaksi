/* eslint-disable @typescript-eslint/no-unused-vars */
 
'use client';
import React from 'react';
import { Table, Tag, Space, Pagination } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const PaymentTable: React.FC = () => {
  // Mock data for the table
  const data = [
    {
      key: '1',
      date: '01/01/2025',
      orderId: '#1234',
      userName: 'Marco',
      totalPrice: '$1,350',
      firstPayment: '$1,350',
      totalPayment: '$1,280',
      status: 'Completed',
    },
    {
      key: '2',
      date: '01/01/2025',
      orderId: '#1234',
      userName: 'Marco',
      totalPrice: '$1,350',
      firstPayment: '$1,350',
      totalPayment: '$1,280',
      status: 'Cancel',
    },
    {
      key: '3',
      date: '01/01/2025',
      orderId: '#1234',
      userName: 'Marco',
      totalPrice: '$1,350',
      firstPayment: '$1,350',
      totalPayment: '$1,280',
      status: 'Completed',
    },
    {
      key: '4',
      date: '01/01/2025',
      orderId: '#1234',
      userName: 'Marco',
      totalPrice: '$1,350',
      firstPayment: '$1,350',
      totalPayment: '$1,280',
      status: 'Pending',
    },
    {
      key: '5',
      date: '01/01/2025',
      orderId: '#1234',
      userName: 'Marco',
      totalPrice: '$1,350',
      firstPayment: '$1,350',
      totalPayment: '$1,280',
      status: 'Delivered',
    },
  ];

  // Columns configuration for the table
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'First Payment',
      dataIndex: 'firstPayment',
      key: 'firstPayment',
    },
    {
      title: 'Total Payment',
      dataIndex: 'totalPayment',
      key: 'totalPayment',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color;
        if (status === 'Completed') {
          color = 'green';
        } else if (status === 'Cancel') {
          color = 'red';
        } else if (status === 'Pending') {
          color = 'blue';
        } else if (status === 'Delivered') {
          color = 'cyan';
        }
        return (
          <Tag color={color} style={{ backgroundColor: color, color: 'white',borderRadius: '10px' }}>
            {status}
          </Tag>
        );
      },
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
      <h2>Payment</h2>
      <Table
        dataSource={paginatedData}
        columns={columns}
        bordered
        pagination={false} // Disable built-in pagination
        rowKey={(record) => record.key}
        size="middle"
        scroll={{ x: true }} // Enable horizontal scrolling if needed
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

export default PaymentTable;