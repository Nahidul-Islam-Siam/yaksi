import { ReactNode } from 'react';
import { Navbar } from '@/components/shared/Navbar/Navbar';
import Footer from '@/components/shared/Footer/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='bg-black'>
        <Navbar />
        {children}
        <Footer />
    </div>
    
  );
}