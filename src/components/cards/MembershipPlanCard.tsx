"use client";

import { Button, Card, Dropdown, MenuProps } from "antd";
import {
  TMemberShip,
  useDeleteMemberShipMutation,
} from "@/redux/api/memberShip/memberShipApi";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import { useSelector } from "react-redux";
import { selectUserRole } from "@/redux/services/user/authSlice";
import { useSubscribeMutation } from "@/redux/api/subscription/subscriptionApi";

interface MembershipPlanCardProps {
  plan: TMemberShip;
  isFeatured?: boolean;
  onEdit: (planId: string) => void;
  isDashboard?: boolean;
  onDeleted?: () => void;
}

export default function MembershipPlanCard({
  plan,
  onEdit,
  onDeleted,
  isDashboard = false,
}: MembershipPlanCardProps) {
  // delete

  const userRole = useSelector(selectUserRole);

  const [deleteMembership, { isLoading }] = useDeleteMemberShipMutation();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => setDeleteOpen(true);
  const confirmDelete = async () => {
    try {
      await deleteMembership(plan._id).unwrap();
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

  const [subscribe, { isLoading: isSubscribing }] = useSubscribeMutation();

  const handleSignup = async () => {
    try {
      const response = await subscribe({
        memberShipPlanId: plan._id,
        signUpFee: plan.signUpFee,
        refundableDeposit: plan.refundableDeposit,
      }).unwrap();

      const stripeUrl = response?.Data?.[0]?.url_Link;
      if (stripeUrl) {
        window.location.href = stripeUrl;
      } else {
        toast.error("Stripe URL not found in response");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Subscription failed");
    }
  };

  return (
    <Card
      className={`!w-full !rounded-2xl !shadow-lg !transition-transform !duration-300 
    ${
      plan.durationInMonths === 24
        ? "!bg-[#00AEEF] !text-white !border-[#00AEEF] !scale-105 !shadow-cyan-300"
        : "!bg-white !text-gray-900 !border-gray-200 hover:!shadow-xl hover:!scale-105"
    }`}
      style={{ padding: "24px" }}
    >
      <div className="flex flex-col h-full">
        {(userRole === "Admin" || userRole === "Administrator") && (
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
              loading={isLoading}
            />
          </Dropdown>
        )}

        {/* Price Header */}

        <div className="mb-6">
          <h2
            className={`text-4xl font-extrabold ${
              plan.durationInMonths === 24 ? "text-white" : "text-gray-900"
            }`}
          >
            ${plan.price}
            <span className="text-sm font-semibold">/Pw</span>
          </h2>
          <p
            className={`text-base font-medium mt-2 ${
              plan.durationInMonths === 24 ? "text-cyan-100" : "text-gray-700"
            }`}
          >
            {plan.durationInMonths} Month Contract
          </p>
        </div>

        {/* Plan Details */}
        <div className="flex-1 mb-6">
          <ul className="space-y-2">
            <li
              className={`text-sm ${
                plan.durationInMonths === 24 ? "text-cyan-100" : "text-gray-600"
              }`}
            >
              ${plan.signUpFee} Signup Fee
            </li>
            <li
              className={`text-sm ${
                plan.durationInMonths === 24 ? "text-cyan-100" : "text-gray-600"
              }`}
            >
              ${plan.refundableDeposit} Refundable Deposit*
            </li>
            <li
              className={`text-sm ${
                plan.durationInMonths === 24 ? "text-cyan-100" : "text-gray-600"
              }`}
            >
              Access to all our Jet Skis
            </li>
            <li
              className={`text-sm ${
                plan.durationInMonths === 24 ? "text-cyan-100" : "text-gray-600"
              }`}
            >
              Up to {plan.ridesPerMonth} Rides per month
            </li>
            <li
              className={`text-sm ${
                plan.durationInMonths === 24 ? "text-cyan-100" : "text-gray-600"
              }`}
            >
              {plan.description}
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <Button
          onClick={isDashboard ? () => onEdit(plan._id) : handleSignup}
          style={{ border: "none" }}
          loading={isSubscribing}
          className={`w-full h-24 rounded-lg font-semibold text-base transition-colors duration-200 
        ${
          plan.durationInMonths === 24
            ? "!bg-gray-900 !text-white hover:!bg-gray-800 border-none"
            : "!bg-gray-900 !text-white hover:!bg-gray-800 border-none"
        }`}
        >
          {isDashboard
            ? "Edit Plan"
            : `Signup for ${plan.durationInMonths} months`}
        </Button>
      </div>

      <DeleteConfirmationModal
        open={deleteOpen}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteOpen(false)}
        loading={isLoading}
      />
    </Card>
  );
}
