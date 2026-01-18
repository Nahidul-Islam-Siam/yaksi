"use client";

import {
  User,
  History,
  CreditCard,
  Settings,
  LogOut,
  Edit,
} from "lucide-react";
import userIcon from "@/assets/user/user-icons.jpg";
import Image from "next/image";
import Link from "next/link";
type SidebarButtonProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, label, active }) => (
  <div
    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
      active ? "bg-indigo-100 text-indigo-700 font-semibold" : "hover:bg-gray-100 text-gray-700"
    }`}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </div>
);

const SideBar = () => {
    return (
        <div>
              {/* Sidebar */}
                    <aside className="w-80 bg-white min-h-screen border-r mt-20">
                      <div className="p-6">
                        <div className="text-center mb-8">
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
            
                        <nav className="space-y-2">
                          <Link href="/user-dashboard" className="cursor-pointer">
                            <SidebarButton icon={<User />} label="Profile" active />
                          </Link>
                          <Link href="/user-dashboard/history">
                            <SidebarButton icon={<History />} label="History" />
                          </Link>
                          <Link href="/user-dashboard/payment-history">
                            <SidebarButton icon={<CreditCard />} label="Payment History" />
                          </Link>
                          <Link href="/user-dashboard/settings">
                            <SidebarButton icon={<Settings />} label="Settings" />
                          </Link>
                          <Link href="/logout">
                            <SidebarButton icon={<LogOut />} label="Logout" />
                          </Link>
                        </nav>
                      </div>
                    </aside>
        </div>
    );
};

export default SideBar;