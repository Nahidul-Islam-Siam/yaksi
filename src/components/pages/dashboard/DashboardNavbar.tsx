"use client";

import { Avatar, Dropdown, Button, message } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { MenuProps } from "antd";
import { toast } from "sonner";
import LogoutModal from "../../modals/LogoutModal";
import { logout, selectCurrentUser } from "@/redux/services/user/authSlice";
import { useGetUserByIdQuery } from "@/redux/api/auth/authApi";

interface DashboardNavbarProps {
  isMobile: boolean;
  onToggle: () => void;
}

export default function DashboardNavbar({
  isMobile,
  onToggle,
}: DashboardNavbarProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const user = useSelector(selectCurrentUser);

  const userId = user?._id as string;

  const { data } = useGetUserByIdQuery(userId);

  const profileImage = data?.Data?.images?.[0];

  // Memoize menu items to prevent recreation
  const userMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "logout",
        label: "Logout",
        danger: true,
      },
    ],
    []
  );

  const handleLogout = useCallback(async () => {
    try {
      // Clear Redux state
      dispatch(logout());

      // Clear access token cookie
      document.cookie =
        "access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict; Secure";

      // Show success message
      toast.success("Logged out successfully!");

      // Redirect to login page
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);

      // Even if there's an error, still clear Redux state
      dispatch(logout());

      // Clear cookie as fallback
      document.cookie =
        "access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict; Secure";

      // Show appropriate error message
      let errorMessage = "Logout completed with some issues.";

      if (error instanceof Error) {
        if (error.message.includes("network")) {
          errorMessage = "Logged out locally. Network issue occurred.";
        }
      }

      message.warning(errorMessage);

      // Still redirect to login
      router.push("/auth/login");
    } finally {
      setShowLogoutModal(false);
    }
  }, [dispatch, router]);

  // Handle dropdown menu clicks
  const handleMenuClick = useCallback(
    async (menuInfo: { key: string }) => {
      const { key } = menuInfo;

      if (key === "logout") {
        setShowLogoutModal(true);
      } else if (key === "profile") {
        router.push("/dashboard/profile");
      }
    },
    [router]
  );

  // Memoize dropdown menu configuration
  const dropdownMenu = useMemo(
    () => ({
      items: userMenuItems,
      onClick: handleMenuClick,
    }),
    [userMenuItems, handleMenuClick]
  );

  // Get display name with fallbacks
  const getDisplayName = () => {
    if (!user) return "Admin";

    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.name) {
      return user.name;
    }
    if (user.email) {
      return user.email.split("@")[0];
    }
    return user.role || "Admin";
  };

  const displayName = getDisplayName();

  return (
    <div className="bg-white shadow-md px-4 md:px-6 h-20 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onToggle}
            className="!w-10 !h-10 !flex !items-center !justify-center"
          />
        )}

        {/* Welcome Message with Real User Name */}
        <h1 className="text-lg md:text-xl text-black font-medium">
          <span>Welcome </span>
          <span className="hidden sm:inline">Back,</span>
          <span> {displayName}!</span>
        </h1>
      </div>

      {/* User Profile */}
      <Dropdown menu={dropdownMenu} trigger={["click"]} placement="bottomRight">
        <div className="flex items-center !space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
          <Avatar
            src={profileImage || ""}
            size={48}
            className="border border-gray-200"
            icon={<UserOutlined />}
          />
          <div className="hidden sm:block">
            <div className="text-gray-900 font-medium">{displayName}</div>
            <div className="text-xs text-gray-500">{user?.role}</div>
          </div>
        </div>
      </Dropdown>

      <LogoutModal
        open={showLogoutModal}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
