// components/AdministratorDetailsModal.tsx
'use client';

import { Modal, Avatar } from 'antd';
import { CloseOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { AdministrationMember } from '@/type/type';

interface AdministratorDetailsModalProps {
    open: boolean;
    onClose: () => void;
    administrator: AdministrationMember | null;
}

export default function AdministratorDetailsModal({
    open,
    onClose,
    administrator
}: AdministratorDetailsModalProps) {
    if (!administrator) return null;

    return (
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        closeIcon={
          <CloseOutlined className="text-gray-400 hover:text-gray-600" />
        }
        centered
        width={500}
        className="admin-details-modal"
      >
        <div className="p-6">
          {/* Header with Profile */}
          <div className="flex flex-col items-center text-center mb-8">
            <Avatar
              size={80}
              src={administrator?.images?.[0]}
              className="mb-4 border-4 border-gray-100"
            />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {administrator?.name}
            </h2>
          </div>

          {/* Introduction Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Introduction
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {administrator?.introduction ||
                "-no introduction"}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            {/* Contact/Phone */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 min-w-[80px]">
                <PhoneOutlined className="text-gray-500" />
                <span className="text-sm font-medium text-gray-900">
                  Contact
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {administrator?.phone || "+84 037 3457050"}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 min-w-[80px]">
                <MailOutlined className="text-gray-500" />
                <span className="text-sm font-medium text-gray-900">Email</span>
              </div>
              <span className="text-sm text-gray-600">
                {administrator?.email}
              </span>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 min-w-[80px]">
                <EnvironmentOutlined className="text-gray-500" />
                <span className="text-sm font-medium text-gray-900">
                  Address
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {administrator?.country}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    );
}