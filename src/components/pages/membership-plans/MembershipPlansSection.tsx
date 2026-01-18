/* eslint-disable prefer-const */
"use client";

import React from "react";
import { Spin } from "antd";
import MembershipPlanCard from "@/components/cards/MembershipPlanCard";
import { Container } from "@/components/shared/Container/Container";
import {
  TMemberShip,
  useGetAllMemberShipsQuery,
} from "@/redux/api/memberShip/memberShipApi";

export default function MembershipPlansSection() {
  const { data, isFetching, error } = useGetAllMemberShipsQuery();

  /* ---- map API ⇒ local card type ---- */
  const plans: TMemberShip[] =
    data?.map((m) => ({
      _id: m._id,
      durationInMonths: m.durationInMonths,
      ridesPerMonth: m.ridesPerMonth,
      refundableDeposit: m.refundableDeposit,
      signUpFee: m.signUpFee,
      price: m.price,
      description: m.description,
    })) ?? [];

  /* ---- find longest duration plan and move it to the middle ---- */
  let reordered = [...plans];
  if (reordered.length > 1) {
    const maxPlanIdx = reordered.reduce(
      (acc, p, i) =>
        (p.durationInMonths ?? 0) > (reordered[acc].durationInMonths ?? 0)
          ? i
          : acc,
      0
    );

    const [maxPlan] = reordered.splice(maxPlanIdx, 1);
    reordered.splice(1, 0, maxPlan); // insert into position 1
  }

  const handleEdit = (planId: string) => {
    // For public site, this could be a signup action instead
    console.log("Action for plan:", planId);
    // router.push(`/signup?plan=${planId}`);
  };

  if (isFetching) {
    return (
      <section className="pb-12 md:pb-16 lg:pb-20 xl:pb-28">
        <Container className="bg-white rounded-xl">
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pb-12 md:pb-16 lg:pb-20 xl:pb-28">
        <Container className="bg-white rounded-xl">
          <div className="flex justify-center items-center h-64 text-red-500">
            Failed to load plans. Please try again later.
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 xl:py-28 2xl:py-32">
      <Container className="bg-white rounded-xl">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-[#00AEEF]">Plan</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              All our plans are on a fixed locked-in contract.
              <br />
              That&apos;s 365 x 3 years to help you everyone&apos;s needs
              better.
            </p>
          </div>

          {/* Most Popular Badge */}
          {reordered.length > 0 && (
            <div className="text-center mb-12 hidden lg:block">
              <span className="bg-[#00AEEF] text-white text-sm font-semibold px-4 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>
          )}

          {/* Plans Grid */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {reordered.map((plan, index) => (
              <MembershipPlanCard
                key={plan._id}
                plan={plan}
                isFeatured={index === 1}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
