// Remove 'use client' directive - this is now a server component
import { ReactNode } from 'react';
import DashboardLayoutClient from '@/components/pages/dashboard/DashboardLayoutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | AML',
    description: 'Dashboard for managing AML store',
};

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardLayoutClient>
      {children}
    </DashboardLayoutClient>
  );
}