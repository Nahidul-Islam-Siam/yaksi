/* components/sections/MembershipPlansSection.tsx
   ——————————————————————————————————————————————————————————
   Replaces the manual Axios helper with the RTK-Query endpoint
   `useGetAllMemberShipsQuery`, then maps the server objects
   (TMemberShip) into the `MembershipPlan` shape expected by
   <MembershipPlanCard/>.
---------------------------------------------------------------- */
"use client";

import { useRouter } from "next/navigation";
import { Button, Empty, Spin } from "antd";
import { toast } from "sonner";
import MembershipPlanCard from "@/components/cards/MembershipPlanCard";
import {
  TMemberShip,
  useGetAllMemberShipsQuery,
} from "@/redux/api/memberShip/memberShipApi";
import { useState } from "react";
import CreateMembershipPlansModal from "@/components/modals/CreateMembershipPlansModal";
import { Plus } from "lucide-react";

export default function MembershipPlansSection() {
  const router = useRouter();

  /* ----------- RTK-Query ----------- */

  const { data, isFetching, error } = useGetAllMemberShipsQuery();

  /* ---- map API ⇒ local card type ---- */
  const plans: TMemberShip[] =
    (data ?? []).map((m) => ({
      /* existing card props */
      _id: m._id,
      durationInMonths: m.durationInMonths ?? m.durationInMonths,
      ridesPerMonth: m.ridesPerMonth,
      refundableDeposit: m.refundableDeposit,
      signUpFee: m.signUpFee,
      price: m.price,
      description: m.description,
    })) ?? [];

  const maxPlanIdx = plans.reduce(
    (acc, p, i) =>
      (p.durationInMonths ?? 0) > (plans[acc].durationInMonths ?? 0) ? i : acc,
    0
  );

  const reordered = [...plans]; // don’t mutate original
  const [maxPlan] = reordered.splice(maxPlanIdx, 1);
  reordered.splice(1, 0, maxPlan);

  /*--------Modal---------*/
  const [modalOpen, setModalOpen] = useState(false);

  /* ---- error toast once ---- */
  if (error) toast.error("Failed to load membership plans");

  /* ------------- UI ------------- */
  return (
    <>
      <div className="py-6">
        {/* header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#00AEEF]">
            Membership Plan
          </h2>

          {plans.length < 3 && (
            <Button
              type="primary"
              icon={<Plus />}
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto !px-6 !h-12 font-medium !rounded-full !border-none hover:!bg-[#0EA5E9]/80"
              style={{ backgroundColor: "#0EA5E9" }}
            >
              Add Membership Plan
            </Button>
          )}
        </div>

        {/* grid */}
        <div className="space-y-6">
          {isFetching ? (
            <div className="flex justify-center py-28">
              <Spin size="large" />
            </div>
          ) : plans.length ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {reordered.map((plan, idx) => (
                <MembershipPlanCard
                  key={plan._id}
                  plan={plan}
                  isFeatured={idx === 1}
                  onEdit={(id) =>
                    router.push(`/dashboard/membership-plans/edit/${id}`)
                  }
                  isDashboard
                />
              ))}
            </div>
          ) : (
            <div className="py-12">
              <Empty
                description="No membership plans found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </div>
      </div>

      {/* create Membership plan modal */}
      <CreateMembershipPlansModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          console.log("Membership plan added! Refresh list here if needed.");
        }}
      />
    </>
  );
}
