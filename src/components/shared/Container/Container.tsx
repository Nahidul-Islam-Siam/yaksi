import React, { ReactNode } from 'react'
import clsx from 'clsx'

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={clsx(
            'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 xl:py-20',
            className
        )}>
            {children}
        </div>
    )
}