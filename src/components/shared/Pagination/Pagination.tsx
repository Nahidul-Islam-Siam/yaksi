// components/shared/Pagination/Pagination.tsx
'use client';

import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface PaginationProps {
    /** Current page (1-based) */
    currentPage: number;
    /** Number of items you asked for in the request */
    limit: number;
    /** Number of items the server actually returned */
    dataLength: number;
    /** Callback */
    onPageChange: (page: number) => void;
    /** Extra tailwind / css-in-js classes */
    className?: string;
}

export default function Pagination({
    currentPage,
    limit,
    dataLength,
    onPageChange,
    className = '',
}: PaginationProps) {
    /* ------------------------------------------------------------------ */
    /* Helpers                                                            */
    /* ------------------------------------------------------------------ */
    const hasPrev = currentPage > 1;
    const hasNext = dataLength === limit; // server returned a full page ⇒ maybe more pages

    const handlePrevious = () => {
        if (hasPrev) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (hasNext) onPageChange(currentPage + 1);
    };

    /* ------------------------------------------------------------------ */
    /* Render                                                             */
    /* ------------------------------------------------------------------ */
    return (
        <div className={`flex items-center justify-end space-x-2 ${className}`}>
            {/* Previous */}
            <Button
                onClick={handlePrevious}
                disabled={!hasPrev}
                className="flex items-center justify-center w-10 h-10 rounded-full border-0 hover:bg-gray-100 disabled:opacity-50"
                style={{
                    backgroundColor: 'transparent',
                    color: hasPrev ? '#6b7280' : '#d1d5db',
                }}
            >
                <LeftOutlined className="text-sm" />
            </Button>

            {/* Current page number */}
            <span className="px-3 py-2 text-gray-700 font-medium">{currentPage}</span>

            {/* Next */}
            <Button
                onClick={handleNext}
                disabled={!hasNext}
                className="flex items-center justify-center w-10 h-10 rounded-full border-0 hover:bg-gray-100 disabled:opacity-50"
                style={{
                    backgroundColor: 'transparent',
                    color: hasNext ? '#6b7280' : '#d1d5db',
                }}
            >
                <RightOutlined className="text-sm" />
            </Button>
        </div>
    );
}