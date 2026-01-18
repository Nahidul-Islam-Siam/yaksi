'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import logo from "@/assets/shared/logo.png";
import Link from 'next/link'
import { 
    CloseOutlined, 
    HomeOutlined, 
    CarOutlined, 
    CreditCardOutlined, 
    CalendarOutlined,
    TrophyOutlined,
    QuestionCircleOutlined,
    UserOutlined,
    LogoutOutlined 
} from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import Image from 'next/image';

interface MobileNavDrawerProps {
    isOpen: boolean
    onClose: () => void
    user?: { name: string; email: string; avatar?: string } | null
    loading: boolean
    onLogout: () => void
}

export function MobileNavDrawer({ isOpen, onClose, user, loading, onLogout }: MobileNavDrawerProps) {
    const pathname = usePathname()
    const [visible, setVisible] = useState(false)
    const [animateIn, setAnimateIn] = useState(false)

    // Handle mounting/unmounting with proper animation timing
    useEffect(() => {
        if (isOpen) {
            // Mount component first
            setVisible(true)
            // Small delay to allow CSS transition to work on mount
            const timer = setTimeout(() => {
                setAnimateIn(true)
            }, 10)
            return () => clearTimeout(timer)
        } else {
            // Start closing animation
            setAnimateIn(false)
            // Unmount after animation completes
            const timer = setTimeout(() => {
                setVisible(false)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    // Body scroll lock
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [visible])

    // Escape key handling
    useEffect(() => {
        if (!visible) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [visible, onClose])

    // Updated navigation items for JetXClub
    const navigationItems = [
        { name: 'Home', href: '/', icon: HomeOutlined },
        { name: 'Our JetSki', href: '/our-jet-ski', icon: CarOutlined },
        { name: 'Membership Plans', href: '/membership-plans', icon: CreditCardOutlined },
        { name: 'Day Rentals', href: '/day-rentals', icon: CalendarOutlined },
        { name: 'Adventure Packs', href: '/adventure-packs', icon: TrophyOutlined },
        { name: 'FAQ', href: '/faq', icon: QuestionCircleOutlined }
    ]

    const isActiveLink = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname === href || pathname.startsWith(`${href}/`)
    }

    const handleLinkClick = () => {
        onClose()
    }

    const handleLogout = () => {
        onLogout()
        onClose()
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    // Don't render if not visible
    if (!visible) return null

    return (
        <div className="fixed inset-0 z-50 xl:hidden">
            {/* Backdrop with smooth fade */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
                    animateIn ? 'opacity-50' : 'opacity-0'
                }`}
                onClick={handleBackdropClick}
            />

            {/* Drawer with smooth slide animation */}
            <div
                className={`absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] h-[100dvh] bg-black shadow-2xl transform transition-transform duration-300 ease-in-out ${
                    animateIn ? 'translate-x-0' : '-translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-nav-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <Link href="/" className="flex items-center" onClick={handleLinkClick}>
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <Image
                                    placeholder='blur'
                                    blurDataURL={logo.src}
                                    src={logo}
                                    alt="JetXClub Logo"
                                    width={240}
                                    height={40}
                                    className="object-contain w-28 h-8"
                                    priority
                                />
                            </div>
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-[#00AEEF]/[0.1] transition-colors duration-200"
                        aria-label="Close navigation menu"
                    >
                        <CloseOutlined className="!text-lg !text-white" />
                    </button>
                </div>

                {/* User Section - Show at top when logged in */}
                {!loading && user && (
                    <div className="p-4 border-b border-gray-700">
                        <div
                            className={`transform transition-all duration-300 ease-out ${
                                animateIn ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
                            }`}
                            style={{ transitionDelay: animateIn ? '50ms' : '0ms' }}
                        >
                            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                                <Avatar
                                    size={40}
                                    src={user.avatar}
                                    icon={<UserOutlined />}
                                    className="bg-[#00AEEF]"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-white">{user.name}</p>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <div className="space-y-2">
                        {navigationItems.map((item, index) => {
                            const IconComponent = item.icon
                            const isActive = isActiveLink(item.href)

                            return (
                                <div
                                    key={item.name}
                                    className={`transform transition-all duration-300 ease-out ${
                                        animateIn
                                            ? 'translate-x-0 opacity-100'
                                            : '-translate-x-5 opacity-0'
                                    }`}
                                    style={{
                                        transitionDelay: animateIn ? `${index * 50 + 100}ms` : '0ms'
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={handleLinkClick}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                            isActive
                                                ? 'bg-[#00AEEF]/[0.3] text-white border border-[#00AEEF]'
                                                : 'text-white hover:bg-[#00AEEF]/[0.1] hover:text-[#00AEEF]'
                                        }`}
                                    >
                                        <IconComponent
                                            className={`text-lg transition-colors duration-200 ${
                                                isActive 
                                                    ? 'text-[#00AEEF]' 
                                                    : 'text-gray-400 group-hover:text-[#00AEEF]'
                                            }`}
                                        />
                                        <span className="font-medium">{item.name}</span>

                                        {/* Active indicator */}
                                        {isActive && (
                                            <div className="ml-auto w-2 h-2 bg-[#00AEEF] rounded-full" />
                                        )}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </nav>

                {/* Footer - Auth buttons or user actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-black">
                    {!loading && (
                        <>
                            {user && (
                                // Show user actions when authenticated
                                <div
                                    className={`!space-y-2 transform transition-all duration-300 ease-out ${
                                        animateIn ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
                                    }`}
                                    style={{
                                        transitionDelay: animateIn ? `${navigationItems.length * 50 + 150}ms` : '0ms'
                                    }}
                                >
                                    <Button
                                        block
                                        danger
                                        icon={<LogoutOutlined />}
                                        onClick={handleLogout}
                                        className="!bg-red-600 hover:!bg-red-700 !border-red-600 !text-white"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                    
                    {/* Brand tagline */}
                    <div className={`text-center ${user && 'mt-4'}`}>
                        <p className="text-xs text-gray-400">
                            Sydney&apos;s First Jet Ski Membership
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}