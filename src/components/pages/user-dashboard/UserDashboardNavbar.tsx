'use client';

import { Avatar, Dropdown, Button, message } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { MenuProps } from 'antd';
import { toast } from 'sonner';
import logo from "@/assets/shared/logo.png";
import Image from 'next/image';
import Link from 'next/link';

interface UserDashboardNavbarProps {
    isMobile: boolean;
    onToggle: () => void;
}

export default function UserDashboardNavbar({ isMobile, onToggle }: UserDashboardNavbarProps) {
    const router = useRouter();

    // ✅ Memoize menu items to prevent recreation
    const userMenuItems: MenuProps['items'] = useMemo(() => [
        {
            key: 'logout',
            label: 'Logout',
            danger: true,
        },
    ], []);

    // ✅ Fixed: Explicitly type the parameter
    const handleMenuClick = useCallback(async (menuInfo: { key: string; }) => {
        const { key } = menuInfo;

        if (key === 'logout') {
            try {
                // ✅ Step 2: Clear Redux state
                // dispatch(logout());

                // ✅ Step 3: Show success message
                toast('Logged out successfully!');

            } catch (error) {
                console.error('Firebase logout error:', error);

                // ✅ Even if Firebase logout fails, still clear Redux state
                // to avoid inconsistent authentication states
                // dispatch(logout());

                // ✅ Show appropriate error message
                let errorMessage = 'Logout completed, but there was an issue with Google sign out.';

                if (error instanceof Error) {
                    // Handle specific Firebase errors
                    if (error.message.includes('network')) {
                        errorMessage = 'Logged out locally. Network issue prevented remote sign out.';
                    } else {
                        errorMessage = 'Logout completed with some issues.';
                    }
                }

                message.warning(errorMessage);
            }
        } else if (key === 'profile') {
            // Navigate to profile page
            router.push('/dashboard/profile');
        }
    }, [router]);

    // ✅ Memoize dropdown menu configuration
    const dropdownMenu = useMemo(() => ({
        items: userMenuItems,
        onClick: handleMenuClick
    }), [userMenuItems, handleMenuClick]);

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

                {/* ✅ Company Logo instead of welcome message */}
                <Link href="/" className="flex items-center">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Image
                                placeholder='blur'
                                blurDataURL={logo.src}
                                src={logo}
                                alt="AML Logo"
                                width={64}
                                height={64}
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </Link>
            </div>

            {/* User Profile */}
            <Dropdown
                menu={dropdownMenu}
                trigger={['click']}
                placement="bottomRight"
            >
                <div className="flex items-center !space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
                    <Avatar
                        src="https://images.unsplash.com/photo-1743865319071-929ac8a27bcd"
                        size={40}
                        className="border border-gray-200"
                        icon={<UserOutlined />}
                    />
                    <div className="hidden sm:block">
                        <div className="text-gray-900 font-medium">Monica Lucas</div>
                    </div>
                </div>
            </Dropdown>
        </div>
    );
}