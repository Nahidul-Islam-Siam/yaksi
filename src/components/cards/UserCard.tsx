"use client";

import { useState } from "react";
import { Avatar, Button } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  EditOutlined,
} from "@ant-design/icons";
import EditUserModal from "@/components/modals/EditUserModal";

export interface UserCardProps {
  userId: string | null;

  firstName?: string;
  lastName?: string;
  name?: string; // optional; can derive from first + last
  image?: string; // optional
  avatar?: string; // optional
  phone?: string;
  email?: string;
  country?: string;
  editable?: boolean;
}

export default function UserCard({
  userId,
  firstName,
  lastName,
  name,
  avatar = "/images/user-avatar.jpg",
  phone = "N/A",
  email = "N/A",
  country = "N/A",
  editable = false,
}: UserCardProps) {
  const [open, setOpen] = useState(false);

  // Full name fallback if 'name' prop is not provided
  const fullName = name || `${firstName} ${lastName}`;

  // Prepare initial values for edit modal
  const initialValues = {
    firstName,
    lastName,
    phone,
    email,
    country,
    avatar: avatar !== "/images/user-avatar.jpg" ? avatar : "",
  };

  return (
    <>
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white rounded-xl shadow">
        {/* Left block: Avatar + Name */}
        <div className="flex items-center gap-6">
          <Avatar
            size={96}
            src={avatar}
            onError={() => true} // returning true tells AntD to show children
          >
            {fullName?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold mb-2">{fullName}</h2>
          </div>
        </div>

        {/* Right block: Contact info */}
        <div className="grid gap-3 mt-6 md:mt-0">
          <p className="flex items-center gap-2">
            <PhoneOutlined /> <strong>Contact:</strong> {phone}
          </p>
          <p className="flex items-center gap-2">
            <MailOutlined /> <strong>Email:</strong> {email}
          </p>
          <p className="flex items-center gap-2">
            <GlobalOutlined /> <strong>Country:</strong> {country}
          </p>
        </div>

        {/* Edit button */}
        {editable && (
          <Button
            icon={<EditOutlined />}
            shape="circle"
            type="text"
            className="!absolute top-2 right-2"
            onClick={() => setOpen(true)}
          />
        )}
      </div>

      {/* Edit modal */}
      {editable && (
        <EditUserModal
          userId={userId}
          open={open}
          initialValues={initialValues}
          onCancel={() => setOpen(false)}
          onSave={(vals) => {
            console.log("Saved values:", vals);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
