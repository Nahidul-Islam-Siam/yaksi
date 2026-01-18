'use client';

import { Menu, Avatar } from 'antd';
import {
    UserOutlined,
    HistoryOutlined,
    CreditCardOutlined,
    SettingOutlined,
    LogoutOutlined,
    DoubleRightOutlined,
    DoubleLeftOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { useCallback, useMemo } from 'react';

interface UserDashboardSidebarProps {
    collapsed: boolean;
    isMobile: boolean;
    onCollapse: () => void;
}

export default function UserDashboardSidebar({ collapsed, isMobile, onCollapse }: UserDashboardSidebarProps) {
    const pathname = usePathname();

    // ✅ Memoize active key calculation for user dashboard routes
    const activeKey = useMemo(() => {
        if (pathname.includes('/user-dashboard/profile')) return 'profile';
        if (pathname.includes('/user-dashboard/history')) return 'history';
        if (pathname.includes('/user-dashboard/payment')) return 'payment';
        if (pathname.includes('/user-dashboard/settings')) return 'settings';
        return 'profile';
    }, [pathname]);

    // ✅ Memoize selected keys array
    const selectedKeys = useMemo(() => [activeKey], [activeKey]);

    // ✅ Memoize menu items for user dashboard
    const menuItems = useMemo(() => [
        {
            key: 'profile',
            icon: <UserOutlined className="!text-xl" />,
            label: <Link href="/user-dashboard/profile" className='font-semibold'>Profile</Link>,
        },
        {
            key: 'history',
            icon: <HistoryOutlined className="!text-xl" />,
            label: <Link href="/user-dashboard/history" className='font-semibold'>History</Link>,
        },
        {
            key: 'payment',
            icon: <CreditCardOutlined className="!text-xl" />,
            label: <Link href="/user-dashboard/payment" className='font-semibold'>Payments</Link>,
        },
        {
            key: 'settings',
            icon: <SettingOutlined className="!text-lg" />,
            label: <Link href="/user-dashboard/settings" className='font-semibold'>Settings</Link>,
        },
    ], []);

    // ✅ Memoize menu click handler
    const handleMenuClick = useCallback(() => {
        if (isMobile) {
            onCollapse();
        }
    }, [isMobile, onCollapse]);

    // ✅ Memoize logout handler
    const handleLogout = useCallback(async () => {
        try {
            // ✅ Step 2: Clear Redux state
            // dispatch(logout());

            // ✅ Step 3: Show success toast
            toast('Logged out successfully!');

        } catch (error) {
            console.error('Firebase logout error:', error);

            // ✅ Even if Firebase logout fails, still clear Redux state
            // to avoid inconsistent authentication states
            // dispatch(logout());

            // ✅ Show appropriate error toast
            let errortoast = 'Logout completed, but there was an issue with Google sign out.';

            if (error instanceof Error) {
                // Handle specific Firebase errors
                if (error.message.includes('network')) {
                    errortoast = 'Logged out locally. Network issue prevented remote sign out.';
                } else {
                    errortoast = 'Logout completed with some issues.';
                }
            }

            toast(errortoast);
        }
    }, []);

    // ✅ Memoize container classes
    const containerClasses = useMemo(() =>
        `bg-white h-full transition-all duration-300 z-50 ${isMobile
            ? `fixed left-0 top-0 h-screen ${collapsed ? '-translate-x-full' : 'translate-x-0'} w-72`
            : 'relative w-full'
        } flex flex-col`,
        [isMobile, collapsed]
    );

    return (
        <div className={containerClasses}>
            {/* ✅ User Profile Section instead of Logo */}
            <div className={`flex items-center justify-center relative mb-6 ${collapsed ? 'pt-6' : 'pt-10'}`}>
                {!collapsed || isMobile ? (
                    <div className="flex flex-col items-center !space-y-3 px-6">
                        <Avatar
                            src="https://images.unsplash.com/photo-1743865319071-929ac8a27bcd" // Replace with actual user image
                            size={120}
                            className="border-2 border-gray-200"
                            icon={<UserOutlined />}
                        />
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900">Monica Lucas</h3>
                            <p className="text-sm text-gray-600">monica@rentaly.com</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-2 px-3">
                        <Avatar
                            src="https://images.unsplash.com/photo-1743865319071-929ac8a27bcd"
                            size={40}
                            className="border border-gray-200"
                            icon={<UserOutlined />}
                        />
                    </div>
                )}

                {/* Collapse Toggle Button */}
                <button
                    onClick={onCollapse}
                    className="text-[#272877] hover:text-black bg-white shadow-md transition-colors px-2 py-1 rounded-xl absolute right-0 -bottom-8"
                >
                    {collapsed ? (
                        <DoubleRightOutlined className="text-lg" />
                    ) : (
                        <DoubleLeftOutlined className="text-lg" />
                    )}
                </button>
            </div>

            {/* Menu Section */}
            <div className="flex-1 py-2 overflow-y-auto">
                <Menu
                    mode="inline"
                    selectedKeys={selectedKeys}
                    items={menuItems}
                    theme="light"
                    inlineCollapsed={collapsed && !isMobile}
                    className="!bg-white !border-none custom-menu h-full"
                    onClick={handleMenuClick}
                />
            </div>

            {/* Logout Section */}
            <div className="p-4 flex-shrink-0">
                <div
                    className="flex items-center text-gray-700 hover:text-white cursor-pointer transition-colors p-3 hover:bg-[#272877] rounded-lg w-full"
                    onClick={handleLogout}
                >
                    <LogoutOutlined className="text-lg mr-3" />
                    {(!collapsed || isMobile) && <span className="font-semibold">Logout</span>}
                </div>
            </div>
        </div>
    );
}