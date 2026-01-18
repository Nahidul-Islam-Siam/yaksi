// pages/dashboard/rents/index.tsx  (RentsSection)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Spin, Empty } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import RentCard from '@/components/cards/RentCard';
import Pagination from '@/components/shared/Pagination/Pagination';
import { useGetAllRentsQuery } from '@/redux/api/rent/rentApi';
import { Rent } from '@/type/type';

const LIMIT = 6;

export default function RentsSection() {
  const router = useRouter();

  /* ---------------- state ---------------- */
  const [page, setPage]         = useState(1);
  const [searchInput, setInput] = useState('');
  const [searchTerm, setTerm]   = useState('');

  /* ---------- query (auto-re-fires) ---------- */
  const { data, isLoading } =
    useGetAllRentsQuery({ page, limit: LIMIT, searchTerm });

  const rents: Rent[] = data?.Data ?? [];

  console.log("helo world", rents);

  /* -------------- handlers -------------- */
  const handleSearch = () => {
    setTerm(searchInput);
    setPage(1);          
  };

  const handlePageChange = (p: number) => setPage(p);

  const handleEdit = (r: Rent) =>
    router.push(`/dashboard/rents/edit/${r._id}`);

  /* --------------- render --------------- */
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-cyan-500 mb-6">Rents</h2>

      {/* search & add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        {/* search */}
        <div className="flex gap-3">
          <Input
            placeholder="Search rents..."
            value={searchInput}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSearch}
            className="flex-1 h-12 max-w-md !rounded-full"
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            className="!h-12 !px-6 !border-none !rounded-full hover:!bg-cyan-500/80"
            style={{ backgroundColor: '#06b6d4' }}
          >
            Search
          </Button>
        </div>

        {/* add rent */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push('/dashboard/rents/add')}
          className="w-full sm:w-auto !px-6 !h-12 font-medium !rounded-full !border-none hover:!bg-cyan-500/80"
          style={{ backgroundColor: '#06b6d4' }}
        >
          Add Rental
        </Button>
      </div>

      {/* cards */}
      <div className="min-h-[600px]">
        {isLoading ? (
          <div className="flex justify-center py-28">
            <Spin size="large" />
          </div>
        ) : rents.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {rents.map((r) => (
              <RentCard
                key={r._id}
                rent={r}
                isDashboard
                onButtonClick={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="py-12">
            <Empty
              description={
                searchTerm
                  ? `No rentals found for “${searchTerm}”`
                  : 'No rentals found'
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>

      {/* pagination */}
      {!isLoading && (
        <div className="mt-10">
          <Pagination
            currentPage={page}
            limit={LIMIT}
            dataLength={rents.length}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}