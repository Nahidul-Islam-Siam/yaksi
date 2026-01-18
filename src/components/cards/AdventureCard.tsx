// components/cards/AdventureCard.tsx
"use client";

import React, { useState } from "react";
import { Button, Dropdown, MenuProps } from "antd";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import Image from "next/image";
import AdventureRidesSelectionModal from "@/components/modals/AdventureRidesSelectionModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import { useDeleteAdventurePackMutation } from "@/redux/api/adventurePack/adventurePackApi";

interface Props {
  packId: string; // ← add pack ID
  title: string;
  discountPercentage: number;
  ridesPricing3: number;
  ridesPricing5: number;
  ridesPricing10: number;
  refundAmount: number;
  image?: string;
  isDashboard?: boolean;
  onClick: () => void;
  onDeleted?: () => void; // ← add delete callback
}

export default function AdventureCard({
  packId,
  title,
  discountPercentage,
  ridesPricing3,
  ridesPricing5,
  ridesPricing10,
  refundAmount,
  image,
  isDashboard = false,
  onClick,
  onDeleted,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  /* ---------- delete mutation ---------- */
  const [deletePack, { isLoading: deleting }] =
    useDeleteAdventurePackMutation();

  /* ---------- handlers ---------- */
  const handleButtonClick = () => {
    if (isDashboard) {
      onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleRideSelection = (rides: number, price: number) => {
    console.log(rides, price);
    // Payment logic here...
  };

  const confirmDelete = async () => {
    try {
      await deletePack(packId).unwrap();
      toast.success("Adventure pack deleted");
      setDeleteModalOpen(false);
      onDeleted?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  /* ---------- dropdown menu ---------- */
  const menuItems: MenuProps["items"] = [
    {
      key: "delete",
      icon: <DeleteOutlined />,
      danger: true,
      label: "Delete",
      onClick: () => setDeleteModalOpen(true),
    },
  ];

  return (
    <>
      <div className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 bg-black !w-full hover:shadow-xl relative">
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
              className="!absolute top-3 right-3 z-10 !bg-white/80 hover:!bg-white"
              loading={deleting}
            />
          </Dropdown>
        )}

        {/* image */}
        <div className="relative h-56 2xl:h-72 w-full bg-white">
          <Image
            src={
              image ||
              "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
            }
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 400px"
            priority
          />

          {/* title + save floating on image */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg">
            <h2 className="text-white text-xl font-bold">
              {title}{" "}
              <span className="text-xs font-normal align-top ml-1 text-cyan-400">
                SAVE {discountPercentage}%*
              </span>
            </h2>
          </div>
        </div>

        {/* content */}
        <div className="text-white p-6 space-y-4 bg-black/70">
          {/* pricing list */}
          <ul className="space-y-1 text-base">
            <li>3 Rides ${ridesPricing3}</li>
            <li>5 Rides ${ridesPricing5}</li>
            <li>10 Rides ${ridesPricing10}</li>
          </ul>

          {/* refundable bond */}
          <p className="text-sm">${refundAmount} Refundable bond</p>

          {/* action button */}
          <Button
            block
            className="h-11 font-semibold rounded-lg !border-none !bg-cyan-500 hover:!bg-cyan-600 !text-white"
            onClick={handleButtonClick}
          >
            {isDashboard ? "Edit Plan" : `Book ${title}`}
          </Button>
        </div>
      </div>

      {/* Rides Selection Modal */}
      <AdventureRidesSelectionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        refundAmount={refundAmount}
        packId={packId}
        ridesPricing3={ridesPricing3}
        ridesPricing5={ridesPricing5}
        ridesPricing10={ridesPricing10}
        onSelectRides={handleRideSelection}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        loading={deleting}
      />
    </>
  );
}
