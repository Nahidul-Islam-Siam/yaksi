"use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Avatar,
  Typography,
  Spin,
  Alert,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/hooks/hooks";
import {
  useGetUserByIdQuery,
  useChangePasswordMutation,
} from "@/redux/api/auth/authApi";
import AdministratorSection from "@/components/pages/dashboard/AdministratorSection";
import EditProfileModal from "@/components/modals/EditProfileModal";

const { Title, Text } = Typography;

// JWT Payload interface
interface JWTPayload {
  id: string;
  userEmail: string;
  role: "User" | "Administrator" | "Admin";
  iat: number;
  exp: number;
}

export default function ProfilePage() {
  const [passwordForm] = Form.useForm();
  const [editDetailsModalOpen, setEditDetailsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Get token from Redux state or fallback to cookies
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // Fetch admin data by ID - only run when userId is available
  const {
    data: adminData,
    error: adminError,
    isLoading: adminLoading,
    refetch: refetchAdmin,
  } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  // Change password mutation hook
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  // Extract user ID from JWT token
  useEffect(() => {
    const getUserIdFromToken = () => {
      try {
        // Try to get token from Redux first, then fallback to cookies
        let token = accessToken;

        if (!token) {
          token = Cookies.get("access-token") || null;
        }

        if (token) {
          // Decode the JWT token
          const decoded = jwtDecode<JWTPayload>(token);
          console.log("Decoded token:", decoded);

          // Extract user ID from the decoded token
          setUserId(decoded.id);
        } else {
          console.warn("No access token found");
          toast.error("Please login to view your profile");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token. Please login again.");
      }
    };

    getUserIdFromToken();
  }, [accessToken]);

  interface PasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  // Updated handlePasswordFormSubmit with API integration
  const handlePasswordFormSubmit = async (values: PasswordFormValues) => {
    if (!userId) {
      toast.error("User ID not found. Please login again.");
      return;
    }

    try {
      const response = await changePassword({
        userId,
        passwordData: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
      }).unwrap();

      if (response.success) {
        toast.success("Password updated successfully!");
        passwordForm.resetFields();
      } else {
        toast.error(response.message || "Failed to update password");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Change password error:", error);

      // Handle different error scenarios
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else if (error?.status === 400) {
        toast.error("Invalid current password or new password format");
      } else if (error?.status === 401) {
        toast.error("Current password is incorrect");
      } else if (error?.status === 404) {
        toast.error("User not found");
      } else if (error?.status === 500) {
        toast.error("Server error. Please try again later");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    }
  };

  const handleEditDetails = () => {
    setEditDetailsModalOpen(true);
  };

  const handleEditSuccess = () => {
    // Refresh admin data
    refetchAdmin();
    toast.success("Admin profile updated successfully!");
  };

  // Loading state while fetching admin data
  if (adminLoading) {
    return (
      <div className="!space-y-6">
        <Card className="shadow-sm">
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
            <span className="ml-3 text-gray-600">Loading admin profile...</span>
          </div>
        </Card>
      </div>
    );
  }

  // Error state when admin fetch fails
  if (adminError) {
    return (
      <div className="!space-y-6">
        <Card className="shadow-sm">
          <Alert
            message="Error Loading Admin Profile"
            description="Unable to load admin profile data. Please try again."
            type="error"
            showIcon
            action={
              <Button size="small" onClick={() => refetchAdmin()}>
                Retry
              </Button>
            }
          />
        </Card>
      </div>
    );
  }

  // Extract admin data from API response
  const currentAdmin = adminData?.Data;

  // If no admin data, show fallback
  if (!currentAdmin) {
    return (
      <div className="!space-y-6">
        <Card className="shadow-sm">
          <Alert
            message="No Admin Data Found"
            description="Unable to find admin profile data."
            type="warning"
            showIcon
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="!space-y-6">
      {/* Admin Details Card */}
      <Card className="shadow-sm !relative">
        {/* Edit Icon */}
        <Button
          icon={<EditOutlined />}
          onClick={handleEditDetails}
          className="!absolute !top-4 !right-4 !z-10 !border-none !bg-transparent hover:!bg-gray-100 !text-gray-600 !rounded-full !w-8 !h-8 !flex !items-center !justify-center !p-0"
          size="small"
        />

        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Left Section - Profile Info */}
          <div className="flex items-center gap-4 flex-1">
            <Avatar
              size={120}
              src={currentAdmin?.images?.[0] || "/images/admin-avatar.jpg"}
              icon={<UserOutlined />}
              className="flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <Title level={4} className="!mb-2 !text-gray-900">
                {currentAdmin?.name ||
                  `${currentAdmin?.firstName || ""} ${
                    currentAdmin?.lastName || ""
                  }`.trim() ||
                  "Admin User"}
              </Title>

              {/* Role */}
              <div className="mb-4">
                <Text className="text-sm font-medium text-gray-700 block mb-2">
                  Introduction
                </Text>
                <Text className="text-sm text-gray-600 leading-relaxed">
                  {currentAdmin?.introduction ||
                    "Hello there! I am admin of this platform!"}
                </Text>
              </div>

              {/* Introduction or additional info */}
              {currentAdmin?.address && (
                <div className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 block mb-2">
                    Additional Info
                  </Text>
                  <Text className="text-sm text-gray-600 leading-relaxed">
                    Address: {currentAdmin?.address}
                  </Text>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Contact Info */}
          <div className="lg:w-80 space-y-3">
            {/* Contact/Phone */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 min-w-[70px]">
                <PhoneOutlined className="text-gray-500 text-sm" />
                <Text className="text-sm font-medium text-gray-900">
                  Contact
                </Text>
              </div>
              <Text className="text-sm text-gray-600">
                {currentAdmin?.phone || "N/A"}
              </Text>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 min-w-[70px]">
                <MailOutlined className="text-gray-500 text-sm" />
                <Text className="text-sm font-medium text-gray-900">Email</Text>
              </div>
              <Text className="text-sm text-gray-600">
                {currentAdmin?.email || "N/A"}
              </Text>
            </div>

            {/* Country */}
            {currentAdmin?.country && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 min-w-[70px]">
                  <EnvironmentOutlined className="text-gray-500 text-sm" />
                  <Text className="text-sm font-medium text-gray-900">
                    Country
                  </Text>
                </div>
                <Text className="text-sm text-gray-600">
                  {currentAdmin?.country}
                </Text>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Change Password Form */}
      <Card className="shadow-sm">
        <Title level={5} className="!text-gray-700 !mb-6 !text-xl">
          Change Password
        </Title>

        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordFormSubmit}
          requiredMark={false}
        >
          <Form.Item
            label={
              <span className="text-gray-700 font-medium">
                Current Password
              </span>
            }
            name="currentPassword"
            rules={[
              { required: true, message: "Please enter your current password" },
            ]}
          >
            <Input.Password
              placeholder="Enter Current Password"
              className="!py-3 !px-4 !border-gray-300 !rounded-lg"
              disabled={isChangingPassword}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 font-medium">New Password</span>
            }
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password" },
              { min: 8, message: "Password must be at least 8 characters" },
              {
                pattern:
                  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/,
                message:
                  "Password must contain uppercase, number, and special character",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter New Password"
              className="!py-3 !px-4 !border-gray-300 !rounded-lg"
              disabled={isChangingPassword}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 font-medium">
                Confirm New Password
              </span>
            }
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm New Password"
              className="!py-3 !px-4 !border-gray-300 !rounded-lg"
              disabled={isChangingPassword}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isChangingPassword}
              disabled={isChangingPassword}
              className="!bg-[#0EA5E9] !border-none hover:!bg-[#0EA5E9]/80 !h-12 !px-8 !rounded-lg !font-medium"
            >
              {isChangingPassword ? "Updating Password..." : "Update Password"}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Administrator Section */}
      <AdministratorSection />

      {/* Edit Admin Profile Modal */}
      <EditProfileModal
        open={editDetailsModalOpen}
        onClose={() => setEditDetailsModalOpen(false)}
        onSuccess={handleEditSuccess}
        adminData={{
          id: currentAdmin?._id,
          name: currentAdmin?.name || "",
          firstName: currentAdmin?.firstName || "",
          lastName: currentAdmin?.lastName || "",
          email: currentAdmin?.email || "",
          phone: currentAdmin?.phone || "",
          avatar: currentAdmin?.images?.[0] || "",
          country: currentAdmin?.country || "",
          introduction: currentAdmin?.introduction || "",
        }}
      />
    </div>
  );
}
