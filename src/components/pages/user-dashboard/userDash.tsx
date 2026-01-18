"use client";

import {
  User,
  History,
  CreditCard,
  Settings,
  LogOut,
  Edit,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import userIcon from "@/assets/user/user-icons.jpg";

type SidebarButtonProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
};

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  active,
  collapsed,
}) => (
  <div
    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
      active
        ? "bg-indigo-100 text-indigo-700 font-semibold"
        : "hover:bg-gray-100 text-gray-700"
    }`}
  >
    <span className="mr-3">{icon}</span>
    {!collapsed && <span>{label}</span>}
  </div>
);

interface DashboardSidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  onCollapse: () => void;
}

const UserDashboardSidebar: React.FC<DashboardSidebarProps> = ({
  collapsed,
  isMobile,
  onCollapse,
}) => {
  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-80"
      } bg-white min-h-screen border-r flex flex-col items-center transition-all duration-300`}
    >
      {/* User Profile */}
      {!collapsed && (
        <div className="p-6 w-full text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Image
              src={userIcon}
              alt="Monica Lucas"
              fill
              className="rounded-full object-cover border"
            />
            <div className="absolute cursor-pointer bottom-0 right-0 bg-indigo-600 p-1 rounded-full">
              <Edit className="text-white w-4 h-4" />
            </div>
          </div>
          <h3 className="text-lg font-semibold">Monica Lucas</h3>
          <p className="text-gray-600 text-sm">monica@rentaly.com</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-2 w-full px-4">
        <Link href="/user-dashboard">
          <SidebarButton icon={<User />} label="Profile" active collapsed={collapsed} />
        </Link>
        <Link href="/user-dashboard/history">
          <SidebarButton icon={<History />} label="History" collapsed={collapsed} />
        </Link>
        <Link href="/user-dashboard/payment-history">
          <SidebarButton icon={<CreditCard />} label="Payment History" collapsed={collapsed} />
        </Link>
        <Link href="/user-dashboard/settings">
          <SidebarButton icon={<Settings />} label="Settings" collapsed={collapsed} />
        </Link>
        <Link href="/logout">
          <SidebarButton icon={<LogOut />} label="Logout" collapsed={collapsed} />
        </Link>
      </nav>

      {/* Collapse Button for Desktop */}
      {!isMobile && (
        <button
          onClick={onCollapse}
          className="mt-auto mb-4 text-gray-500 hover:text-indigo-600 transition"
        >
          {collapsed ? "→" : "←"}
        </button>
      )}
    </aside>
  );
};

export default UserDashboardSidebar;
