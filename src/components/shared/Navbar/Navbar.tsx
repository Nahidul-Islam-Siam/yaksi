"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import logo from "@/assets/shared/logo.png";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Avatar, Dropdown } from "antd";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { toast } from "sonner";
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/redux/services/user/authSlice";
import LogoutModal from "@/components/modals/LogoutModal";
import { useGetUserByIdQuery } from "@/redux/api/auth/authApi";
import Image from "next/image";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Get auth state from Redux
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const userId = user?._id as string;

  const { data } = useGetUserByIdQuery(userId);

  const profileImage = data?.Data?.images?.[0];

  const isHomePage = pathname === "/";

  // Scroll behavior for show/hide navbar and background change
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle background change
      setScrolled(currentScrollY > 10);

      // Handle navbar visibility
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Updated navigation items
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Our JetSki", href: "/our-jet-ski" },
    { name: "Membership Plans", href: "/membership-plans" },
    { name: "Day Rentals", href: "/day-rentals" },
    { name: "Adventure Packs", href: "/adventure-packs" },
    { name: "FAQ", href: "/faq" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Determine navbar styling based on page and scroll position
  const getNavbarClasses = () => {
    const baseClasses =
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out";
    const transformClasses = isVisible ? "translate-y-0" : "-translate-y-full";

    if (isHomePage && !scrolled) {
      // Transparent navbar on homepage at top
      return `${baseClasses} ${transformClasses} bg-gradient-to-b from-black/70 via-black/30 to-transparent`;
    } else {
      // Black navbar when scrolled or on other pages
      return `${baseClasses} ${transformClasses} bg-black shadow-sm`;
    }
  };

  // Determine text colors based on navbar background
  const getTextClasses = () => {
    return {
      text: "!text-white",
      textHover: "hover:!text-[#00AEEF]",
      activeText: "text-[#00AEEF]",
      button: "!text-white !border-white hover:!bg-white/10",
      logo: "brightness-0 invert", // Makes logo white if it's dark
    };
  };

  const textStyles = getTextClasses();

  // Show logout modal
  const handleLogout = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  // Redux-integrated logout confirm handler
  const handleLogoutConfirm = useCallback(async () => {
    try {
      // Clear Redux state
      dispatch(logout());

      // Clear access token cookie
      document.cookie =
        "access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict; Secure";

      // Show success message
      toast.success("Logged out successfully!");

      // Redirect to home page (middleware will handle routing)
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);

      // Even if there's an error, still clear Redux state
      dispatch(logout());

      // Clear cookie as fallback
      document.cookie =
        "access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict; Secure";

      toast.error("Logout completed with some issues.");

      // Still redirect to home
      router.push("/");
    } finally {
      setShowLogoutModal(false);
    }
  }, [dispatch, router]);

  // Get display name with fallbacks
  const getDisplayName = () => {
    if (!user) return "User";

    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.name) {
      return user.name;
    }
    if (user.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  // User dropdown menu items
  const userMenuItems = [
    {
      key: "profile",
      label: (
        <Link href="/profile" className="flex items-center gap-2">
          <UserOutlined />
          Profile
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <span
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogoutOutlined />
          Logout
        </span>
      ),
      danger: true,
    },
  ];

  return (
    <>
      <header className={getNavbarClasses()}>
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Left on desktop, Center on mobile */}
            <div className="flex justify-center xl:justify-start gap-3">
              {/* Mobile Menu Button - Left */}
              <div className="xl:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`p-2 rounded-lg transition-colors ${textStyles.button}`}
                >
                  <MenuOutlined className="text-base" />
                </button>
              </div>
              <Link href="/" className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      placeholder="blur"
                      blurDataURL={logo.src}
                      src={logo}
                      alt="JetXClub "
                      width={240}
                      height={40}
                      className="object-contain w-28 h-8 md:w-64 md:h-10"
                      priority
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    isActiveLink(item.href)
                      ? textStyles.activeText
                      : `${textStyles.text} ${textStyles.textHover}`
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {!isAuthenticated ? (
                // Show Join and Login buttons when not authenticated
                <>
                  <Link href="/auth/register">
                    <Button
                      type="primary"
                      className="hidden sm:flex items-center !text-white !border !border-[#00AEEF] !bg-transparent hover:!bg-[#00AEEF]/20"
                    >
                      Join Us
                    </Button>
                  </Link>

                  <Link href="/auth/login">
                    <Button
                      type="primary"
                      className="hidden sm:flex items-center text-white border-0 !bg-[#00AEEF] hover:!bg-[#00AEEF]/80"
                    >
                      Login
                    </Button>
                  </Link>
                </>
              ) : (
                // Show user avatar and dropdown when authenticated
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <Avatar
                      size={36}
                      src={profileImage}
                      icon={<UserOutlined />}
                      className="bg-[#00AEEF]"
                    />
                    <span className="hidden sm:block text-white font-medium">
                      {getDisplayName()}
                    </span>
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </div>

        {/* Pass mobile menu state to MobileNavDrawer */}
        <MobileNavDrawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          user={user}
          loading={false}
          onLogout={handleLogout}
        />
      </header>

      {/* Logout Modal */}
      <LogoutModal
        open={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
}
