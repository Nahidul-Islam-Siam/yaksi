// app/dashboard/adventure-packs/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Spin, Empty } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import AdventureCard from '@/components/cards/AdventureCard';
import Pagination from '@/components/shared/Pagination/Pagination';
import { useGetAllAdventurePacksQuery } from '@/redux/api/adventurePack/adventurePackApi';

const LIMIT = 6;

export default function AdventurePackList() {
    const router = useRouter();

    /* ---------------- state ---------------- */
    const [page, setPage] = useState(1);
    const [searchInput, setInput] = useState('');
    const [searchTerm, setTerm] = useState('');

    /* ---------- query (auto-re-fires) ---------- */
    const { data, isLoading } = useGetAllAdventurePacksQuery({
        page,
        limit: LIMIT,
        searchTerm
    });

    const packs = data ?? [];

    /* -------------- handlers -------------- */
    const handleSearch = () => {
        setTerm(searchInput);
        setPage(1);
    };

    const handlePageChange = (p: number) => setPage(p);

    const handleEdit = (packId: string) =>
        router.push(`/dashboard/adventure-packs/edit/${packId}`);

    /* --------------- render --------------- */
    return (
      <div className="py-6">
        <h2 className="text-2xl font-bold text-cyan-500 mb-6">
          Adventure Packs
        </h2>

        {/* search & add */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* search */}
          <div className="flex gap-3">
            <Input
              placeholder="Search adventure packs..."
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
              style={{ backgroundColor: "#06b6d4" }}
            >
              Search
            </Button>
          </div>

          {/* add adventure pack */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/dashboard/adventure-packs/add")}
            className="w-full sm:w-auto !px-6 !h-12 font-medium !rounded-full !border-none hover:!bg-cyan-500/80"
            style={{ backgroundColor: "#06b6d4" }}
          >
            Add Adventure Pack
          </Button>
        </div>

        {/* cards */}
        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex justify-center py-28">
              <Spin size="large" />
            </div>
          ) : packs.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
              {packs.map((pack) => (
                <AdventureCard
                  key={pack._id}
                  packId={pack._id}
                  title={pack.title}
                  discountPercentage={pack.discountPercentage}
                  ridesPricing3={pack.ridesPricing3}
                  ridesPricing5={pack.ridesPricing5}
                  ridesPricing10={pack.ridesPricing10}
                  refundAmount={pack.refundAmount}
                  image={
                    typeof pack.jet_skyId === "object"
                      ? pack.jet_skyId.images?.[0]
                      : "/default-jetski.jpg"
                  }
                  isDashboard
                  onClick={() => handleEdit(pack._id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-12">
              <Empty
                description={
                  searchTerm
                    ? `No adventure packs found for "${searchTerm}"`
                    : "No adventure packs found"
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </div>

        {/* pagination */}
        {!isLoading && packs.length > 0 && (
          <div className="mt-10">
            <Pagination
              currentPage={page}
              limit={LIMIT}
              dataLength={packs.length}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    );
}