import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/ReduxProvider";

// Load Inter font for specific use cases
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AML",
  description: "Explore top-tier vehicles from certified dealers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${inter.variable} antialiased  cz-shortcut-listen="true"`}
      >
        <AntdRegistry>
          <ConfigProvider>
            <Toaster />
            <ReduxProvider>{children}</ReduxProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}