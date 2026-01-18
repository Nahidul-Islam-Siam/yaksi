// components/cards/RentCard.tsx
"use client";

import Image from "next/image";
import { Button, Tag, Dropdown, MenuProps } from "antd";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useDeleteRentMutation } from "@/redux/api/rent/rentApi";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import { Rent } from "@/type/type";
import { useState } from "react";

interface RentCardProps {
  rent: Rent; // API shape with jet_skyId, feature_list, price
  isDashboard?: boolean;
  onButtonClick: (r: Rent) => void;
  onDeleted?: () => void; // parent can refetch list
}

export default function RentCard({
  rent,
  isDashboard = false,
  onButtonClick,
  onDeleted,
}: RentCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  /* ----------------------- helpers ----------------------- */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jet = (rent as any).jet_skyId; // nested jet-ski object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const price = (rent as any).price; // daily price
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const features: string[] = (rent as any).feature_list ?? [];

  const getBrand = (name: string) => {
    if (name.includes("Sea-Doo")) return "SEADOO";
    if (name.includes("Yamaha")) return "YAMAHA";
    if (name.includes("Kawasaki")) return "KAWASAKI";
    return "SEADOO";
  };

  /* ------------------ delete mutation -------------------- */
  const [deleteRent, { isLoading: deleting }] = useDeleteRentMutation();

  const handleDelete = () => setDeleteOpen(true);

  const confirmDelete = async () => {
    try {
      await deleteRent(rent._id).unwrap();
      toast.success("Rent deleted");
      setDeleteOpen(false);
      onDeleted?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "delete",
      icon: <DeleteOutlined />,
      danger: true,
      label: "Delete",
      onClick: handleDelete,
    },
  ];

  /* ------------------------- UI -------------------------- */
  return (
    <div className="w-full rounded-2xl shadow-lg bg-white hover:shadow-xl flex flex-col h-[600px]">
      {/* Image */}
      <div className="relative h-56 2xl:h-72">
        <Image
          src={
            jet?.images?.[0] ||
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
          }
          alt={jet?.model ?? "Jet Ski"}
          fill
          className="object-cover"
        />

        {/* dashboard dropdown */}
        {isDashboard && (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="text"
              shape="circle"
              icon={<MoreOutlined />}
              className="!absolute top-3 right-3 !bg-white/80 hover:!bg-white"
              loading={deleting}
            />
          </Dropdown>
        )}

        {/* overlay text */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end mix-blend-difference text-white">
          <div>
            <p className="text-sm uppercase tracking-wider font-medium opacity-90">
              {jet ? getBrand(jet.name) : "SEADOO"}
            </p>
            <h3 className="text-2xl font-bold leading-tight">
              {jet?.model ?? "GTI 130"}
            </h3>
          </div>
          <span className="text-lg font-bold">
            <span className="text-3xl">{jet?.hp ?? 130}</span> HP
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 overflow-hidden">
        {/* Price */}
        <p className="text-sm font-medium mb-2 text-gray-900">${price}/Day</p>

        {/* Title + description */}
        <h2 className="text-lg font-bold mb-2 text-gray-900">{rent.model}</h2>
        <p className="text-sm leading-relaxed mb-4 text-gray-600 line-clamp-3 overflow-hidden">
          {jet?.description || "No description available."}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 my-4 items-center overflow-hidden flex-1">
          {features.length > 0 ? (
            <>
              {features.slice(0, 4).map((f) => (
                <Tag key={f} color="cyan">
                  {f}
                </Tag>
              ))}
              {features.length > 4 && (
                <Tag color="cyan">+{features.length - 4}</Tag>
              )}
            </>
          ) : (
            <span className="text-gray-400 text-center text-sm">
              No features listed
            </span>
          )}
        </div>

        {/* Button always at bottom */}
        <Button
          onClick={() => onButtonClick(rent)}
          className="w-full h-12 rounded-lg font-semibold text-base border-none !bg-cyan-500 !text-white hover:!bg-cyan-600 mt-auto"
        >
          {isDashboard ? "Edit Plan" : "Reserve Me"}
        </Button>
      </div>

      {/* Delete modal */}
      <DeleteConfirmationModal
        open={deleteOpen}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteOpen(false)}
        loading={deleting}
      />
    </div>
  );
}
