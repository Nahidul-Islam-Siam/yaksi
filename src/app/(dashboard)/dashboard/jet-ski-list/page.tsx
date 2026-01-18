// components/JetSkiSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input, Button, Empty, Spin } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { toast } from 'sonner';
import JetSkiCard from '@/components/cards/JetSkiCard';
import Pagination from '@/components/shared/Pagination/Pagination';
import AddJetSkiModal from '@/components/modals/AddJetSkiModal';
import EditJetSkiModal from '@/components/modals/EditJetSkiModal';
import {
    useGetAllJetSkisQuery,
    useGetJetSkiByIdQuery,
    useDeleteJetSkiMutation,
} from '@/redux/api/jetSki/jetApi';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal';

const ITEMS_PER_PAGE = 5;

export default function JetSkiSection() {
    /* -------------------------------------------------------------------- *
     * Local state
     * ------------------------------------------------------------------ */
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    /* -------------------------------------------------------------------- *
     * Modals
     * ------------------------------------------------------------------ */
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedJetSkiId, setSelectedJetSkiId] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingJetSkiId, setDeletingJetSkiId] = useState<string | null>(null);

    /* -------------------------------------------------------------------- *
     * API hooks – now pass query-params
     * ------------------------------------------------------------------ */
    const {
        data: jetSkisResponse,
        isLoading: loadingJetSkis,
        error: jetSkisError,
        refetch: refetchJetSkis,
    } = useGetAllJetSkisQuery({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        searchTerm,
    });

    const {
        data: selectedJetSkiResponse,
    } = useGetJetSkiByIdQuery(selectedJetSkiId!, { skip: !selectedJetSkiId });

    const [deleteJetSki, { isLoading: deleteLoading }] =
        useDeleteJetSkiMutation();

    /* -------------------------------------------------------------------- *
     * Derived values from API
     * ------------------------------------------------------------------ */
    const jetSkis = jetSkisResponse?.Data ?? [];

    /* -------------------------------------------------------------------- *
     * Handlers
     * ------------------------------------------------------------------ */
    const handleSearch = () => {
        setCurrentPage(1);          // reset to first page
        setSearchTerm(searchInput); // commit current text as query param
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleAddSuccess = () => {
        setCurrentPage(1);
        refetchJetSkis();
    };

    const handleEditJetSki = (id: string) => {
        setSelectedJetSkiId(id);
        setEditModalOpen(true);
    };

    const handleDeleteJetSki = (id: string) => {
        setDeletingJetSkiId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingJetSkiId) return;
        try {
            const res = await deleteJetSki(deletingJetSkiId).unwrap();
            if (res.success) {
                toast.success('Jet ski deleted successfully');
                if (jetSkis.length === 1 && currentPage > 1) {
                    setCurrentPage((p) => p - 1);
                } else {
                    refetchJetSkis();
                }
            } else {
                toast.error(res.message || 'Failed to delete jet ski');
            }
        } catch (e: any) {
            toast.error(e?.data?.message || 'Failed to delete jet ski');
        } finally {
            setDeleteModalOpen(false);
            setDeletingJetSkiId(null);
        }
    };

    /* -------------------------------------------------------------------- *
     * Render
     * ------------------------------------------------------------------ */
    if (jetSkisError) {
        return (
            <div className="py-6">
                <div className="flex flex-col items-center justify-center py-12">
                    <Empty
                        description="Failed to load jet skis"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                    <Button type="primary" onClick={() => refetchJetSkis()} className="mt-4">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }
console.log("heheeh", selectedJetSkiResponse?.Data || null);
    
    return (
      <div className="py-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-[#00AEEF] mb-6">Our Jet Ski</h2>

        {/* Search & Add */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-3 mb-6">
            <Input
              placeholder="Search jet skis…"
              value={searchInput} // ← uses searchInput
              onChange={(e) => setSearchInput(e.target.value)}
              onPressEnter={handleSearch}
              className="flex-1 h-12 max-w-md !rounded-full"
            />

            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              className="!h-12 !px-6 !border-none !rounded-full hover:!bg-[#0EA5E9]/80"
              style={{ backgroundColor: "#0EA5E9" }}
            >
              Search
            </Button>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddModalOpen(true)}
            className="w-full sm:w-auto !px-6 !h-12 font-medium !rounded-full !border-none hover:!bg-[#0EA5E9]/80"
            style={{ backgroundColor: "#0EA5E9" }}
          >
            Add Jet Ski
          </Button>
        </div>

        {/* Cards */}
        <div className="!space-y-6">
          {loadingJetSkis ? (
            <div className="flex justify-center py-28">
              <Spin size="large" />
              <span className="ml-3 text-gray-600">Loading jet skis...</span>
            </div>
          ) : jetSkis.length > 0 ? (
            jetSkis.map((jetSki) => (
              <JetSkiCard
                key={jetSki._id}
                jetSki={jetSki}
                onEdit={() => handleEditJetSki(jetSki._id)}
                onDelete={() => handleDeleteJetSki(jetSki._id)}
              />
            ))
          ) : (
            <div className="py-12">
              <Empty
                description={
                  searchTerm
                    ? `No jet skis found for "${searchTerm}"`
                    : "No jet skis found"
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
              {searchTerm && (
                <div className="text-center mt-4">
                  <Button
                    type="link"
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentPage(1);
                    }}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loadingJetSkis && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              limit={ITEMS_PER_PAGE}
              dataLength={jetSkis.length}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Modals */}
        <AddJetSkiModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSuccess={handleAddSuccess}
        />

        <EditJetSkiModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedJetSkiId(null);
          }}
          onSuccess={() => {
            refetchJetSkis();
            setSelectedJetSkiId(null);
          }}
          jetSki={selectedJetSkiResponse?.Data || null}
        />

        <DeleteConfirmationModal
          open={deleteModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setDeleteModalOpen(false);
            setDeletingJetSkiId(null);
          }}
          loading={deleteLoading}
        />
      </div>
    );
}