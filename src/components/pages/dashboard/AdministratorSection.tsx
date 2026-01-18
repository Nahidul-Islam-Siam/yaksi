"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Empty, Spin, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "sonner";

import AdministratorCard from "@/components/cards/AdministratorCard";
import Pagination from "@/components/shared/Pagination/Pagination";
import AssignAdministratorModal from "@/components/modals/AssignAdministratorModal";
import AdministratorDetailsModal from "@/components/modals/AdministratorDetailsModal";
import { AdministrationMember } from "@/type/type";
import { selectUserRole } from "@/redux/services/user/authSlice";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/api/user/userAPi";

const ITEMS_PER_PAGE = 5;
const { Title } = Typography;

export default function AdministratorSection() {
  const userRole = useSelector(selectUserRole);

  const [currentPage, setCurrentPage] = useState(1);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedAdministrator, setSelectedAdministrator] =
    useState<AdministrationMember | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  const { data, isLoading, refetch } = useGetAllUsersQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    searchTerm: "Administrator",
  });

  const administrators = data?.Data || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const [deleteUser] = useDeleteUserMutation();

  const handleRemoveAdministrator = async (id: string) => {
    setRemoving(id);
    try {
      await deleteUser(id).unwrap();
      toast.success("Administrator removed successfully");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove administrator");
    } finally {
      setRemoving(null);
    }
  };

  const handleViewDetails = (administrator: AdministrationMember) => {
    setSelectedAdministrator(administrator);
    setDetailsModalOpen(true);
  };

  if (userRole !== "Admin") return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6">
        <Title level={5} className="!text-gray-700 !text-xl">
          Administrator
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setAssignModalOpen(true)}
          className="h-auto px-4 py-2 rounded-lg !border-none"
          style={{ backgroundColor: "#0EA5E9" }}
        >
          Assign Administrator
        </Button>
      </div>

      {/* Administrator Cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : administrators.length > 0 ? (
          administrators.map((admin) => (
            <div key={admin._id} className="relative">
              <AdministratorCard
                administrator={admin}
                onRemove={handleRemoveAdministrator}
                onDetails={() => handleViewDetails(admin)}
                removing={removing === admin._id} // pass loading state if needed
              />
            </div>
          ))
        ) : (
          <div className="py-12">
            <Empty
              description="No administrators found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && administrators.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            limit={ITEMS_PER_PAGE}
            dataLength={data?.Data?.length || 0}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Modals */}
      <AssignAdministratorModal
        open={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        onSuccess={() => refetch()}
      />
      <AdministratorDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        administrator={selectedAdministrator}
      />
    </div>
  );
}
