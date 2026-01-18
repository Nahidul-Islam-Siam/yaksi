'use client';

import { Menu } from 'antd';
import {
    AppstoreOutlined,
    TeamOutlined,
    CalendarOutlined,
    ThunderboltOutlined,
    CrownOutlined,
    ShopOutlined,
    GiftOutlined,
    CreditCardOutlined,
    PictureOutlined,
    SettingOutlined,
    LogoutOutlined,
    DoubleRightOutlined,
    DoubleLeftOutlined,
} from '@ant-design/icons';
import logo from "@/assets/shared/logo.png";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { toast } from 'sonner';
import { useCallback, useMemo, useState } from 'react';
import LogoutModal from '../../modals/LogoutModal';
import {
    logout,
} from '@/redux/services/user/authSlice';

interface DashboardSidebarProps {
    collapsed: boolean;
    isMobile: boolean;
    onCollapse: () => void;
}

export default function DashboardSidebar({ collapsed, isMobile, onCollapse }: DashboardSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const activeKey = useMemo(() => {
        if (pathname.includes('/dashboard/overview') || pathname === '/dashboard') return 'dashboard';
        if (pathname.includes('/dashboard/users')) return 'users';
        if (pathname.includes('/dashboard/bookings')) return 'bookings';
        if (pathname.includes('/dashboard/jet-ski')) return 'jetski';
        if (pathname.includes('/dashboard/membership-plans')) return 'membershipplans';
        if (pathname.includes('/dashboard/rents')) return 'rents';
        if (pathname.includes('/dashboard/adventure-packs')) return 'adventurepacks';
        if (pathname.includes('/dashboard/payments')) return 'payments';
        if (pathname.includes('/dashboard/gallery')) return 'gallery';
        if (pathname.includes('/dashboard/settings')) return 'settings';
        return 'dashboard';
    }, [pathname]);

    const selectedKeys = useMemo(() => [activeKey], [activeKey]);

    const menuItems = useMemo(() => [
        {
            key: 'dashboard',
            icon: <AppstoreOutlined className="!text-xl" />,
            label: <Link href="/dashboard" className='font-semibold'>Dashboard</Link>,
        },
        {
            key: 'users',
            icon: <TeamOutlined className="!text-xl" />,
            label: <Link href="/dashboard/users" className='font-semibold'>Users</Link>,
        },
        {
            key: 'bookings',
            icon: <CalendarOutlined className="!text-xl" />,
            label: <Link href="/dashboard/bookings" className='font-semibold'>Bookings</Link>,
        },
        {
            key: 'jetski',
            icon: <ThunderboltOutlined className="!text-xl" />,
            label: <Link href="/dashboard/jet-ski-list" className='font-semibold'>Jet Ski</Link>,
        },
        {
            key: 'membershipplans',
            icon: <CrownOutlined className="!text-xl" />,
            label: <Link href="/dashboard/membership-plans" className='font-semibold'>Membership Plans</Link>,
        },
        {
            key: 'rents',
            icon: <ShopOutlined className="!text-xl" />,
            label: <Link href="/dashboard/rents" className='font-semibold'>Rents</Link>,
        },
        {
            key: 'adventurepacks',
            icon: <GiftOutlined className="!text-xl" />,
            label: <Link href="/dashboard/adventure-packs" className='font-semibold'>Adventure Packs</Link>,
        },
        {
            key: 'payments',
            icon: <CreditCardOutlined className="!text-xl" />,
            label: <Link href="/dashboard/payments" className='font-semibold'>Payments</Link>,
        },
        {
            key: 'gallery',
            icon: <PictureOutlined className="!text-xl" />,
            label: <Link href="/dashboard/gallery" className='font-semibold'>Gallery</Link>,
        },
        {
            key: 'settings',
            icon: <SettingOutlined className="!text-lg" />,
            label: <Link href="/dashboard/settings" className='font-semibold'>Settings</Link>,
        },
    ], []); // Empty dependency array since menu items are static

    const handleMenuClick = useCallback(() => {
        if (isMobile) {
            onCollapse();
        }
    }, [isMobile, onCollapse]);

    const handleLogoutConfirm = useCallback(async () => {
        try {
            // Clear Redux state
            dispatch(logout());

            // Clear access token cookie
            document.cookie = 'access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict; Secure';

            // Show success toast
            toast.success('Logged out successfully!');

            // Redirect to login page
            router.push('/auth/login');

        } catch (error) {
            console.error('Logout error:', error);

            // Even if there's an error, still clear Redux state
            dispatch(logout());

            // Clear cookie as fallback
            document.cookie = 'access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict; Secure';

            // Show appropriate error toast
            let errorMessage = 'Logout completed with some issues.';

            if (error instanceof Error) {
                if (error.message.includes('network')) {
                    errorMessage = 'Logged out locally. Network issue occurred.';
                }
            }

            toast.error(errorMessage);

            // Still redirect to login
            router.push('/auth/login');

        } finally {
            setShowLogoutModal(false);
        }
    }, [dispatch, router]);

    const handleLogout = useCallback(() => {
        setShowLogoutModal(true);
    }, []);

    const containerClasses = useMemo(() =>
        `bg-white h-full transition-all duration-300 z-50 ${isMobile
            ? `fixed left-0 top-0 h-[100dvh] ${collapsed ? '-translate-x-full' : 'translate-x-0'} w-60`
            : 'relative w-full'
        } flex flex-col`,
        [isMobile, collapsed]
    );

    const logoClasses = useMemo(() =>
        `flex items-center ${collapsed ? 'p-3' : 'p-8'} gap-3`,
        [collapsed]
    );

    return (
        <div className={containerClasses}>
            {/* Logo Section */}
            <div className="flex items-center justify-center relative mb-4">
                <div className={logoClasses}>
                    <Link href="/" className="flex items-center">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Image
                                    placeholder='blur'
                                    blurDataURL={logo.src}
                                    src={logo}
                                    alt="AML Logo"
                                    width={240}
                                    height={40}
                                    className={`object-contain bg-black ${collapsed ? 'p-1' : 'p-2'}`}
                                    priority
                                />
                            </div>
                        </div>
                    </Link>
                </div>
                <button
                    onClick={onCollapse}
                    className="text-[#00AEEF] hover:text-black bg-white shadow-md transition-colors px-2 py-1 rounded-xl absolute right-0 -bottom-6"
                >
                    {collapsed ? (
                        <DoubleRightOutlined className="text-lg" />
                    ) : (
                        <DoubleLeftOutlined className="text-lg" />
                    )}
                </button>
            </div>

            {/* Menu Section */}
            <div className="flex-1 py-6 overflow-y-auto">
                <Menu
                    mode="inline"
                    selectedKeys={selectedKeys}
                    items={menuItems}
                    theme="dark"
                    inlineCollapsed={collapsed && !isMobile}
                    className="!bg-white !border-none custom-menu h-full"
                    onClick={handleMenuClick}
                />
            </div>

            {/* Logout Section */}
            <div className="p-2 flex-shrink-0">
                <div
                    className="flex items-center text-black hover:text-white cursor-pointer transition-colors p-3 hover:bg-[#00AEEF] rounded-lg w-full"
                    onClick={handleLogout}
                >
                    <LogoutOutlined className="text-lg mr-3" />
                    {(!collapsed || isMobile) && <span>Log out</span>}
                </div>
            </div>

            <LogoutModal
                open={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={() => setShowLogoutModal(false)}
            />
        </div>
    );
}